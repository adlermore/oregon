'use client';

import React from 'react';
import Tooltip from '../tooltip/Tooltip';
import IconInfo from '@/components/icons/IconInfo';
type CustomRadioProps = {
  id: string;
  name: string;
  label: string;
  value: string | number;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  className?: string;
  tooltip?: string;
};

export default function CustomRadio({
  id,
  name,
  label,
  value,
  checked = false,
  disabled = false,
  onChange,
  className = '',
  tooltip,
}: CustomRadioProps) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2 cursor-pointer select-none w-fit ${disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange && onChange(value)}
        className="hidden"
      />
      <span
        className={`min-w-6 h-6 rounded-full border flex items-center justify-center
        ${checked ? 'border-siteColor ' : 'border-siteColor bg-[#F9F5FF]'}
        transition-colors duration-200`}
      >
        {checked && <span className="w-2.5 h-2.5 rounded-full bg-siteColor" />}
      </span>
      <span className="text-sm font-medium text-tertiary">{label}</span>

      {tooltip && (
        <span className="relative  flex items-center">
          <Tooltip content={tooltip} position="bottom" className="max-w-xs">
            <IconInfo className=" scale-120 text-gray-500 rotate-180" />
          </Tooltip>
        </span>
      )}
    </label>
  );
}
