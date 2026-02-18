import React, { useState } from 'react';
import { Search, Download, Calendar } from 'lucide-react';
// import { TransactionStatus } from './TransactionTimeline';

// Mock Data
const initialTransactions = [
    { id: 1, merchant: 'Netflix', amount: 649, date: '2026-01-23', status: 'success', category: 'Subscription' },
    { id: 2, merchant: 'Unknown Vendor', amount: 12400, date: '2026-01-23', status: 'failed', category: 'Electronics' },
    { id: 3, merchant: 'Uber', amount: 15.50, date: '2026-01-22', status: 'success', category: 'Transport' },
    { id: 4, merchant: 'Grocery Store', amount: 89.20, date: '2026-01-22', status: 'success', category: 'Groceries' },
    { id: 5, merchant: 'Spotify', amount: 119, date: '2026-01-21', status: 'success', category: 'Subscription' },
    { id: 6, merchant: 'Amazon', amount: 4500, date: '2026-01-20', status: 'processing', category: 'Shopping' },
    { id: 7, merchant: 'Zomato', amount: 450, date: '2026-01-19', status: 'success', category: 'Food' },
    { id: 8, merchant: 'Swiggy', amount: 320, date: '2026-01-19', status: 'success', category: 'Food' },
    { id: 9, merchant: 'Shell Station', amount: 2500, date: '2026-01-18', status: 'success', category: 'Fuel' },
    { id: 10, merchant: 'Apple Store', amount: 129000, date: '2026-01-15', status: 'success', category: 'Electronics' },
    { id: 11, merchant: 'Starbucks', amount: 350, date: '2026-01-14', status: 'success', category: 'Food' },
    { id: 12, merchant: 'Udemy', amount: 499, date: '2026-01-12', status: 'success', category: 'Education' },
    { id: 13, merchant: 'Airbnb', amount: 15000, date: '2026-01-10', status: 'processing', category: 'Travel' },
    { id: 14, merchant: 'PharmEasy', amount: 1200, date: '2026-01-08', status: 'success', category: 'Health' },
    { id: 15, merchant: 'Decathlon', amount: 3400, date: '2026-01-05', status: 'success', category: 'Shopping' },
    { id: 16, merchant: 'BookMyShow', amount: 800, date: '2026-01-03', status: 'failed', category: 'Entertainment' },
    { id: 17, merchant: 'Jio Prepaid', amount: 719, date: '2026-01-01', status: 'success', category: 'Utilities' },
    { id: 18, merchant: 'Electricity Bill', amount: 2450, date: '2025-12-28', status: 'success', category: 'Utilities' },
    { id: 19, merchant: 'Cult.fit', amount: 12000, date: '2025-12-25', status: 'success', category: 'Health' },
    { id: 20, merchant: 'Steam Games', amount: 1500, date: '2025-12-24', status: 'success', category: 'Entertainment' },
];

const TransactionHistory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [transactions] = useState(initialTransactions);

    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.merchant.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'success': return { bg: 'rgba(16, 185, 129, 0.2)', color: 'var(--color-success)' };
            case 'failed': return { bg: 'rgba(239, 68, 68, 0.2)', color: 'var(--color-danger)' };
            case 'processing': return { bg: 'rgba(245, 158, 11, 0.2)', color: 'var(--color-secondary)' };
            default: return { bg: 'rgba(255, 255, 255, 0.1)', color: 'white' };
        }
    };

    return (
        <div className="glass-card">
            <div className="flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ margin: 0 }}>Transaction History</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-secondary" style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Calendar size={16} /> Last 30 Days
                    </button>
                    <button className="btn-secondary" style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                    <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={16} />
                    <input
                        type="text"
                        placeholder="Search merchants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-field"
                        style={{ paddingLeft: '2.25rem', width: '100%' }}
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="input-field"
                    style={{ minWidth: '150px' }}
                >
                    <option value="all">All Status</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                    <option value="processing">Processing</option>
                </select>
            </div>

            {/* Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                <thead>
                    <tr style={{ textAlign: 'left', color: 'var(--text-secondary)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <th style={{ padding: '1rem 0' }}>Merchant</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th style={{ textAlign: 'right' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map(t => {
                        const style = getStatusStyle(t.status);
                        return (
                            <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '1rem 0', fontWeight: 500 }}>{t.merchant}</td>
                                <td style={{ color: 'var(--text-secondary)' }}>{t.category}</td>
                                <td style={{ color: 'var(--text-secondary)' }}>{t.date}</td>
                                <td style={{ fontWeight: 600 }}>₹{t.amount.toLocaleString()}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem', borderRadius: '20px',
                                        background: style.bg, color: style.color,
                                        fontSize: '0.75rem', fontWeight: 600,
                                        textTransform: 'uppercase'
                                    }}>
                                        {t.status}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
