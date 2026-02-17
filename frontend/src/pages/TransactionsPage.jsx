import React, { useState, useEffect, useCallback } from 'react';
import {
    Plus, Search, Filter, MoreVertical,
    ChevronLeft, ChevronRight, Edit2, Trash2,
    ArrowUpCircle, ArrowDownCircle, Info
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, CardContent } from '@ui/Card';
import Button from '@ui/Button';
import Badge from '@ui/Badge';
import { Skeleton } from '@ui/Skeleton';
import EmptyState from '@ui/EmptyState';
import TransactionModal from '@ui/TransactionModal';
import transactionService from '@services/transactionService';
import { formatCurrency, formatDate } from '@utils/formatters';
import { cn } from '@utils/cn';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        size: 10
    });
    const [filters, setFilters] = useState({
        type: 'ALL',
        category: ''
    });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isDeleting, setIsDeleting] = useState(null);

    const fetchTransactions = useCallback(async (page = 0) => {
        setLoading(true);
        try {
            const data = await transactionService.fetchTransactions(
                page,
                pagination.size,
                filters.type,
                filters.category
            );
            setTransactions(data.data.content);
            setPagination(prev => ({
                ...prev,
                currentPage: data.data.pageable.pageNumber,
                totalPages: data.data.totalPages,
                totalElements: data.data.totalElements
            }));
        } catch (error) {
            toast.error('Failed to fetch transactions');
        } finally {
            setLoading(false);
        }
    }, [filters, pagination.size]);

    useEffect(() => {
        fetchTransactions(0);
    }, [fetchTransactions]);

    const handleAddClick = () => {
        setSelectedTransaction(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (tx) => {
        setSelectedTransaction(tx);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id) => {
        if (!window.confirm('Are you sure you want to delete this transaction?')) return;

        setIsDeleting(id);
        try {
            await transactionService.deleteTransaction(id);
            toast.success('Transaction deleted');
            // Optimistic update
            setTransactions(prev => prev.filter(t => t.id !== id));
            if (transactions.length === 1 && pagination.currentPage > 0) {
                fetchTransactions(pagination.currentPage - 1);
            }
        } catch (error) {
            toast.error('Failed to delete transaction');
        } finally {
            setIsDeleting(null);
        }
    };

    const handleModalSubmit = async (formData) => {
        try {
            if (selectedTransaction) {
                await transactionService.updateTransaction(selectedTransaction.id, formData);
                toast.success('Transaction updated');
            } else {
                await transactionService.createTransaction(formData);
                toast.success('Transaction added successfully');
            }
            fetchTransactions(0);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
            throw error; // Re-throw to keep modal open
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            fetchTransactions(newPage);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Transactions
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
                        Track and manage your financial activity with precision.
                    </p>
                </div>
                <Button onClick={handleAddClick} className="gap-2 shadow-lg shadow-primary/20 bg-primary hover:bg-primary-dark">
                    <Plus size={20} />
                    <span>Add Transaction</span>
                </Button>
            </div>

            {/* Filters Area */}
            <Card className="p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-full md:w-auto">
                        {['ALL', 'INCOME', 'EXPENSE'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilters(prev => ({ ...prev, type }))}
                                className={cn(
                                    "px-4 py-2 text-xs font-bold rounded-lg transition-standard capitalize",
                                    filters.type === type
                                        ? "bg-white dark:bg-slate-700 text-primary shadow-sm"
                                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                )}
                            >
                                {type.toLowerCase()}
                            </button>
                        ))}
                    </div>

                    <div className="relative group w-full md:w-64">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                            <Search size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by category..."
                            className="w-full bg-slate-100 dark:bg-slate-800 px-10 py-2.5 rounded-xl border-none outline-none text-sm font-medium text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-primary/10 transition-standard"
                            value={filters.category}
                            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                        />
                    </div>
                </div>
            </Card>

            {/* Transactions List/Table Area */}
            <Card className="border-slate-100 dark:border-slate-800 overflow-hidden">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="p-6 space-y-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Skeleton key={i} className="h-20 w-full rounded-2xl" />
                            ))}
                        </div>
                    ) : transactions.length > 0 ? (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Amount</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                        {transactions.map((tx) => (
                                            <tr key={tx.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-standard">
                                                <td className="px-6 py-5 text-sm font-semibold text-slate-400">{formatDate(tx.transactionDate)}</td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-900 dark:text-white capitalize transition-colors group-hover:text-primary">
                                                            {tx.description || tx.category}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <Badge variant="neutral" className="capitalize text-[10px] font-bold tracking-tight">
                                                        {tx.category.toLowerCase().replace('_', ' ')}
                                                    </Badge>
                                                </td>
                                                <td className={cn(
                                                    "px-6 py-5 text-right font-extrabold text-base transition-standard",
                                                    tx.type === 'INCOME' ? "text-emerald-600" : "text-slate-900 dark:text-white"
                                                )}>
                                                    {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => handleEditClick(tx)}
                                                            className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-standard"
                                                            title="Edit"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteClick(tx.id)}
                                                            disabled={isDeleting === tx.id}
                                                            className="p-2 text-slate-400 hover:text-danger hover:bg-danger/5 rounded-lg transition-standard"
                                                            title="Delete"
                                                        >
                                                            {isDeleting === tx.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden divide-y divide-slate-50 dark:divide-slate-800">
                                {transactions.map((tx) => (
                                    <div key={tx.id} className="p-5 flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                                    tx.type === 'INCOME' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                                )}>
                                                    {tx.type === 'INCOME' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white">{tx.description || tx.category}</p>
                                                    <p className="text-xs font-semibold text-slate-400">{formatDate(tx.transactionDate)}</p>
                                                </div>
                                            </div>
                                            <p className={cn(
                                                "font-extrabold",
                                                tx.type === 'INCOME' ? "text-emerald-600" : "text-slate-900 dark:text-white"
                                            )}>
                                                {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Badge variant="neutral" className="capitalize text-[10px] font-bold">
                                                {tx.category.toLowerCase().replace('_', ' ')}
                                            </Badge>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleEditClick(tx)} className="p-2 text-slate-400 hover:text-primary">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => handleDeleteClick(tx.id)} className="p-2 text-slate-400 hover:text-danger">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination controls */}
                            <div className="px-6 py-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                                <p className="text-xs font-bold text-slate-400">
                                    Showing <span className="text-slate-600 dark:text-slate-300">{transactions.length}</span> of <span className="text-slate-600 dark:text-slate-300">{pagination.totalElements}</span> results
                                </p>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="p-2"
                                        disabled={pagination.currentPage === 0}
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    >
                                        <ChevronLeft size={18} />
                                    </Button>
                                    <div className="flex items-center gap-1">
                                        {[...Array(pagination.totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handlePageChange(i)}
                                                className={cn(
                                                    "w-8 h-8 rounded-lg text-xs font-bold transition-standard",
                                                    pagination.currentPage === i
                                                        ? "bg-primary text-white shadow-md shadow-primary/20"
                                                        : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                )}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="p-2"
                                        disabled={pagination.currentPage === pagination.totalPages - 1}
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    >
                                        <ChevronRight size={18} />
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="py-20 px-6">
                            <EmptyState
                                title="No transactions found"
                                description="Adjust your filters or start adding your financial activities."
                                actionLabel="Add Transaction"
                                onAction={handleAddClick}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Trust Footer */}
            <div className="flex items-center justify-center gap-3 text-slate-400 py-4 opacity-50">
                <Info size={14} />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Transaction data is encrypted and synced in real-time</p>
            </div>

            {/* Transaction Modal */}
            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                transaction={selectedTransaction}
            />
        </div>
    );
};

export default TransactionsPage;
