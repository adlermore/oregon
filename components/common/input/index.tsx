import { InputMask } from '@react-input/mask';
import React, { useState } from "react";
import IconEyeOpen from "@/components/icons/IconEyeOpen";
import IconEyeClose from "@/components/icons/IconEyeClose";
import InputError from "@/components/common/input/InputError";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface InputFieldProps {
	label?: string;
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl> | undefined;
	className?: string;
	type?: string;
	value?: string | number;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	mask?: string;
	defaultValue?: string | number;
	maxLength?: number;
	onFocus?: () => void;
  minValue?: number;
}

const InputField: React.FC<InputFieldProps> = ({
	label = "",
	className = "",
	error,
	required,
	type,
	disabled,
	mask,
  minValue,
	...props
}) => {
	const [show, setShow] = useState(false);

	return (
		<div className="w-full relative">
			{label && (
				<label className="mb-1 block lg:text-base text-sm font-medium text-tertiary">
					{label} {required && '*'}
				</label>
			)}
			{(type === 'phone' || mask) ? (
				<InputMask
					{...props}
					mask={mask || "(___) ___-____"}
					replacement={{ _: /\d/ }}
					placeholder={props.placeholder || "Enter Phone Number"}
					type="tel"
					autoComplete="on"
					disabled={disabled}
					className={`common-input ${disabled ? 'cursor-not-allowed text-[#8A8A8A]! bg-[#f0f0f0]' : ''}${className}`}
				/>
			) : (
				<div className="relative">
					<input
						{...props}
            min={minValue}
						disabled={disabled}
						type={type === 'password' && show ? 'text' : type}
						autoComplete={type === 'password' ? 'new-password' : 'on'}
						className={`common-input ${disabled ? 'cursor-not-allowed text-[#8A8A8A]! bg-[#f0f0f0]' : ''}
                ${className} ${type === 'password' ? 'pr-8!' : ''}`}
					/>

					{type === 'password' && (
						<button
							type="button"
							onClick={() => setShow(!show)}
							className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
							tabIndex={0}
							aria-label={show ? 'Hide password' : 'Show password'}
						>
							{show ? <IconEyeOpen /> : <IconEyeClose />}
						</button>
					)}
				</div>
			)}
			<InputError error={error || ''} />
		</div>
	);
};

export default InputField;
