import React from 'react';
import { Bell, Search, Menu as MenuIcon, User, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '@hooks/useDarkMode';

const Navbar = ({ toggleSidebar }) => {
    const [isDark, toggleDark] = useDarkMode();

    return (
        <header className="h-20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-20 transition-standard">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 lg:hidden rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-standard"
                >
                    <MenuIcon size={24} />
                </button>

                <div className="hidden md:flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-2 rounded-xl text-slate-400 focus-within:ring-2 focus-within:ring-primary/10 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:border-primary/50 transition-standard w-64 lg:w-96">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search records, analytics..."
                        className="bg-transparent border-none outline-none text-slate-600 dark:text-slate-300 w-full text-sm font-medium"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
                <button
                    onClick={toggleDark}
                    className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-standard flex items-center justify-center"
                >
                    {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
                </button>

                <button className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-standard">
                    <Bell size={22} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white dark:border-slate-900"></span>
                </button>

                <div className="flex items-center gap-3 pl-3 border-l border-slate-100 dark:border-slate-800">
                    <div className="hidden sm:block text-right">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">John Doe</p>
                        <p className="text-xs font-medium text-slate-400 mt-1">Premium Member</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 cursor-pointer hover:bg-primary/20 transition-standard">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
