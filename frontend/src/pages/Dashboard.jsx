import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Plus
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@ui/Card';
import Button from '@ui/Button';
import Badge from '@ui/Badge';

const data = [
    { name: 'Mon', income: 4000, expenses: 2400 },
    { name: 'Tue', income: 3000, expenses: 1398 },
    { name: 'Wed', income: 2000, expenses: 9800 },
    { name: 'Thu', income: 2780, expenses: 3908 },
    { name: 'Fri', income: 1890, expenses: 4800 },
    { name: 'Sat', income: 2390, expenses: 3800 },
    { name: 'Sun', income: 3490, expenses: 4300 },
];

const Dashboard = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white transition-standard">Portfolio Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium transition-standard">Welcome back, John! Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="gap-2">
                        <TrendingUp size={18} /> Export
                    </Button>
                    <Button className="gap-2">
                        <Plus size={18} /> New Transaction
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:border-primary/20 transition-all cursor-default group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl text-primary transition-standard group-hover:scale-110">
                            <Wallet size={24} />
                        </div>
                        <Badge variant="primary">+12.5%</Badge>
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Balance</p>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-standard">$128,430.00</h2>
                </Card>

                <Card className="hover:border-secondary/20 transition-all cursor-default group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-secondary/10 dark:bg-secondary/20 rounded-xl text-secondary transition-standard group-hover:scale-110">
                            <TrendingUp size={24} />
                        </div>
                        <Badge variant="secondary">+4.2%</Badge>
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Monthly Income</p>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-standard">$8,240.50</h2>
                </Card>

                <Card className="hover:border-danger/20 transition-all cursor-default group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-danger/10 dark:bg-danger/20 rounded-xl text-danger transition-standard group-hover:scale-110">
                            <TrendingDown size={24} />
                        </div>
                        <Badge variant="danger">-2.1%</Badge>
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Monthly Expenses</p>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-standard">$3,120.00</h2>
                </Card>

                <Card className="hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-default group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 transition-standard group-hover:scale-110">
                            <ArrowUpRight size={24} />
                        </div>
                        <Badge variant="neutral">Stable</Badge>
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Active Assets</p>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-standard">24</h2>
                </Card>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Column */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-6 mb-6">
                        <div>
                            <CardTitle>Cash Flow</CardTitle>
                            <CardDescription>Income vs Expenses over the last 7 days</CardDescription>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={20} />
                        </button>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: 'white' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="income"
                                        stroke="#1E40AF"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorIncome)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="expenses"
                                        stroke="#10B981"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorExpenses)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Transactions Column */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-6 mb-6 transition-standard">
                        <div>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Your latest transactions</CardDescription>
                        </div>
                        <button className="text-primary text-sm font-bold hover:underline transition-standard">View All</button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[
                            { title: 'Apple Store', date: 'Just now', amount: '-$1,299.00', icon: 'bg-slate-900', trend: 'down' },
                            { title: 'Stripe Payout', date: '2 hours ago', amount: '+$4,500.00', icon: 'bg-primary', trend: 'up' },
                            { title: 'Cloud Hosting', date: 'Yesterday', amount: '-$42.00', icon: 'bg-slate-500', trend: 'down' },
                            { title: 'Investment Div.', date: '3 Feb 2026', amount: '+$124.50', icon: 'bg-secondary', trend: 'up' },
                        ].map((tx, i) => (
                            <div key={i} className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl ${tx.icon} flex items-center justify-center text-white font-bold transition-standard group-hover:scale-110`}>
                                        {tx.title[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-standard">{tx.title}</p>
                                        <p className="text-xs text-slate-400 font-medium">{tx.date}</p>
                                    </div>
                                </div>
                                <p className={`text-sm font-bold ${tx.trend === 'up' ? 'text-secondary' : 'text-slate-900 dark:text-white'} transition-standard`}>
                                    {tx.amount}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
