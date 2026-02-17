import React from 'react';
import { Card } from './Card';
import { cn } from '@utils/cn';
import { formatCurrency } from '@utils/formatters';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Skeleton } from './Skeleton';

const SummaryCard = ({ title, amount, icon: Icon, type, loading }) => {
    const isPositive = amount >= 0;

    const getColors = () => {
        if (type === 'income') return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400';
        if (type === 'expense') return 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400';
        if (type === 'balance') {
            return isPositive
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400';
        }
        return 'bg-slate-50 dark:bg-slate-900/20 text-slate-600 dark:text-slate-400';
    };

    if (loading) {
        return (
            <Card className="flex flex-col gap-4">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-32" />
                </div>
            </Card>
        );
    }

    return (
        <Card className="hover:shadow-lg transition-standard group">
            <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-xl transition-standard group-hover:scale-110", getColors())}>
                    <Icon size={24} />
                </div>
                {type === 'balance' && (
                    <div className={cn(
                        "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                        isPositive ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700" : "bg-rose-100 dark:bg-rose-900/30 text-rose-700"
                    )}>
                        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {isPositive ? 'Healthy' : 'Low'}
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">{title}</p>
                <h2 className={cn(
                    "text-2xl font-bold tracking-tight",
                    type === 'balance' && (isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")
                )}>
                    {formatCurrency(amount)}
                </h2>
            </div>
        </Card>
    );
};

export default SummaryCard;
