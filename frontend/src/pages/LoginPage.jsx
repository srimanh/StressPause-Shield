import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '@context/AuthContext';
import Button from '@ui/Button';
import Input from '@ui/Input';
import { Card } from '@ui/Card';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        const result = await login(email, password);
        setIsSubmitting(false);

        if (result.success) {
            toast.success('Welcome back!');
            navigate(from, { replace: true });
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background-light dark:bg-slate-950 p-4 transition-standard relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 italic mb-6">
                        <Shield className="text-primary" size={40} />
                        <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">StressPause</span>
                    </Link>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                        Manage your financial gravity.
                    </p>
                </div>

                <Card className="p-8 shadow-2xl border-slate-100 dark:border-slate-800 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                            <div className="relative group/input">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-primary transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-standard"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                                <Link to="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</Link>
                            </div>
                            <div className="relative group/input">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-primary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-12 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-standard"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full gap-2 font-bold py-4"
                            isLoading={isSubmitting}
                        >
                            Sign In <ArrowRight size={20} />
                        </Button>
                    </form>

                    <p className="text-center mt-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary font-bold hover:underline">
                            Create one for free
                        </Link>
                    </p>
                </Card>

                <div className="mt-8 text-center flex flex-col items-center gap-4 text-slate-400 dark:text-slate-500">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
                        <Lock size={12} />
                        Secured with encrypted authentication
                    </div>
                    <p className="text-xs italic">
                        &copy; 2026 AntiGravity Systems. Professional fintech-grade security.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
