import React from 'react';
import { cn } from '@utils/cn';

const Card = ({ className, children, ...props }) => {
    return (
        <div
            className={cn("premium-card dark:bg-slate-900 dark:border-slate-800 p-6 transition-standard", className)}
            {...props}
        >
            {children}
        </div>
    );
};

const CardHeader = ({ className, children, ...props }) => (
    <div className={cn("mb-4 flex flex-col space-y-1.5", className)} {...props}>
        {children}
    </div>
);

const CardTitle = ({ className, children, ...props }) => (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-slate-900 dark:text-white transition-standard", className)} {...props}>
        {children}
    </h3>
);

const CardDescription = ({ className, children, ...props }) => (
    <p className={cn("text-sm text-slate-500 dark:text-slate-400 transition-standard", className)} {...props}>
        {children}
    </p>
);

const CardContent = ({ className, children, ...props }) => (
    <div className={cn("pt-0", className)} {...props}>
        {children}
    </div>
);

const CardFooter = ({ className, children, ...props }) => (
    <div className={cn("flex items-center pt-4", className)} {...props}>
        {children}
    </div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
