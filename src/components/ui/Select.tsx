import React, { forwardRef, SelectHTMLAttributes } from 'react';
import clsx from 'clsx';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, error, className, value, onChange, ...props }, ref) => {
    // Проверяем наличие options
    const hasOptions = React.Children.count(children) > 0;

    if (!hasOptions) {
      console.warn('Select компонент должен содержать как минимум один option элемент');
    }

    return (
      <select
        ref={ref}
        value={value}
        onChange={onChange}
        className={clsx(
          'w-full px-4 py-2 rounded-md border bg-white transition-colors',
          'focus:outline-none focus:ring-2',
          {
            'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20': !error,
            'border-red-500 focus:border-red-500 focus:ring-red-500/20': error,
          },
          className
        )}
        {...props}
      >
        {children || <option value="">{value}</option>}
      </select>
    );
  }
);

Select.displayName = 'Select';

export default Select;