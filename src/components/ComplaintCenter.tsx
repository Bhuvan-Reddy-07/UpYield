import React, { useState } from 'react';
import { Clock, CheckCircle, Plus } from 'lucide-react';

interface Complaint {
    id: string;
    category: string;
    subject: string;
    status: 'open' | 'in_progress' | 'resolved';
    date: string;
}

const ComplaintCenter: React.FC = () => {
    const [complaints] = useState<Complaint[]>([
        { id: 'C-1023', category: 'Refund', subject: 'Refund not received for txn #9921', status: 'in_progress', date: '2025-01-20' },
        { id: 'C-0998', category: 'Fraud', subject: 'Suspicious charge reported', status: 'resolved', date: '2025-01-15' },
    ]);

    return (
        <div style={{ padding: '2rem' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', margin: 0 }}>My Issues & Complaints</h2>
                <button
                    className="flex-center"
                    style={{
                        background: 'var(--color-primary)', color: 'white', border: 'none',
                        padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', gap: '0.5rem',
                        cursor: 'pointer', fontWeight: 600
                    }}
                >
                    <Plus size={18} />
                    Raise New Issue
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {complaints.map(issue => (
                    <div key={issue.id} className="glass-card" style={{ padding: '1.25rem' }}>
                        <div className="flex-between">
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div
                                    className="flex-center"
                                    style={{
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        background: issue.status === 'resolved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(14, 165, 233, 0.1)',
                                        color: issue.status === 'resolved' ? 'var(--color-success)' : 'var(--color-secondary)'
                                    }}
                                >
                                    {issue.status === 'resolved' ? <CheckCircle size={20} /> : <Clock size={20} />}
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 0.25rem 0' }}>{issue.subject}</h4>
                                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        <span>ID: {issue.id}</span>
                                        <span>•</span>
                                        <span>{issue.category}</span>
                                        <span>•</span>
                                        <span>{issue.date}</span>
                                    </div>
                                </div>
                            </div>

                            <span className={`badge badge-${issue.status === 'resolved' ? 'success' : issue.status === 'in_progress' ? 'warning' : 'neutral'}`}>
                                {issue.status.replace('_', ' ')}
                            </span>
                        </div>

                        {issue.status === 'in_progress' && (
                            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)' }}>
                                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--color-secondary)' }}>Support Update:</span> We have contacted the merchant regarding your refund. Expect an update within 24 hours.
                                </p>
                            </div>
                        )}

                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
                                View Conversation →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComplaintCenter;
