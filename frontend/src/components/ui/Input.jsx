import React from 'react';
import { cn } from '@utils/cn';

const Input = React.forwardRef(({ className, type, label, error, ...props }, ref) => {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label className="text-sm font-medium text-slate-700 ml-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={cn(
                    "flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-standard disabled:cursor-not-allowed disabled:opacity-50",
                    error && "border-danger focus:ring-danger/10 focus:border-danger",
                    className
                )}
                ref={ref}
                {...props}
            />
            {error && (
                <p className="text-xs font-medium text-danger ml-1">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
