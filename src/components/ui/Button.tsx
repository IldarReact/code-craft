import clsx from 'clsx'
import { HTMLAttributes } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'danger'
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'primary',
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-md font-medium transition-colors',
        {
          'bg-blue-500 hover:bg-blue-600 text-white': color === 'primary',
          'bg-gray-200 hover:bg-gray-300 text-gray-700': color === 'secondary',
          'bg-red-500 hover:bg-red-600 text-white': color === 'danger'
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button