import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ArrowUpRight, ArrowDownLeft, MoreHorizontal, ShieldCheck } from 'lucide-react';
import FraudAlertCard from './FraudAlertCard';
import TopBar from './TopBar';
import CreditCardVisual from './CreditCardVisual';
import StatCard from './StatCard';

// Temporary type def
type TransactionStatus = 'initiated' | 'processing' | 'success' | 'failed' | 'refunded';

const TrustDashboard: React.FC = () => {
    // Real-time alert simulation
    const [alertCount, setAlertCount] = useState(1);
    const [timeRange, setTimeRange] = useState('Monthly');

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.8) {
                setAlertCount(prev => prev + 1);
            }
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    // Mock Data
    const recentTransactions = [
        { id: 1, merchant: 'Netflix', amount: '₹649', status: 'success' as TransactionStatus, time: new Date().toISOString(), logo: 'N', type: 'subscription' },
        { id: 2, merchant: 'Unknown Vendor', amount: '₹12,400', status: 'failed' as TransactionStatus, time: new Date(Date.now() - 3600000).toISOString(), logo: '?', type: 'fraud' },
        { id: 3, merchant: 'Swiggy', amount: '₹450', status: 'processing' as TransactionStatus, time: new Date(Date.now() - 7200000).toISOString(), logo: 'S', type: 'food' },
        { id: 4, merchant: 'Zomato', amount: '₹1,250', status: 'success' as TransactionStatus, time: new Date(Date.now() - 86400000).toISOString(), logo: 'Z', type: 'food' },
        { id: 5, merchant: 'Amazon Prime', amount: '₹1,499', status: 'success' as TransactionStatus, time: new Date(Date.now() - 172800000).toISOString(), logo: 'A', type: 'shopping' },
    ];

    return (
        <div className="fade-in" style={{ padding: '0 2rem 2rem 2rem', maxWidth: '1600px', margin: '0 auto' }}>
            <TopBar />

            {/* Main Grid Layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '2.5fr 1fr',
                gap: '2rem'
            }}>

                {/* LEFT COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* 1. Stat Cards Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        <StatCard
                            title="Total Balance"
                            amount="₹1,24,500"
                            trend="+12%"
                            trendUp={true}
                            icon={Wallet}
                            color="#06B6D4" // Cyan
                            gradient="var(--card-gradient-1)"
                        />
                        <StatCard
                            title="Total Income"
                            amount="₹85,000"
                            trend="+5.2%"
                            trendUp={true}
                            icon={ArrowDownLeft}
                            color="#10B981" // Emerald
                            gradient="linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)"
                        />
                        <StatCard
                            title="Total Expenses"
                            amount="₹32,450"
                            trend="-2.1%"
                            trendUp={true} // Down is good for expense, so valid trend
                            icon={ArrowUpRight}
                            color="#F43F5E" // Rose
                            gradient="linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)"
                        />
                    </div>

                    {/* 2. Transaction Reports (Chart Placeholder + Recent List) */}
                    <div className="glass-panel" style={{ minHeight: '400px', padding: '1.5rem' }}>
                        <div className="flex-between" style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Transaction History</h3>
                            <div className="flex-center" style={{ gap: '1rem' }}>
                                <select
                                    value={timeRange}
                                    onChange={(e) => setTimeRange(e.target.value)}
                                    style={{
                                        background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-secondary)',
                                        padding: '0.4rem 0.8rem', borderRadius: '8px', cursor: 'pointer', outline: 'none'
                                    }}
                                >
                                    <option>Weekly</option>
                                    <option>Monthly</option>
                                    <option>Yearly</option>
                                </select>
                                <Link to="/history" style={{ fontSize: '0.9rem', color: 'var(--color-primary)', textDecoration: 'none' }}>View All</Link>
                            </div>
                        </div>

                        {/* List Header */}
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '0 1rem 1rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            <div>Merchant</div>
                            <div>Date</div>
                            <div>Amount</div>
                            <div>Status</div>
                            <div style={{ textAlign: 'right' }}>Action</div>
                        </div>

                        {/* List Items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                            {recentTransactions.map(tx => (
                                <div key={tx.id} className="list-item-selectable" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            width: '36px', height: '36px', borderRadius: '10px',
                                            background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600
                                        }}>
                                            {tx.logo}
                                        </div>
                                        <span style={{ fontWeight: 500 }}>{tx.merchant}</span>
                                    </div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        {new Date(tx.time).toLocaleDateString()}
                                    </div>
                                    <div style={{ fontWeight: 600 }}>{tx.amount}</div>
                                    <div>
                                        <span className={`badge badge-${tx.status === 'success' ? 'success' : tx.status === 'failed' ? 'danger' : 'warning'}`}>
                                            {tx.status}
                                        </span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <button className="btn-icon" style={{ marginLeft: 'auto' }}><MoreHorizontal size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* 3. My Cards */}
                    <div>
                        <div className="flex-between" style={{ marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>My Cards</h3>
                            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>+ Add Card</button>
                        </div>
                        <CreditCardVisual />
                    </div>

                    {/* 4. Risk Alerts */}
                    <div>
                        <div className="flex-between" style={{ marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Security Alerts</h3>
                            <span className="badge badge-danger" style={{ opacity: alertCount > 0 ? 1 : 0 }}>{alertCount} New</span>
                        </div>
                        {alertCount > 0 ? (
                            <FraudAlertCard
                                riskLevel="high"
                                confidenceScore={94}
                                merchant="Unknown Vendor"
                                transactionAmount="₹12,400"
                                reason="Location mismatch (Moscow, RU)"
                                onAction={() => alert('Account Locking...')}
                                onDismiss={() => setAlertCount(prev => Math.max(0, prev - 1))}
                            />
                        ) : (
                            <div className="glass-panel flex-center" style={{ padding: '2rem', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
                                <ShieldCheck size={40} color="var(--color-success)" style={{ opacity: 0.5 }} />
                                <p>All systems secure</p>
                            </div>
                        )}
                    </div>

                    {/* 5. Quick Transfer (Mock) */}
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0' }}>Quick Transfer</h3>
                        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} style={{ minWidth: '60px', textAlign: 'center', cursor: 'pointer' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', marginBottom: '0.5rem', margin: '0 auto' }} />
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>User {i}</div>
                                </div>
                            ))}
                            <div style={{ minWidth: '60px', textAlign: 'center', cursor: 'pointer' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '1px dashed var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem', margin: '0 auto' }}>+</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>Add</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                            <div className="flex-between">
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Enter Amount</span>
                                <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Max: ₹50k</span>
                            </div>
                            <div className="flex-between" style={{ marginTop: '0.5rem' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>₹</span>
                                <input type="number" placeholder="0.00" style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', color: 'white', textAlign: 'right', width: '100%', outline: 'none' }} />
                            </div>
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', borderRadius: '12px', padding: '1rem' }}>Send Money</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TrustDashboard;

