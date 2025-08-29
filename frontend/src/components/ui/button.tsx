import { cn } from "@/utils/cn";
import React from "react";

type Variant = 'primary' | 'secondary' | 'danger' | 'link'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant
    size?: Size
    className?: string
    children: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
    primary: 'focus:outline-none bg-primary border-1 border-primary-600 focus:ring-2 focus:ring-primary-200 text-text-100 hover:bg-primary-600 hover:text-text-50 active:bg-primary-800',
    danger: 'focus:outline-none bg-danger border-danger-600 border-1 focus:ring-2 focus:ring-danger-200 text-text-100 hover:bg-danger-600 active:bg-danger-800',
    link: 'text-text hover:text-text-700 hover:underline',
    secondary: 'focus:outline-none bg-secondary-50 border-secondary-200 border-1 focus:ring-2 focus:ring-secondary-50 text-secondary-900 hover:bg-secondary-100 active:bg-secondary-200'
}

const sizeClasses: Record<Size, string> ={
    sm: 'py-1.5 px-2 h-10 body-primary-md-semibold',
    md: 'py-2.5 px-3 body-primary-lg-bold',
    lg: 'py-2.5 px-4 body-primary-lg-bold',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((
    {
        variant = "primary",
        size = 'sm',
        className,
        children,
        ...props
    }
) => {
    return (
        <button
        {...props}
        className={cn(
            "flex items-center justify-center gap-2 hover:cursor-pointer disabled:cursor-not-allowed rounded-md font-medium", 
            "",
            "transition-all ease-in-out duration-100",
            variantClasses[variant],
            sizeClasses[size],
            className

        )}
        >
            {children}
        </button>
    )
})

Button.displayName = 'Button'

export { Button }