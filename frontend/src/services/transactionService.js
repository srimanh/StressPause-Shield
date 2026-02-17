import api from './api';

const transactionService = {
    fetchTransactions: async (page = 0, size = 10, type = '', category = '') => {
        let url = `/transactions?page=${page}&size=${size}`;
        if (type && type !== 'ALL') url += `&type=${type}`;
        if (category) url += `&category=${category}`;

        const response = await api.get(url);
        return response.data;
    },

    createTransaction: async (data) => {
        const response = await api.post('/transactions', data);
        return response.data;
    },

    updateTransaction: async (id, data) => {
        const response = await api.put(`/transactions/${id}`, data);
        return response.data;
    },

    deleteTransaction: async (id) => {
        const response = await api.delete(`/transactions/${id}`);
        return response.data;
    }
};

export default transactionService;
