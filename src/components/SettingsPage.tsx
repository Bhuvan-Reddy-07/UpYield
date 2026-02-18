import React, { useState } from 'react';
import { User, Shield, Bell, Lock, Smartphone, Mail, Globe, ChevronRight, Download, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import TopBar from './TopBar';

type SettingsTab = 'profile' | 'security' | 'notifications' | 'privacy';

const SettingsPage: React.FC = () => {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
    const [loading, setLoading] = useState(false);

    // Mock States for toggles
    const [twoFactor, setTwoFactor] = useState(false);
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Settings saved successfully!');
        }, 1200);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="fade-in">
                        <h2 style={{ marginBottom: '1.5rem' }}>Public Profile</h2>
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                                <div style={{
                                    width: '100px', height: '100px', borderRadius: '50%',
                                    background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '2.5rem', fontWeight: 700, border: '4px solid rgba(255,255,255,0.1)'
                                }}>
                                    {currentUser?.email?.[0].toUpperCase() || 'B'}
                                </div>
                                <div>
                                    <button className="btn btn-primary" style={{ marginRight: '1rem' }}>Change Avatar</button>
                                    <button className="btn btn-outline" style={{ border: '1px solid var(--border-glass-strong)', background: 'transparent' }}>Remove</button>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
                                    <input type="text" defaultValue="Bhuvan Bam" className="input-field" style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-input)', border: 'var(--border-glass)', borderRadius: '8px', color: 'white' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Username</label>
                                    <input type="text" defaultValue="@bhuvan_dev" className="input-field" style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-input)', border: 'var(--border-glass)', borderRadius: '8px', color: 'white' }} />
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Bio</label>
                                    <textarea rows={4} defaultValue="Full Stack Developer | Crypto Enthusiast" className="input-field" style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-input)', border: 'var(--border-glass)', borderRadius: '8px', color: 'white' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="fade-in">
                        <h2 style={{ marginBottom: '1.5rem' }}>Security & Login</h2>

                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Two-Factor Authentication</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Add an extra layer of security to your account.</p>
                                </div>
                                <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '28px' }}>
                                    <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} style={{ opacity: 0, width: 0, height: 0 }} />
                                    <span style={{
                                        position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                        backgroundColor: twoFactor ? 'var(--color-success)' : 'rgba(255,255,255,0.1)',
                                        transition: '0.4s', borderRadius: '34px'
                                    }}>
                                        <span style={{
                                            position: 'absolute', content: '""', height: '20px', width: '20px', left: '4px', bottom: '4px',
                                            backgroundColor: 'white', transition: '0.4s', borderRadius: '50%',
                                            transform: twoFactor ? 'translateX(22px)' : 'none'
                                        }} />
                                    </span>
                                </label>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <Smartphone color="var(--color-primary)" />
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Authenticator App</h4>
                                        <p style={{ margin: '0.2rem 0', fontSize: '0.85rem', opacity: 0.8 }}>Use Google Authenticator or Authy</p>
                                    </div>
                                    <button className="btn btn-sm" style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid var(--color-primary)', color: 'var(--color-primary)' }}>Setup</button>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Active Sessions</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="flex-between" style={{ paddingBottom: '1rem', borderBottom: 'var(--border-glass)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <Globe color="var(--text-muted)" />
                                        <div>
                                            <div style={{ fontWeight: 600 }}>Windows PC - Chrome</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--color-success)' }}>Active Now • Mumbai, India</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-between">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <Smartphone color="var(--text-muted)" />
                                        <div>
                                            <div style={{ fontWeight: 600 }}>iPhone 13 - App</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>2 hours ago • Delhi, India</div>
                                        </div>
                                    </div>
                                    <button style={{ color: 'var(--color-danger)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Revoke</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="fade-in">
                        <h2 style={{ marginBottom: '1.5rem' }}>Notification Preferences</h2>
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <div className="flex-between" style={{ padding: '1rem 0', borderBottom: 'var(--border-glass)' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <Mail color="var(--color-accent)" />
                                    <div>
                                        <h4 style={{ margin: 0 }}>Email Notifications</h4>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.2rem 0 0 0' }}>Get daily summaries and alerts</p>
                                    </div>
                                </div>
                                <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} style={{ width: '20px', height: '20px' }} />
                            </div>
                            <div className="flex-between" style={{ padding: '1rem 0' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <Bell color="var(--color-warning)" />
                                    <div>
                                        <h4 style={{ margin: 0 }}>Push Notifications</h4>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.2rem 0 0 0' }}>Real-time alerts on your device</p>
                                    </div>
                                </div>
                                <input type="checkbox" checked={pushNotifs} onChange={() => setPushNotifs(!pushNotifs)} style={{ width: '20px', height: '20px' }} />
                            </div>
                        </div>
                    </div>
                );
            case 'privacy':
                return (
                    <div className="fade-in">
                        <h2 style={{ marginBottom: '1.5rem' }}>Privacy & Data</h2>
                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Download Your Data</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Get a copy of your data including transaction history and account details.</p>
                            <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', border: '1px solid var(--border-glass-strong)' }}>
                                <Download size={18} /> Request Archive
                            </button>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(244, 63, 94, 0.3)', background: 'rgba(244, 63, 94, 0.05)' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-danger)' }}>Danger Zone</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Permanently delete your account and all associated data.</p>
                            <button className="btn btn-danger" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <Trash2 size={18} /> Delete Account
                            </button>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div style={{ padding: '0 2rem 2rem 2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
            <TopBar />

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem' }}>
                {/* Sidebar */}
                <div>
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '1rem' }}>Settings</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {[
                            { id: 'profile', icon: User, label: 'Public Profile' },
                            { id: 'security', icon: Shield, label: 'Security' },
                            { id: 'notifications', icon: Bell, label: 'Notifications' },
                            { id: 'privacy', icon: Lock, label: 'Privacy & Data' },
                        ].map(item => (
                            <div
                                key={item.id}
                                onClick={() => setActiveTab(item.id as SettingsTab)}
                                className="hover-bg-glass"
                                style={{
                                    padding: '0.8rem 1rem',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    background: activeTab === item.id ? 'var(--color-primary)' : 'transparent',
                                    color: activeTab === item.id ? 'white' : 'var(--text-secondary)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <item.icon size={18} />
                                    <span style={{ fontWeight: 500 }}>{item.label}</span>
                                </div>
                                {activeTab === item.id && <ChevronRight size={16} />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div>
                    {renderTabContent()}

                    {/* Action Bar */}
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', paddingTop: '2rem', borderTop: 'var(--border-glass)' }}>
                        <button className="btn btn-primary" onClick={handleSave} disabled={loading} style={{ minWidth: '120px' }}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
