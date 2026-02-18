import React from 'react';
import { MessageSquare, AlertTriangle, CheckCircle } from 'lucide-react';

const AgentDashboard: React.FC = () => {
    return (
        <div className="fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Agent Dashboard</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Monitor user issues and system alerts.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="glass-card">
                    <div className="flex-between">
                        <span style={{ color: 'var(--text-secondary)' }}>Active Tickets</span>
                        <MessageSquare size={20} color="var(--color-primary)" />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>14</h2>
                    <p style={{ color: 'var(--color-warning)', fontSize: '0.875rem' }}>+3 urgent requests</p>
                </div>
                <div className="glass-card">
                    <div className="flex-between">
                        <span style={{ color: 'var(--text-secondary)' }}>Fraud Alerts</span>
                        <AlertTriangle size={20} color="var(--color-danger)" />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>5</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Requires verification</p>
                </div>
                <div className="glass-card">
                    <div className="flex-between">
                        <span style={{ color: 'var(--text-secondary)' }}>Resolved Today</span>
                        <CheckCircle size={20} color="var(--color-success)" />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>42</h2>
                    <p style={{ color: 'var(--color-success)', fontSize: '0.875rem' }}>Top performer: Sarah</p>
                </div>
            </div>

            <section className="glass-card">
                <h3 style={{ marginBottom: '1.5rem' }}>Priority Queue</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                            <th style={{ padding: '1rem 0' }}>User</th>
                            <th>Issue</th>
                            <th>Risk Score</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '1rem 0' }}>
                                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>J</div>
                                    <span>Bhuvan (You)</span>
                                </div>
                            </td>
                            <td>Unrecognized Transaction (Moscow)</td>
                            <td><span style={{ color: 'var(--color-danger)' }}>High (92)</span></td>
                            <td><span className="badge badge-warning">Investigating</span></td>
                            <td><button className="btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Review</button></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '1rem 0' }}>
                                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>A</div>
                                    <span>Alice Smith</span>
                                </div>
                            </td>
                            <td>Login Trouble</td>
                            <td><span style={{ color: 'var(--color-success)' }}>Low (12)</span></td>
                            <td><span className="badge badge-success">Open</span></td>
                            <td><button className="btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Review</button></td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AgentDashboard;
