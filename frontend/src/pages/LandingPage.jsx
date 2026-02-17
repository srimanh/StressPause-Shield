import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, TrendingUp, Lock, Zap } from 'lucide-react';
import Button from '@ui/Button';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-6 py-6 lg:px-20 max-w-7xl mx-auto">
                <div className="flex items-center gap-2 italic">
                    <Shield className="text-primary" size={32} />
                    <span className="text-2xl font-bold tracking-tight text-slate-900">StressPause</span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-slate-600 font-medium hover:text-primary transition-standard">Features</a>
                    <a href="#security" className="text-slate-600 font-medium hover:text-primary transition-standard">Security</a>
                    <a href="#pricing" className="text-slate-600 font-medium hover:text-primary transition-standard">Pricing</a>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/dashboard">
                        <Button variant="ghost">Login</Button>
                    </Link>
                    <Link to="/dashboard">
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative px-6 pt-20 pb-32 lg:px-20 lg:pt-32 max-w-7xl mx-auto text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                    <Zap size={16} />
                    <span>New: Real-time fraud detection v2.0</span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-8 animate-in fade-in slide-in-from-top-6 duration-1000">
                    Take Control of Your <br />
                    <span className="text-primary italic">Financial Gravity.</span>
                </h1>

                <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed animate-in fade-in slide-in-from-top-8 duration-1000 delay-200">
                    Experience the next generation of financial management. Secure, lightning-fast,
                    and designed for modern enterprises that demand absolute precision.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                    <Link to="/dashboard">
                        <Button size="lg" className="w-full sm:w-auto gap-2">
                            Start Free Trial <ArrowRight size={20} />
                        </Button>
                    </Link>
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                        Book a Demo
                    </Button>
                </div>
            </section>

            {/* Stats / Features Preview */}
            <section id="features" className="px-6 py-24 lg:px-20 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-premium border border-slate-50 group hover:border-primary/20 transition-standard">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 transition-standard group-hover:scale-110">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Analytics</h3>
                            <p className="text-slate-500 font-medium">Predictive insights that help you anticipate market shifts before they happen.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-premium border border-slate-50 group hover:border-primary/20 transition-standard">
                            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-6 transition-standard group-hover:scale-110">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Settlement</h3>
                            <p className="text-slate-500 font-medium">Bypass traditional banking delays with our proprietary high-speed ledger.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-premium border border-slate-50 group hover:border-primary/20 transition-standard">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-6 transition-standard group-hover:scale-110">
                                <Lock size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Military-Grade</h3>
                            <p className="text-slate-500 font-medium">256-bit encryption and multi-sig wallets ensuring your assets are always shielded.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 lg:px-20 border-t border-slate-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-2 italic">
                        <Shield className="text-primary" size={24} />
                        <span className="text-xl font-bold tracking-tight text-slate-800">StressPause</span>
                    </div>
                    <div className="flex gap-8 text-slate-400 text-sm font-medium">
                        <a href="#" className="hover:text-primary transition-standard">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-standard">Terms of Service</a>
                        <a href="#" className="hover:text-primary transition-standard">Contact Support</a>
                    </div>
                    <p className="text-slate-400 text-sm font-medium italic">
                        &copy; 2026 AntiGravity Systems.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
