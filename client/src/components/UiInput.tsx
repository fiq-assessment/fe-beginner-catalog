import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function UiInput({ label, id, className = '', ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
          {label}
        </label>
      )}
      <input id={id} className={`input ${className}`} {...props} />
    </div>
  );
}

