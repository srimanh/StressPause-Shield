import React from 'react';
import { cn } from '@utils/cn';

const Badge = ({ className, variant = 'primary', children, ...props }) => {
    const variants = {
        primary: 'bg-primary/10 text-primary border-primary/20',
        secondary: 'bg-secondary/10 text-secondary border-secondary/20',
        danger: 'bg-danger/10 text-danger border-danger/20',
        neutral: 'bg-slate-100 text-slate-600 border-slate-200',
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-standard",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Badge;
