'use client';

type CustomCheckboxProps = {
  id: string;
  name: string;
  label: string;
  value: string | number;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string | number, checked: boolean) => void;
  className?: string;
};

export default function CustomCheckbox({
  id,
  name,
  label,
  value,
  checked = false,
  disabled = false,
  onChange,
  className = '',
}: CustomCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange && onChange(value, e.target.checked)}
        className="hidden"
      />
      <span
        className={`min-w-5 h-5 rounded-md border flex items-center justify-center
        ${checked ? 'border-siteColor ' : 'border-siteColor bg-[#F9F5FF]'}
        transition-colors duration-200`}
      >
        {checked && (
          <svg
            className="w-3.5 h-3.5 text-siteColor"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className="text-sm font-medium text-tertiary">{label}</span>
    </label>
  );
}