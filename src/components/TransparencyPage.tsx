import React from 'react';
import { HelpCircle, DollarSign } from 'lucide-react';

const TransparencyPage: React.FC = () => {
    // Mock User Fee Data
    const feeStats = {
        thisMonth: 45.50,
        thisYear: 520.00,
        lifetime: 1250.00,
        transactionsCount: 142,
        totalVolume: 850000
    };

    const traditionalBankFee = feeStats.totalVolume * 0.015; // Assume 1.5% avg
    const savings = traditionalBankFee - feeStats.lifetime;
    const effectiveRate = ((feeStats.lifetime / feeStats.totalVolume) * 100).toFixed(3);

    const fees = [
        { name: 'Platform Fee', amount: '0%', description: 'UpYield is free for personal use.' },
        { name: 'Instant Transfer', amount: '1% or ₹5', description: 'Charged only for immediate IMPS transfers.' },
        { name: 'Intl. Transaction', amount: '2.5% + GST', description: 'Standard forex markup fee.' },
    ];

    return (
        <div className="fade-in" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Fee Transparency Report</h2>
                <div style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '20px', color: 'var(--color-success)', fontWeight: 600, fontSize: '0.9rem' }}>
                    Effective Rate: {effectiveRate}%
                </div>
            </div>

            {/* Lifetime Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-card">
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Fees Paid (This Month)</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹{feeStats.thisMonth}</div>
                </div>
                <div className="glass-card">
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Fees Paid (Lifetime)</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹{feeStats.lifetime}</div>
                </div>
                <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent)', borderColor: 'var(--color-success)' }}>
                    <div style={{ color: 'var(--color-success)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>Total Savings</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)' }}>₹{savings.toLocaleString()}</div>
                    <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.8 }}>vs Traditional Banks</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="glass-card" style={{ background: 'linear-gradient(to right, rgba(79, 70, 229, 0.05), transparent)' }}>
                    <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <DollarSign className="text-primary" />
                        <h3 style={{ margin: 0 }}>Fee Schedule</h3>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <th style={{ padding: '0.75rem 0', color: 'var(--text-secondary)' }}>Type</th>
                                <th style={{ padding: '0.75rem 0', color: 'var(--text-secondary)' }}>Charge</th>
                                <th style={{ padding: '0.75rem 0', color: 'var(--text-secondary)' }}>Why?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fees.map((fee, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem 0', fontWeight: 500 }}>{fee.name}</td>
                                    <td style={{ padding: '1rem 0' }}>{fee.amount}</td>
                                    <td style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{fee.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ borderColor: 'var(--color-secondary)' }}>
                        <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <HelpCircle className="text-secondary" />
                            <h3 style={{ margin: 0 }}>Smart Insight</h3>
                        </div>
                        <p style={{ margin: 0, lineHeight: 1.5, fontSize: '0.9rem' }}>
                            You operate at an effective fee rate of <strong>{effectiveRate}%</strong>, which is <strong>85% lower</strong> than the industry average of 1.5%.
                        </p>
                    </div>

                    <div className="glass-card">
                        <h4 style={{ margin: '0 0 1rem 0' }}>Where do fees go?</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div className="flex-between" style={{ fontSize: '0.85rem' }}>
                                <span>Network Costs (MPI/Visa)</span>
                                <span style={{ fontWeight: 600 }}>60%</span>
                            </div>
                            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}><div style={{ width: '60%', height: '100%', background: 'var(--text-secondary)', borderRadius: '3px' }} /></div>

                            <div className="flex-between" style={{ fontSize: '0.85rem' }}>
                                <span>Taxes (GST)</span>
                                <span style={{ fontWeight: 600 }}>30%</span>
                            </div>
                            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}><div style={{ width: '30%', height: '100%', background: 'var(--text-secondary)', borderRadius: '3px' }} /></div>

                            <div className="flex-between" style={{ fontSize: '0.85rem' }}>
                                <span>UpYield Revenue</span>
                                <span style={{ fontWeight: 600 }}>10%</span>
                            </div>
                            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}><div style={{ width: '10%', height: '100%', background: 'var(--color-success)', borderRadius: '3px' }} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransparencyPage;
