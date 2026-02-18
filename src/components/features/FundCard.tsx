import React from 'react';
import { TrendingUp, Star, Info } from 'lucide-react';

interface FundProps {
    fund: {
        id: string;
        name: string;
        category: string;
        risk: string;
        rating: number;
        nav: number;
        returns: string;
    };
    onInvest: (fundId: string) => void;
}

const FundCard: React.FC<FundProps> = ({ fund, onInvest }) => {
    return (
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.2s' }}>
            <div className="flex-between">
                <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        {fund.category} • {fund.risk}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{fund.name}</div>
                </div>
                <div className="flex-center" style={{ gap: '0.25rem', background: 'var(--bg-dark)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{fund.rating}</span>
                    <Star size={12} fill="var(--color-warning)" color="var(--color-warning)" />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem 0', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
                <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>NAV</div>
                    <div style={{ fontWeight: 600 }}>₹{fund.nav}</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>3Y Returns</div>
                    <div style={{ fontWeight: 600, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <TrendingUp size={14} /> {fund.returns}
                    </div>
                </div>
            </div>

            <div className="flex-between" style={{ marginTop: 'auto' }}>
                <button
                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                    Details <Info size={14} />
                </button>
                <button
                    onClick={() => onInvest(fund.id)}
                    className="btn-primary"
                    style={{ padding: '0.5rem 1.5rem', borderRadius: '8px', fontSize: '0.9rem' }}
                >
                    Invest
                </button>
            </div>
        </div>
    );
};

export default FundCard;
