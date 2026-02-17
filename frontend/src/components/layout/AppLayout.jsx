import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AppLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-background-light dark:bg-slate-950 transition-standard">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="lg:ml-64 min-h-screen flex flex-col">
                <Navbar toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>

                <footer className="py-6 px-10 text-center text-slate-400 dark:text-slate-600 text-sm border-t border-slate-50 dark:border-slate-900 transition-standard">
                    &copy; {new Date().getFullYear()} StressPause-Shield. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default AppLayout;
