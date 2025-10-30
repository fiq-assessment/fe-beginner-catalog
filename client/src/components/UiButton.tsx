import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export function UiButton({ variant = 'secondary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'btn';
  const variantStyles = {
    primary: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700',
    secondary: 'bg-white text-gray-900 border-gray-300',
    ghost: 'bg-transparent border-transparent hover:bg-gray-100',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

