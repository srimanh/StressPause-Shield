import React from 'react';
import { cn } from '@utils/cn';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', isLoading = false, children, ...props }, ref) => {
    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md',
        secondary: 'bg-white text-primary border border-slate-200 hover:bg-slate-50',
        ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
        danger: 'bg-danger text-white hover:bg-danger-dark',
        outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-lg font-medium',
    };

    return (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center rounded-xl transition-standard focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                </span>
            ) : children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
