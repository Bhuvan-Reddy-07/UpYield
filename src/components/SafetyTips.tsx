import React, { useState, useEffect } from 'react';
import { Shield, ChevronRight, Lightbulb } from 'lucide-react';

const tips = [
    "Never share your OTP with anyone, even UpYield staff.",
    "Check your Trust Score weekly to detect unauthorized activity early.",
    "Enable location services to reduce false fraud alerts while traveling.",
    "Use our 'Refund Tracker' instead of calling the bank to save time."
];

const SafetyTips: React.FC = () => {
    const [currentTip, setCurrentTip] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % tips.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute', top: '-10px', right: '-10px',
                width: '60px', height: '60px', borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.1)', zIndex: 0
            }} />

            <div className="flex-between" style={{ marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                <div className="flex-center" style={{ gap: '0.5rem' }}>
                    <Shield size={20} color="var(--color-warning)" />
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Safety Tips</h3>
                </div>
                <Lightbulb size={18} color="var(--text-muted)" />
            </div>

            <div style={{ minHeight: '60px', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                <p className="fade-in" key={currentTip} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                    "{tips[currentTip]}"
                </p>
            </div>

            <div className="flex-between" style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {tips.map((_, i) => (
                        <div key={i} style={{
                            width: i === currentTip ? '16px' : '6px', height: '4px',
                            borderRadius: '2px', background: i === currentTip ? 'var(--color-warning)' : 'rgba(255,255,255,0.2)',
                            transition: 'all 0.3s'
                        }} />
                    ))}
                </div>
                <button style={{
                    background: 'none', border: 'none', color: 'var(--color-warning)',
                    fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '2px'
                }}>
                    View All <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
};

export default SafetyTips;
