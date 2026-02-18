import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const StatusPage: React.FC = () => {
    const services = [
        { name: 'Authentication System', status: 'operational' },
        { name: 'Payment Processing', status: 'operational' },
        { name: 'Fraud Detection AI', status: 'operational' },
        { name: 'Notification Service', status: 'degraded' },
        { name: 'Web Dashboard', status: 'operational' },
    ];

    return (
        <div className="fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <header className="flex-between" style={{ marginBottom: '2rem' }}>
                <h1>System Status</h1>
                <div className="flex-center" style={{ gap: '0.5rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-success)' }}></div>
                    <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>All Systems Nominal</span>
                </div>
            </header>

            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                {services.map((service, i) => (
                    <div key={i} className="flex-between" style={{
                        padding: '1.25rem',
                        borderBottom: i !== services.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        background: service.status === 'degraded' ? 'rgba(245, 158, 11, 0.05)' : 'transparent'
                    }}>
                        <span style={{ fontWeight: 500 }}>{service.name}</span>
                        <div className="flex-center" style={{ gap: '0.5rem' }}>
                            {service.status === 'operational' ? (
                                <>
                                    <span style={{ color: 'var(--color-success)', fontSize: '0.875rem' }}>Operational</span>
                                    <CheckCircle size={16} color="var(--color-success)" />
                                </>
                            ) : (
                                <>
                                    <span style={{ color: 'var(--color-warning)', fontSize: '0.875rem' }}>Degraded Performance</span>
                                    <AlertCircle size={16} color="var(--color-warning)" />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusPage;
