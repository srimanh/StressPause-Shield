import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@layout/AppLayout';
import LandingPage from '@pages/LandingPage';
import DashboardPage from '@pages/DashboardPage';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Dashboard Routes */}
            <Route
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/transactions" element={<div className="p-8 dark:text-white">Transactions Page (To be implemented)</div>} />
                <Route path="/analytics" element={<div className="p-8 dark:text-white">Analytics Page (To be implemented)</div>} />
                <Route path="/settings" element={<div className="p-8 dark:text-white">Settings Page (To be implemented)</div>} />
            </Route>

            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
