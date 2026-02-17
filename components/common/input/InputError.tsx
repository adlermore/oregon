import React from 'react';
import {FieldError, FieldErrorsImpl, Merge} from "react-hook-form";

interface InputErrorProps {
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl> | undefined;
    className?: string;
}

const InputError: React.FC<InputErrorProps> = ({error, className}) => {
    return (
        <p className={`errorText text-xs absolute right-0 text-error font-semibold duration-300 opacity-0 ${error ? 'opacity-100' : 'opacity-0'} ${className ? className : ''}`}>
            {error ? error?.toString() || 'This field is required' : ''}
        </p>
    );
};

export default InputError;