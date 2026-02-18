import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export type RiskLevel = 'low' | 'medium' | 'high';

interface FraudAlertCardProps {
    riskLevel: RiskLevel;
    confidenceScore: number; // New param
    reason: string;
    transactionAmount: string;
    merchant: string;
    onAction: () => void;
    onDismiss: () => void;
}

const FraudAlertCard: React.FC<FraudAlertCardProps> = ({
    riskLevel, confidenceScore, reason, transactionAmount, merchant, onAction, onDismiss
}) => {
    const getColors = () => {
        switch (riskLevel) {
            case 'high': return { border: 'var(--color-danger)', bg: 'rgba(239, 68, 68, 0.1)', icon: 'var(--color-danger)' };
            case 'medium': return { border: 'var(--color-warning)', bg: 'rgba(245, 158, 11, 0.1)', icon: 'var(--color-warning)' };
            default: return { border: 'var(--color-success)', bg: 'rgba(16, 185, 129, 0.1)', icon: 'var(--color-success)' };
        }
    };

    const colors = getColors();

    return (
        <div className="glass-card animate-fade-in" style={{
            borderColor: colors.border,
            background: `linear-gradient(to right, ${colors.bg}, transparent)`
        }}>
            <div className="flex-between">
                <div className="flex-center" style={{ gap: '0.75rem' }}>
                    <ShieldAlert size={24} color={colors.icon} />
                    <div>
                        <h4 style={{ margin: 0, fontWeight: 600 }}>Suspicious Activity Detected</h4>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
                            <span className={`badge badge-${riskLevel === 'high' ? 'danger' : 'warning'}`} style={{ display: 'inline-block' }}>
                                {riskLevel.toUpperCase()} RISK
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                {confidenceScore}% Confidence
                            </span>
                        </div>
                    </div>
                </div>
                <button onClick={onDismiss} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    ✕
                </button>
            </div>

            <div style={{ margin: '1rem 0', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)' }}>
                <div className="flex-between">
                    <span style={{ color: 'var(--text-secondary)' }}>Merchant</span>
                    <span style={{ fontWeight: 500 }}>{merchant}</span>
                </div>
                <div className="flex-between" style={{ marginTop: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Amount</span>
                    <span style={{ fontWeight: 600 }}>{transactionAmount}</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <Info size={16} color="var(--color-secondary)" style={{ marginTop: '2px' }} />
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {reason}
                </p>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
                <button
                    onClick={onAction}
                    style={{
                        flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-md)',
                        background: 'var(--color-danger)', color: 'white', border: 'none',
                        fontWeight: 500, cursor: 'pointer'
                    }}
                >
                    Secure Account
                </button>
                <button
                    style={{
                        flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-md)',
                        background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)',
                        fontWeight: 500, cursor: 'pointer'
                    }}
                >
                    It was me
                </button>
            </div>
        </div>
    );
};

export default FraudAlertCard;
