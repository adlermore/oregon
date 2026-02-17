"use client";

import AsyncCreatableSelect from "react-select/async-creatable";
import { Controller, useFormContext } from "react-hook-form";
import { getSelectStyles } from "@/utils/customizeHelpers";
import IconLoader from "@/components/icons/IconLoader";
import React, { useEffect, useState } from "react";
import InputError from "../input/InputError";
import { InputActionMeta } from "react-select";
import { Option } from "@/types/types";

interface Props {
    name: string;
    label?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    fetcher: (query: string) => Promise<Option[]>;
    onSelect?: (value: Option) => void;
    onInputChange?: (value: string) => void;
    inputValue?: string;
    loading?: boolean;
    freeTextMode?: boolean;
    maxLength: number;
}

const CreatableSelectInput: React.FC<Props> = ({
    name,
    label,
    placeholder = "Select Or Enter",
    error,
    required,
    className,
    disabled,
    fetcher,
    onSelect,
    onInputChange,
    loading = false,
    inputValue,
    maxLength,
}) => {
    const { control } = useFormContext();
    const [defaultOpts, setDefaultOpts] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    useEffect(() => {
        const loadDefaults = async () => {
            const opts = await fetcher("");
            setDefaultOpts(opts);
        };
        loadDefaults();
    }, [fetcher]);

    const loadOptions = (value: string) => fetcher(value);

    const onSelectChange = () => (option: Option | null) => {
        if (!option) return;
        onSelect?.(option);
        setSelectedOption(option);
    };

    const onInputType = () => {
        return (value: string, meta: InputActionMeta) => {
            if (value.length > maxLength) return;
            if (meta.action === "input-change") {
                if (selectedOption) setSelectedOption(null);
                onInputChange?.(value);
            }
            return value;
        };
    }

    return (
        <div className={`relative form_block ${className || ""}`}>
            {label && (
                <label className="mb-1 block lg:text-sm text-xs font-medium text-tertiary">
                    {label} {required && "*"}
                </label>
            )}

            <Controller
                control={control}
                name={name}
                defaultValue={""}
                render={() => (
                    <AsyncCreatableSelect<Option, false>
                        placeholder={placeholder}
                        isDisabled={!!disabled}
                        noOptionsMessage={() => null}
                        defaultOptions={defaultOpts || []}
                        inputValue={selectedOption ? undefined : inputValue}
                        onChange={onSelectChange()}
                        onInputChange={onInputType()}
                        loadOptions={loadOptions}
                        isValidNewOption={() => false}
                        styles={getSelectStyles(false, !!disabled)}
                        getOptionLabel={(e: Option) => String(e[name as keyof Option])}
                        getOptionValue={(e: Option) => String(e.id)}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 8,
                            colors: {
                                ...theme.colors,
                                primary25: "rgb(25 26 42 / 20%)",
                                primary: "rgb(25 26 42 / 40%)",
                                neutral50: "#667085",
                            },
                        })}
                    />
                )}
            />

            <div
                className="pointer-events-none absolute inset-y-0 mt-6.5! right-10 flex items-center text-xs text-[#1f275a]/70">
                {loading && <IconLoader />}
            </div>

            <InputError error={error || ''} />
        </div>
    );
};

export default CreatableSelectInput;
