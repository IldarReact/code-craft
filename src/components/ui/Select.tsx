import clsx from 'clsx'
import { forwardRef, SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, error, className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={clsx(
          'px-4 py-2 rounded-md border transition-colors',
          {
            'border-gray-300 focus:border-blue-500 focus:ring-blue-500':
              !error,
            'border-red-500 focus:border-red-500 focus:ring-red-500': error
          },
          className
        )}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'

export default Select