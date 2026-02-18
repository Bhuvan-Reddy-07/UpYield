import React, { useState } from 'react';
import { QrCode, Send, Download, CheckCircle, Smartphone, Info } from 'lucide-react';
import QRScanner from './QRScanner';

const UPIPayments: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'send' | 'request' | 'confirm'>('send');
    const [showScanner, setShowScanner] = useState(false);
    const [vpa, setVpa] = useState('');
    const [amount, setAmount] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const recentContacts = [
        { name: 'Alex Doe', vpa: 'alex@upi', avatar: 'AD' },
        { name: 'Sarah Smith', vpa: 'sarah@pnb', avatar: 'SS' },
        { name: 'Mike Ross', vpa: 'mike@axis', avatar: 'MR' },
        { name: 'Local Store', vpa: 'store@paytm', avatar: 'LS' },
    ];

    const handleVpaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVpa(e.target.value);
        setIsVerified(false);
        if (e.target.value.includes('@') && e.target.value.length > 5) {
            // Mock verification delay
            setTimeout(() => setIsVerified(true), 1000);
        }
    };

    const handleScanComplete = (data: string) => {
        console.log("Scanned:", data);
        setShowScanner(false);
        setVpa("merchant@upyield");
        setIsVerified(true);
        setAmount("500");
    };

    return (
        <div className="fade-in" style={{ paddingBottom: '2rem' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>UPI Payments</h1>
                    <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>Secure P2P Transfers & Merchant Payments</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>My UPI ID</div>
                    <div className="flex-center" style={{ gap: '0.5rem', background: 'rgba(0,102,204,0.1)', padding: '0.5rem 1rem', borderRadius: '20px', marginTop: '0.25rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>user@upyield</span>
                        <QrCode size={16} color="var(--color-primary)" style={{ cursor: 'pointer' }} onClick={() => setShowScanner(true)} />
                    </div>
                </div>
            </div>

            {/* Main Action Card */}
            <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-glass)', marginBottom: '1.5rem' }}>
                    <button
                        className="tab-btn"
                        onClick={() => setActiveTab('send')}
                        style={{
                            flex: 1, padding: '1rem', background: 'none', border: 'none',
                            borderBottom: activeTab === 'send' ? '2px solid var(--color-primary)' : '2px solid transparent',
                            color: activeTab === 'send' ? 'var(--color-primary)' : 'var(--text-secondary)',
                            fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                        }}
                    >
                        <Send size={18} /> Send Money
                    </button>
                    <button
                        className="tab-btn"
                        onClick={() => setActiveTab('request')}
                        style={{
                            flex: 1, padding: '1rem', background: 'none', border: 'none',
                            borderBottom: activeTab === 'request' ? '2px solid var(--color-primary)' : '2px solid transparent',
                            color: activeTab === 'request' ? 'var(--color-primary)' : 'var(--text-secondary)',
                            fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                        }}
                    >
                        <Download size={18} /> Request Money
                    </button>
                </div>

                <div style={{ padding: '0 1rem 1rem 1rem' }}>
                    {/* Scan QR Button */}
                    <button
                        onClick={() => setShowScanner(true)}
                        style={{
                            width: '100%', padding: '1rem', marginBottom: '2rem',
                            background: 'var(--bg-dark)', border: '1px dashed var(--color-primary)',
                            borderRadius: '12px', color: 'var(--color-primary)', fontWeight: 600,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            cursor: 'pointer', transition: 'all 0.2s'
                        }}
                    >
                        <QrCode size={20} /> Scan QR to Pay
                    </button>

                    {/* Search / VPA Input */}
                    <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            To UPI ID / Mobile Number
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Smartphone style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                type="text"
                                value={vpa}
                                onChange={handleVpaChange}
                                placeholder="Enter VPA (e.g. name@upi) or Mobile"
                                className="input-field"
                                style={{
                                    width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem',
                                    border: '1px solid var(--text-muted)', borderRadius: '8px',
                                    fontSize: '1rem', background: 'var(--bg-card)'
                                }}
                            />
                            {isVerified && (
                                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-success)', display: 'flex', gap: '0.25rem', fontSize: '0.8rem', alignItems: 'center' }}>
                                    <CheckCircle size={14} /> Verified
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Contacts */}
                    {!vpa && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Recent</h4>
                            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                                {recentContacts.map((contact, i) => (
                                    <div key={i} onClick={() => { setVpa(contact.vpa); setIsVerified(true); }} style={{ textAlign: 'center', cursor: 'pointer', minWidth: '70px' }}>
                                        <div className="flex-center" style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #0066CC, #0EA5E9)', color: 'white', fontWeight: 600, margin: '0 auto 0.5rem auto' }}>
                                            {contact.avatar}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Amount Input */}
                    {vpa && (
                        <div className="fade-in" style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                Amount
                            </label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', fontWeight: 600 }}>₹</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0"
                                    style={{
                                        width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem',
                                        border: '1px solid var(--text-muted)', borderRadius: '8px',
                                        fontSize: '1.5rem', fontWeight: 700,
                                        background: 'var(--bg-card)'
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Pay Button triggered Confirmation */}
                    <button
                        onClick={() => setActiveTab('confirm')} // Using state to switch view or just a modal state
                        disabled={!vpa || !amount}
                        className="btn-primary"
                        style={{
                            width: '100%', padding: '1rem', borderRadius: '12px',
                            opacity: (!vpa || !amount) ? 0.6 : 1, cursor: (!vpa || !amount) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {activeTab === 'send' ? 'Pay Securely' : 'Request Payment'}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={12} /> Powered by UpYield Secure Gateway
                    </div>
                </div>
            </div>

            {/* Confirmation Modal with Fee Transparency */}
            {
                activeTab === 'confirm' && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.85)', zIndex: 1000,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backdropFilter: 'blur(5px)'
                    }}>
                        <div className="glass-card animate-slide-up" style={{
                            width: '90%', maxWidth: '500px',
                            background: 'var(--bg-card)', padding: '2rem',
                            border: '1px solid var(--border-glass-strong)',
                            boxShadow: 'var(--shadow-glass)'
                        }}>
                            <div className="flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Payment Invoice</h2>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Transaction ID: #UPY{Math.floor(Math.random() * 1000000)}</div>
                                </div>
                                <button onClick={() => setActiveTab('send')} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>&times;</button>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                {/* Base Amount */}
                                <div className="flex-between" style={{ marginBottom: '1rem', fontSize: '1rem' }}>
                                    <span style={{ color: 'var(--text-primary)' }}>Transfer Amount</span>
                                    <span style={{ fontWeight: 600 }}>₹{Number(amount).toFixed(2)}</span>
                                </div>

                                {/* Platform Fee */}
                                <div className="flex-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                        Platform Fee
                                        <div className="tooltip-container">
                                            <Info size={14} style={{ cursor: 'help', color: 'var(--color-primary)' }} />
                                            <div className="tooltip">Standard processing fee for secure UPI transfers.</div>
                                        </div>
                                    </div>
                                    <span>₹5.00</span>
                                </div>

                                {/* CGST */}
                                <div className="flex-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                        CGST (9%)
                                        <div className="tooltip-container">
                                            <Info size={14} style={{ cursor: 'help', color: 'var(--text-muted)' }} />
                                            <div className="tooltip">Central Goods & Services Tax on the fee component.</div>
                                        </div>
                                    </div>
                                    <span>₹0.45</span>
                                </div>

                                {/* SGST */}
                                <div className="flex-between" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                        SGST (9%)
                                        <div className="tooltip-container">
                                            <Info size={14} style={{ cursor: 'help', color: 'var(--text-muted)' }} />
                                            <div className="tooltip">State Goods & Services Tax on the fee component.</div>
                                        </div>
                                    </div>
                                    <span>₹0.45</span>
                                </div>

                                <div style={{ borderTop: '1px dashed var(--border-glass)', margin: '1rem 0' }} />

                                {/* Total */}
                                <div className="flex-between" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                                    <span>Total Payable</span>
                                    <span>₹{(Number(amount) + 5.90).toFixed(2)}</span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', textAlign: 'right' }}>
                                    Inc. of all taxes
                                </div>
                            </div>

                            <button
                                className="btn-primary"
                                style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontSize: '1.1rem', background: 'var(--gradient-primary)' }}
                                onClick={() => { alert('Payment Success!'); setActiveTab('send'); setAmount(''); setVpa(''); }}
                            >
                                Pay ₹{(Number(amount) + 5.90).toFixed(2)}
                            </button>

                            <div style={{ marginTop: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-success)' }}>
                                    <CheckCircle size={16} />
                                    <span>Your payment is protected by 256-bit encryption.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <style>{`
                .animate-slide-up { animation: slideUp 0.3s ease-out; }
                @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
                .tooltip-container { position: relative; display: inline-flex; }
                .tooltip { 
                    visibility: hidden; position: absolute; bottom: 100%; left: 50%; 
                    transform: translateX(-50%); background: #333; color: white; 
                    padding: 0.5rem; borderRadius: 4px; font-size: 0.75rem; 
                    width: 200px; text-align: center; z-index: 10; margin-bottom: 5px;
                    opacity: 0; transition: opacity 0.2s;
                }
                .tooltip-container:hover .tooltip { visibility: visible; opacity: 1; }
            `}</style>

            {showScanner && <QRScanner onScan={handleScanComplete} onClose={() => setShowScanner(false)} />}
        </div >
    );
};

export default UPIPayments;
