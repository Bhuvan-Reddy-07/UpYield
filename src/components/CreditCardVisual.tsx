import React from 'react';
import { Wifi } from 'lucide-react';

const CreditCardVisual: React.FC = () => {
    return (
        <div style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)',
            borderRadius: '24px',
            padding: '1.5rem',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 40px -10px rgba(168, 85, 247, 0.5)',
            height: '220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            {/* Mesh Overlay */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-20%',
                width: '150%',
                height: '200%',
                background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                transform: 'rotate(-15deg)',
                pointerEvents: 'none'
            }} />

            <div className="flex-between" style={{ position: 'relative', zIndex: 1 }}>
                <Wifi size={24} />
                <span style={{ fontWeight: 800, fontSize: '1.1rem', fontStyle: 'italic', letterSpacing: '1px' }}>UpYield</span>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    width: '45px',
                    height: '35px',
                    background: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5)'
                }} />

                <div style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '4px', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
                    6219 8610 2888 8075
                </div>

                <div className="flex-between">
                    <div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.8, textTransform: 'uppercase' }}>Card Holder</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Bhuvan Bam</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.8, textTransform: 'uppercase' }}>Expires</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>12/28</div>
                    </div>
                    {/* Mastercard overlap circles */}
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)' }} />
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)', marginLeft: '-15px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCardVisual;
