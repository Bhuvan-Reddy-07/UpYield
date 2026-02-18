import React from 'react';
import { Search, ChevronRight } from 'lucide-react';

const HelpCenter: React.FC = () => {
    return (
        <div className="fade-in" style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>How can we help you?</h1>

            <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto 3rem auto' }}>
                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                    type="text"
                    placeholder="Search for articles..."
                    style={{
                        width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '30px',
                        border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <div style={{ display: 'grid', gap: '1rem', textAlign: 'left' }}>
                {[
                    'How do I dispute a transaction?',
                    'Why was my card declined?',
                    'How to improve my Trust Score?',
                    'Contacting support for urgent issues'
                ].map((topic, i) => (
                    <div key={i} className="glass-card flex-between" style={{ padding: '1.25rem', cursor: 'pointer', transition: 'background 0.2s' }}>
                        <span style={{ fontWeight: 500 }}>{topic}</span>
                        <ChevronRight size={18} color="var(--text-secondary)" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelpCenter;
