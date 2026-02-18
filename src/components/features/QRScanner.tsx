import React, { useState, useEffect } from 'react';
import { X, Camera, Zap, CheckCircle } from 'lucide-react';

interface QRScannerProps {
    onScan: (data: string) => void;
    onClose: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
    const [scanning, setScanning] = useState(true);
    const [, setProgress] = useState(0);

    useEffect(() => {
        if (scanning) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setScanning(false);
                        setTimeout(() => onScan("upi://pay?pa=merchant@upyield&pn=Store_123&am=500"), 500);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [scanning, onScan]);

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.9)', zIndex: 1000,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
            <button
                onClick={onClose}
                style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: 'none', border: 'none', color: 'white', cursor: 'pointer'
                }}
            >
                <X size={32} />
            </button>

            <div className="flex-center" style={{ flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ color: 'white', margin: 0 }}>Scan QR Code</h2>

                <div style={{
                    width: '300px', height: '300px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '24px', position: 'relative',
                    overflow: 'hidden', background: 'rgba(0,0,0,0.5)'
                }}>
                    {/* Scanner Overlay */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                        background: 'var(--color-primary)',
                        boxShadow: '0 0 20px var(--color-primary)',
                        animation: 'scan 2s linear infinite',
                        transform: `translateY(${scanning ? '0%' : '50%'})`
                    }} />

                    {/* Corner Markers */}
                    <div style={{ position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderTop: '4px solid var(--color-primary)', borderLeft: '4px solid var(--color-primary)', borderRadius: '8px 0 0 0' }} />
                    <div style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderTop: '4px solid var(--color-primary)', borderRight: '4px solid var(--color-primary)', borderRadius: '0 8px 0 0' }} />
                    <div style={{ position: 'absolute', bottom: 20, left: 20, width: 40, height: 40, borderBottom: '4px solid var(--color-primary)', borderLeft: '4px solid var(--color-primary)', borderRadius: '0 0 0 8px' }} />
                    <div style={{ position: 'absolute', bottom: 20, right: 20, width: 40, height: 40, borderBottom: '4px solid var(--color-primary)', borderRight: '4px solid var(--color-primary)', borderRadius: '0 0 8px 0' }} />

                    {!scanning && (
                        <div className="flex-center" style={{ width: '100%', height: '100%', flexDirection: 'column', color: 'var(--color-success)' }}>
                            <CheckCircle size={48} />
                            <p style={{ marginTop: '1rem', fontWeight: 600 }}>QR Detected</p>
                        </div>
                    )}
                </div>

                <div style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                    <p style={{ margin: 0 }}>Align QR code within the frame to pay</p>
                </div>

                <div className="flex-center" style={{ gap: '2rem' }}>
                    <div className="flex-center" style={{ flexDirection: 'column', gap: '0.5rem', color: 'white' }}>
                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
                            <Camera size={24} />
                        </div>
                        <span style={{ fontSize: '0.8rem' }}>Upload</span>
                    </div>
                    <div className="flex-center" style={{ flexDirection: 'column', gap: '0.5rem', color: 'white' }}>
                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
                            <Zap size={24} />
                        </div>
                        <span style={{ fontSize: '0.8rem' }}>Flash</span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scan {
                    0% { top: 0%; }
                    50% { top: 50%; opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default QRScanner;
