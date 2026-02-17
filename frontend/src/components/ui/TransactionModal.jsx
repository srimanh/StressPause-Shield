import React, { useState, useEffect } from 'react';
import { X, Calendar, DollarSign, Tag, FileText, Check, Loader2 } from 'lucide-react';
import Modal from '@ui/Modal';
import Button from '@ui/Button';
import Input from '@ui/Input';
import { cn } from '@utils/cn';

const TransactionModal = ({ isOpen, onClose, onSubmit, transaction = null, title = "Transaction" }) => {
    const [formData, setFormData] = useState({
        amount: '',
        type: 'EXPENSE',
        category: '',
        description: '',
        transactionDate: new Date().toISOString().split('T')[0]
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (transaction) {
            setFormData({
                amount: transaction.amount,
                type: transaction.type,
                category: transaction.category,
                description: transaction.description || '',
                transactionDate: transaction.transactionDate
            });
        } else {
            setFormData({
                amount: '',
                type: 'EXPENSE',
                category: '',
                description: '',
                transactionDate: new Date().toISOString().split('T')[0]
            });
        }
    }, [transaction, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeChange = (type) => {
        setFormData(prev => ({ ...prev, type }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            // Error handling is managed by the page/service
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={transaction ? `Edit ${title}` : `Add ${title}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type Toggle */}
                <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <button
                        type="button"
                        onClick={() => handleTypeChange('INCOME')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-standard",
                            formData.type === 'INCOME'
                                ? "bg-white dark:bg-slate-900 text-emerald-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                        )}
                    >
                        Income
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTypeChange('EXPENSE')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-standard",
                            formData.type === 'EXPENSE'
                                ? "bg-white dark:bg-slate-900 text-rose-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                        )}
                    >
                        Expense
                    </button>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Amount (₹)</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                            <DollarSign size={18} />
                        </div>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            required
                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-standard font-bold text-lg"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Category</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                <Tag size={18} />
                            </div>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Food, Rent, Salary..."
                                required
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-standard text-sm font-medium"
                            />
                        </div>
                    </div>

                    {/* Date Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Date</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                <Calendar size={18} />
                            </div>
                            <input
                                type="date"
                                name="transactionDate"
                                value={formData.transactionDate}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-standard text-sm font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Description (Optional)</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-4 text-slate-400 group-focus-within:text-primary transition-colors">
                            <FileText size={18} />
                        </div>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Add some details..."
                            rows="3"
                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-standard text-sm font-medium resize-none"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        className="flex-1"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 gap-2"
                        isLoading={isSubmitting}
                    >
                        {transaction ? 'Save Changes' : 'Add Transaction'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default TransactionModal;
