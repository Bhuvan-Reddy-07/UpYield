import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    amount: string;
    trend: string;
    trendUp: boolean;
    icon: LucideIcon;
    color: string;
    gradient?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, amount, trend, trendUp, icon: Icon, color, gradient }) => {
    return (
        <div className="glass-card" style={{
            background: gradient || 'var(--bg-card)',
            position: 'relative',
            overflow: 'hidden',
            border: `1px solid ${color}33` // 20% opacity of hex color
        }}>
            {/* Glow Effect */}
            <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: color,
                filter: 'blur(50px)',
                opacity: 0.15
            }} />

            <div className="flex-between" style={{ marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{title}</span>
                <div style={{
                    padding: '0.5rem',
                    borderRadius: '12px',
                    background: `${color}20`, // 12% opacity
                    color: color
                }}>
                    <Icon size={20} />
                </div>
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.5rem 0', position: 'relative', zIndex: 1 }}>{amount}</h2>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: trendUp ? 'var(--color-success)' : 'var(--color-danger)'
            }}>
                <span style={{
                    background: trendUp ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '99px',
                    fontWeight: 600
                }}>
                    {trend}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>vs last month</span>
            </div>
        </div>
    );
};

export default StatCard;
