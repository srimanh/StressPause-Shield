import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    PieChart, Pie, Cell
} from 'recharts';
import {
    TrendingUp, TrendingDown, Wallet, ArrowUpRight,
    ArrowDownRight, Plus, RefreshCcw, MoreHorizontal,
    LayoutGrid, Calendar, PieChart as PieChartIcon
} from 'lucide-react';
import api from '@services/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@ui/Card';
import Button from '@ui/Button';
import Badge from '@ui/Badge';
import SummaryCard from '@ui/SummaryCard';
import EmptyState from '@ui/EmptyState';
import { formatCurrency, formatDate } from '@utils/formatters';
import toast from 'react-hot-toast';
import { Skeleton } from '@ui/Skeleton';

const COLORS = ['#1E40AF', '#10B981', '#6366F1', '#F59E0B', '#EF4444', '#8B5CF6'];

const DashboardPage = () => {
    const [summary, setSummary] = useState(null);
    const [monthly, setMonthly] = useState([]);
    const [categories, setCategories] = useState([]);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [loading, setLoading] = useState({
        summary: true,
        monthly: true,
        categories: true,
        transactions: true
    });

    const fetchData = async () => {
        // Summary
        try {
            const res = await api.get('/analytics/summary');
            setSummary(res.data.data);
        } catch (err) {
            toast.error('Failed to load summary');
        } finally {
            setLoading(prev => ({ ...prev, summary: false }));
        }

        // Monthly
        try {
            const res = await api.get('/analytics/monthly');
            setMonthly(res.data.data);
        } catch (err) {
            toast.error('Failed to load monthly trends');
        } finally {
            setLoading(prev => ({ ...prev, monthly: false }));
        }

        // Categories
        try {
            const res = await api.get('/analytics/categories');
            setCategories(res.data.data);
        } catch (err) {
            toast.error('Failed to load category breakdown');
        } finally {
            setLoading(prev => ({ ...prev, categories: false }));
        }

        // Transactions
        try {
            const res = await api.get('/transactions?page=0&size=5');
            setRecentTransactions(res.data.data.content || []);
        } catch (err) {
            toast.error('Failed to load recent transactions');
        } finally {
            setLoading(prev => ({ ...prev, transactions: false }));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Financial Dashboard
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
                        Real-time insights into your financial health.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="gap-2" onClick={fetchData}>
                        <RefreshCcw size={18} className={Object.values(loading).some(v => v) ? "animate-spin" : ""} />
                        Refresh
                    </Button>
                    <Button className="gap-2">
                        <Plus size={18} /> New Transaction
                    </Button>
                </div>
            </div>

            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SummaryCard
                    title="Total Income"
                    amount={summary?.totalIncome}
                    icon={TrendingUp}
                    type="income"
                    loading={loading.summary}
                />
                <SummaryCard
                    title="Total Expenses"
                    amount={summary?.totalExpense}
                    icon={TrendingDown}
                    type="expense"
                    loading={loading.summary}
                />
                <SummaryCard
                    title="Net Balance"
                    amount={summary?.netBalance}
                    icon={Wallet}
                    type="balance"
                    loading={loading.summary}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monthly Trend */}
                <Card className="flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-6 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <CardTitle>Monthly Trends</CardTitle>
                                <CardDescription>Income vs Expenses analysis</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-[400px]">
                        {loading.monthly ? (
                            <div className="h-full w-full flex flex-col gap-4">
                                <Skeleton className="w-full h-8" />
                                <div className="flex-1 flex items-end gap-4">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <Skeleton key={i} className="flex-1" style={{ height: `${Math.random() * 60 + 20}%` }} />
                                    ))}
                                </div>
                            </div>
                        ) : monthly.length > 0 ? (
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthly} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                                            tickFormatter={(value) => `₹${value}`}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'transparent' }}
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: 'white' }}
                                            formatter={(value) => [formatCurrency(value), '']}
                                        />
                                        <Legend verticalAlign="top" height={36} iconType="circle" />
                                        <Bar dataKey="income" name="Income" fill="#1E40AF" radius={[4, 4, 0, 0]} barSize={24} />
                                        <Bar dataKey="expense" name="Expense" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={24} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <EmptyState title="No trend data" description="Data will appear once you have transactions across multiple months." icon={Calendar} />
                        )}
                    </CardContent>
                </Card>

                {/* Category Breakdown */}
                <Card className="flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-6 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-lg">
                                <PieChartIcon size={20} />
                            </div>
                            <div>
                                <CardTitle>Expense Distribution</CardTitle>
                                <CardDescription>Breakdown by category</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-[400px] flex items-center justify-center">
                        {loading.categories ? (
                            <div className="w-64 h-64 rounded-full border-8 border-slate-50 dark:border-slate-800 border-t-primary animate-spin" />
                        ) : categories.length > 0 ? (
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categories}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={120}
                                            paddingAngle={5}
                                            dataKey="total"
                                            nameKey="category"
                                        >
                                            {categories.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: 'white' }}
                                            formatter={(value) => [formatCurrency(value), 'Total']}
                                        />
                                        <Legend
                                            verticalAlign="bottom"
                                            align="center"
                                            layout="horizontal"
                                            iconType="circle"
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <EmptyState title="No category data" description="Categorize your transactions to see a breakdown here." icon={PieChartIcon} />
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-6 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-600 rounded-lg">
                            <LayoutGrid size={20} />
                        </div>
                        <div>
                            <CardTitle>Recent Transactions</CardTitle>
                            <CardDescription>Your latest financial activities</CardDescription>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" className="font-bold">View All</Button>
                </CardHeader>
                <CardContent>
                    {loading.transactions ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Skeleton key={i} className="h-16 w-full rounded-xl" />
                            ))}
                        </div>
                    ) : recentTransactions.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-slate-50 dark:border-slate-800">
                                        <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Date</th>
                                        <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Description</th>
                                        <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Category</th>
                                        <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                    {recentTransactions.map((tx) => (
                                        <tr key={tx.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-standard">
                                            <td className="py-4 py-4 text-sm font-medium text-slate-400">{formatDate(tx.transactionDate)}</td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold",
                                                        tx.type === 'INCOME' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                                    )}>
                                                        {tx.description?.[0] || 'T'}
                                                    </div>
                                                    <span className="font-bold text-slate-900 dark:text-white">{tx.description}</span>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <Badge variant="neutral" className="capitalize">{tx.category.toLowerCase().replace('_', ' ')}</Badge>
                                            </td>
                                            <td className={cn(
                                                "py-4 text-right font-bold",
                                                tx.type === 'INCOME' ? "text-emerald-600" : "text-slate-900 dark:text-white"
                                            )}>
                                                {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-10">
                            <EmptyState title="No transactions yet" description="Your data will appear here once you make your first transaction." />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardPage;
