import React, { useState } from 'react';
import { ShieldCheck, FileCheck, CheckCircle, AlertTriangle, Loader } from 'lucide-react';

const RBIVerification: React.FC = () => {
    const [step, setStep] = useState(1);
    const [verifying, setVerifying] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleVerify = () => {
        setVerifying(true);
        setTimeout(() => {
            setVerifying(false);
            setStep(prev => prev + 1);
            if (step >= 2) setIsComplete(true);
        }, 1500);
    };

    return (
        <div className="fade-in" style={{ paddingBottom: '2rem' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>RBI Compliance & Verification</h1>
                    <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>KYC, Transaction Limits, and Regulatory Status</p>
                </div>
                {isComplete && (
                    <div className="badge badge-success flex-center" style={{ gap: '0.5rem', padding: '0.5rem 1rem' }}>
                        <ShieldCheck size={16} /> Fully Compliant
                    </div>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>

                {/* Main Verification Flow */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Status Card */}
                    <div className="glass-card" style={{ padding: '2rem', borderLeft: isComplete ? '4px solid var(--color-success)' : '4px solid var(--color-warning)' }}>
                        <div className="flex-between">
                            <div>
                                <h2 style={{ marginTop: 0 }}>Verification Status</h2>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    {isComplete
                                        ? 'Your account meets all RBI safety guidelines.'
                                        : 'Complete verification to unlock higher limits and insurance.'}
                                </p>
                            </div>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: isComplete ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {isComplete ? <CheckCircle size={32} color="var(--color-success)" /> : <AlertTriangle size={32} color="var(--color-warning)" />}
                            </div>
                        </div>

                        {/* Progress Steps */}
                        {!isComplete && (
                            <div style={{ marginTop: '2rem' }}>
                                <div className="flex-between" style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div className="flex-center" style={{ width: '30px', height: '30px', borderRadius: '50%', background: step > 1 ? 'var(--color-success)' : 'var(--color-primary)', color: 'white', fontWeight: 600 }}>
                                            {step > 1 ? <CheckCircle size={16} /> : '1'}
                                        </div>
                                        <div style={{ opacity: step === 1 ? 1 : 0.5 }}>
                                            <div style={{ fontWeight: 600 }}>PAN Validation</div>
                                            <div style={{ fontSize: '0.8rem' }}>Check against NSDL database</div>
                                        </div>
                                    </div>
                                    {step === 1 && (
                                        <button onClick={handleVerify} disabled={verifying} className="btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.9rem' }}>
                                            {verifying ? <Loader className="spin" size={16} /> : 'Verify Now'}
                                        </button>
                                    )}
                                </div>

                                <div className="flex-between" style={{ padding: '1rem', background: 'var(--bg-dark)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div className="flex-center" style={{ width: '30px', height: '30px', borderRadius: '50%', background: step > 2 ? 'var(--color-success)' : (step === 2 ? 'var(--color-primary)' : 'var(--bg-card)'), color: step >= 2 ? 'white' : 'var(--text-muted)', fontWeight: 600 }}>
                                            {step > 2 ? <CheckCircle size={16} /> : '2'}
                                        </div>
                                        <div style={{ opacity: step === 2 ? 1 : 0.5 }}>
                                            <div style={{ fontWeight: 600 }}>Digital Video KYC</div>
                                            <div style={{ fontSize: '0.8rem' }}>Face match with Aadhaar</div>
                                        </div>
                                    </div>
                                    {step === 2 && (
                                        <button onClick={handleVerify} disabled={verifying} className="btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.9rem' }}>
                                            {verifying ? <Loader className="spin" size={16} /> : 'Start Call'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Benefits / Certificate Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Active Limits</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <div className="flex-between" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                                    <span>Daily Transfer</span>
                                    <span style={{ fontWeight: 600 }}>{isComplete ? '₹10,00,000' : '₹50,000'}</span>
                                </div>
                                <div style={{ height: '4px', background: 'var(--bg-dark)', borderRadius: '2px' }}>
                                    <div style={{ width: isComplete ? '100%' : '10%', height: '100%', background: 'var(--color-primary)', borderRadius: '2px' }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex-between" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                                    <span>International</span>
                                    <span style={{ fontWeight: 600 }}>{isComplete ? 'Enabled' : 'Disabled'}</span>
                                </div>
                                <div style={{ height: '4px', background: 'var(--bg-dark)', borderRadius: '2px' }}>
                                    <div style={{ width: isComplete ? '100%' : '0%', height: '100%', background: 'var(--color-success)', borderRadius: '2px' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {isComplete && (
                        <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', textAlign: 'center' }}>
                            <FileCheck size={32} style={{ marginBottom: '1rem', opacity: 0.8 }} />
                            <h4 style={{ margin: '0 0 0.5rem 0' }}>Digital Certificate</h4>
                            <p style={{ fontSize: '0.8rem', opacity: 0.6, margin: '0 0 1.5rem 0' }}>
                                Issued on {new Date().toLocaleDateString()}<br />ID: CERT-88219-X
                            </p>
                            <button style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>
                                Download PDF
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default RBIVerification;
