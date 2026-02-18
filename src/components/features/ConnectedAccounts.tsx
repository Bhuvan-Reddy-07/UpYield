import React, { useState } from 'react';
import { Landmark, Plus, RefreshCw, Eye, EyeOff, ShieldCheck, ExternalLink } from 'lucide-react';

const MOCK_ACCOUNTS = [
    { id: 1, bank: 'HDFC Bank', type: 'Savings', accountNo: '**** 4512', balance: 124500.50, color: '#1d4ed8', url: 'https://www.hdfc.bank.in/' },
    { id: 2, bank: 'SBI', type: 'Savings', accountNo: '**** 8892', balance: 54200.00, color: '#0ea5e9', url: 'https://onlinesbi.sbi.bank.in/' },
    { id: 3, bank: 'ICICI Bank', type: 'Current', accountNo: '**** 1234', balance: 28000.75, color: '#ea580c', url: 'https://www.icici.bank.in/' },
];

const ConnectedAccounts: React.FC = () => {
    const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);
    const [showBalance, setShowBalance] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => setIsSyncing(false), 2000);
    };

    const handleAddAccount = () => {
        // Mock adding an account
        setShowAddModal(false);
        setAccounts(prev => [
            ...prev,
            { id: prev.length + 1, bank: 'Axis Bank', type: 'Savings', accountNo: '**** 9999', balance: 10000.00, color: '#be123c', url: 'https://www.axis.bank.in/' }
        ]);
    };

    const handleBankClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="fade-in" style={{ paddingBottom: '2rem' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>Connected Accounts</h1>
                    <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>Unified View of Your Finanical World</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <button
                        onClick={handleSync}
                        style={{
                            background: 'none', border: '1px solid var(--border-glass)',
                            padding: '0.5rem 1rem', borderRadius: '8px',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                            color: 'var(--text-primary)'
                        }}
                    >
                        <RefreshCw size={16} className={isSyncing ? 'spin' : ''} /> {isSyncing ? 'Syncing...' : 'Sync Now'}
                    </button>
                    {isSyncing && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Last synced: Just now</div>}
                </div>
            </div>

            {/* Aggregate Card */}
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, var(--color-primary), #4338ca)', color: 'white' }}>
                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.9 }}>
                        <ShieldCheck size={18} /> Total Net Worth
                    </div>
                    <button onClick={() => setShowBalance(!showBalance)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                    {showBalance ? `₹${totalBalance.toLocaleString()}` : '••••••••'}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}>
                    Across {accounts.length} linked accounts
                </div>
            </div>

            {/* Accounts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {accounts.map(acc => (
                    <div
                        key={acc.id}
                        className="glass-card hover-bg-glass"
                        style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' }}
                        onClick={() => handleBankClick(acc.url)}
                        title={`Go to ${acc.bank} website`}
                    >
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: acc.color }} />
                        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div className="flex-center" style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-dark)', color: 'var(--text-primary)' }}>
                                    <Landmark size={20} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{acc.bank}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{acc.type} • {acc.accountNo}</div>
                                </div>
                            </div>
                            <ExternalLink size={16} style={{ color: 'var(--text-muted)' }} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Available Balance</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹{acc.balance.toLocaleString()}</div>
                        </div>
                    </div>
                ))}

                {/* Add New Card */}
                <div
                    onClick={() => setShowAddModal(true)}
                    className="glass-card flex-center"
                    style={{
                        padding: '1.5rem', border: '2px dashed var(--border-glass)',
                        background: 'transparent', cursor: 'pointer',
                        flexDirection: 'column', gap: '1rem', minHeight: '180px',
                        transition: 'all 0.2s'
                    }}
                >
                    <div className="flex-center" style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--bg-card-hover)' }}>
                        <Plus size={24} color="var(--color-primary)" />
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Link New Account</div>
                </div>
            </div>

            {/* Add Account Modal */}
            {showAddModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div className="glass-card" style={{ padding: '2rem', width: '90%', maxWidth: '400px', background: 'var(--bg-card-hover)', textAlign: 'center' }}>
                        <h2 style={{ marginTop: 0 }}>Link Bank Account</h2>
                        <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Securely fetch details from your Axis Bank account linked to +91 9876543210.
                            </p>
                            <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <li>Encrypted connection</li>
                                <li>Read-only access</li>
                                <li>RBI AA Framework compliant</li>
                            </ul>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button
                                onClick={() => setShowAddModal(false)}
                                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddAccount}
                                className="btn-primary"
                                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px' }}

                            >
                                Link Axis Bank
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default ConnectedAccounts;
