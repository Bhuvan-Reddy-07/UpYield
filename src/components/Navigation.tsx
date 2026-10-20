import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, ShieldCheck, LifeBuoy, Activity, Users, User,
    Smartphone, TrendingUp, PieChart, Landmark, Check, Zap
} from 'lucide-react';

const Navigation: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const navGroups = [
        {
            title: 'Overview',
            items: [
                { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
            ]
        },
        {
            title: 'Payments & Transfers',
            items: [
                { name: 'UPI Payments', path: '/payments/upi', icon: <Smartphone size={18} /> },
                // { name: 'Money Transfer', path: '/payments/transfer', icon: <Send size={18} /> },
                // { name: 'Bill Payments', path: '/payments/bills', icon: <FileText size={18} /> },
            ]
        },
        {
            title: 'Investments',
            items: [
                { name: 'Stock Market', path: '/invest/stocks', icon: <TrendingUp size={18} /> },
                { name: 'Mutual Funds', path: '/invest/funds', icon: <PieChart size={18} /> },
            ]
        },
        {
            title: 'Connected Finance',
            items: [
                { name: 'Linked Banks', path: '/finance/accounts', icon: <Landmark size={18} /> },
                { name: 'RBI Verification', path: '/finance/rbi-check', icon: <Check size={18} /> },
            ]
        },
        {
            title: 'Support',
            items: [
                { name: 'My Issues', path: '/issues', icon: <ShieldCheck size={18} /> },
                { name: 'Agent Dashboard', path: '/agent', icon: <Users size={18} /> },
                { name: 'Help Center', path: '/help', icon: <LifeBuoy size={18} /> },
                { name: 'System Status', path: '/status', icon: <Activity size={18} /> },
                { name: 'Profile', path: '/profile', icon: <User size={18} /> },
            ]
        }
    ];

    return (
        <nav className="sidebar">
            <div className="sidebar-brand">
                <div style={{
                    background: 'var(--gradient-primary)',
                    padding: '0.6rem',
                    borderRadius: '12px',
                    display: 'flex',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                    <Zap size={24} color="white" fill="white" />
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
                    Up<span className="text-gradient">Yield</span>
                </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {navGroups.map((group, idx) => (
                    <div key={idx}>
                        <h4 className="nav-group-title">
                            {group.title}
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {group.items.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: 'var(--border-glass)' }}>
                <div className="glass-card" style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                    <div className="flex-between">
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Trust Score</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 700 }}>98/100</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '0.5rem', borderRadius: '2px' }}>
                        <div style={{ width: '98%', height: '100%', background: 'var(--gradient-success)', borderRadius: '2px', boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)' }} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

