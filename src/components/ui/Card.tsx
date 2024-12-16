import React from 'react'
import clsx from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, ...props }) => (
  <div
    className={clsx('border rounded-lg shadow-sm bg-white', className)}
    {...props}
  />
)

export const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  ...props
}) => <div className={clsx('px-4 py-3 border-b', className)} {...props} />

export const CardTitle: React.FC<CardTitleProps> = ({
  className,
  ...props
}) => (
  <h3
    className={clsx('text-lg font-semibold text-gray-900', className)}
    {...props}
  />
)

export const CardContent: React.FC<CardContentProps> = ({
  className,
  ...props
}) => <div className={clsx('p-4', className)} {...props} />
