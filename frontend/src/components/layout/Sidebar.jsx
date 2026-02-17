import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ArrowLeftRight,
    BarChart3,
    Settings,
    LogOut,
    Shield
} from 'lucide-react';
import { cn } from '@utils/cn';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: ArrowLeftRight, label: 'Transactions', path: '/transactions' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col transition-transform duration-300 transform lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo Section */}
                <div className="h-20 flex items-center px-6 border-b border-slate-50 dark:border-slate-800 italic">
                    <Shield className="text-primary" size={32} />
                    <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white ml-3">StressPause</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-standard",
                                isActive
                                    ? "bg-primary/5 dark:bg-primary/10 text-primary shadow-sm"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                            )}
                            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                        >
                            <item.icon size={22} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* User / Logout Section */}
                <div className="p-4 border-t border-slate-50 dark:border-slate-800">
                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-danger/5 hover:text-danger font-medium transition-standard group">
                        <LogOut size={22} className="group-hover:text-danger" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
