'use client';

import React, { useState, useRef } from 'react';

type TooltipProps = {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  children: React.ReactNode;
};

export default function Tooltip({
  content,
  position = 'top',
  className = '',
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  };

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 150);
  };

  const positionClasses: Record<string, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={`absolute z-50 rounded-md bg-tertiary px-3 py-1.5 text-xs text-white shadow-md whitespace-normal ${positionClasses[position]} ${className}`}
        >
          {content}
        </span>
      )}
    </span>
  );
}
