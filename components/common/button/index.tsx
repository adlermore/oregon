import React from "react";
import IconLoader from "@/components/icons/IconLoader";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  isLoading = false,
  disabled = false,
  ...rest
}) => {
  const isDisabled = isLoading || disabled;
  
  return (
    <button
      type="button"
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={`common-button ${className ? className : ''} ${isLoading ? "bg-text-primary pointer-events-none" : ""}`}
      {...rest}
    >
      {isLoading ? <IconLoader className="h-6 w-6" /> : children}
    </button>
  );
};

export default Button;
