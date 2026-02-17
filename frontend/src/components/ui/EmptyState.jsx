import React from 'react';
import { Database } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
    title = "No data available",
    description = "There are no records to display at the moment.",
    actionLabel,
    onAction,
    icon: Icon = Database
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="p-4 mb-4 bg-slate-50 rounded-full">
                <Icon size={48} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 max-w-xs mb-6 font-medium">
                {description}
            </p>
            {actionLabel && (
                <Button onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
