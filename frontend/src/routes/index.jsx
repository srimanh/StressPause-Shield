import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@layout/AppLayout';
import LandingPage from '@pages/LandingPage';
import Dashboard from '@pages/Dashboard';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Dashboard Routes wrapped in AppLayout */}
            <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<div className="p-8">Transactions Page (To be implemented)</div>} />
                <Route path="/analytics" element={<div className="p-8">Analytics Page (To be implemented)</div>} />
                <Route path="/settings" element={<div className="p-8">Settings Page (To be implemented)</div>} />
            </Route>

            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
