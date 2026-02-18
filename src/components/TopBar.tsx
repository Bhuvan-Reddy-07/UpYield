import React, { useState } from 'react';
import { Search, Bell, ChevronDown, MessageSquare, Calendar, Settings, User, LogOut, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [searchFocused, setSearchFocused] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // Get current date
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            alert(`Searching for: ${searchValue}`);
            // In a real app, you'd navigate to search results or filter the dashboard
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    // Mock Notifications
    const notifications = [
        { id: 1, title: 'Security Alert', message: 'New sign-in from Moscow, RU', time: '2m ago', type: 'danger' },
        { id: 2, title: 'Payment Success', message: 'Spotify subscription paid', time: '1h ago', type: 'success' },
        { id: 3, title: 'Stock Update', message: 'RELIANCE up by 5%', time: '3h ago', type: 'info' },
    ];

    return (
        <div style={{
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingTop: '0.5rem',
            position: 'relative', // Context for absolute dropdowns
            zIndex: 50 // Ensure dropdowns are on top
        }}>
            {/* Left: Search Bar */}
            <div style={{
                position: 'relative',
                width: '320px',
                transition: 'all 0.3s ease'
            }}>
                <Search size={18} style={{
                    position: 'absolute',
                    left: '1.2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: searchFocused ? 'var(--color-primary)' : 'var(--text-muted)',
                    transition: 'color 0.3s'
                }} />
                <input
                    type="text"
                    placeholder="Search for transactions, items..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleSearch}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    style={{
                        width: '100%',
                        background: 'var(--bg-input)',
                        border: searchFocused ? '1px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        padding: '0.9rem 1rem 0.9rem 3.2rem',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s',
                        boxShadow: searchFocused ? '0 0 15px rgba(6, 182, 212, 0.15)' : 'none'
                    }}
                />
            </div>

            {/* Right: Actions & Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>

                {/* Date Display */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <Calendar size={16} />
                    <span>{dateString}</span>
                </div>

                {/* Icons Group */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div
                        style={{ position: 'relative', cursor: 'pointer', transition: 'transform 0.2s' }}
                        className="hover-scale"
                        onClick={() => navigate('/issues')}
                        title="Messages"
                    >
                        <MessageSquare size={22} color="var(--text-secondary)" />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div
                            style={{ position: 'relative', cursor: 'pointer', transition: 'transform 0.2s' }}
                            className="hover-scale"
                            onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                        >
                            <Bell size={22} color="var(--text-secondary)" />
                            {notifications.length > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-2px',
                                    right: '-1px',
                                    width: '8px',
                                    height: '8px',
                                    background: 'var(--color-danger)',
                                    borderRadius: '50%',
                                    border: '2px solid var(--bg-dark)'
                                }} />
                            )}
                        </div>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="glass-panel fade-in" style={{
                                position: 'absolute',
                                top: '40px',
                                right: '-10px',
                                width: '300px',
                                padding: '0',
                                zIndex: 100,
                                border: 'var(--border-glass-strong)',
                                boxShadow: 'var(--shadow-glass)'
                            }}>
                                <div className="flex-between" style={{ padding: '1rem', borderBottom: 'var(--border-glass)' }}>
                                    <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Notifications</h4>
                                    <X size={16} style={{ cursor: 'pointer' }} onClick={() => setShowNotifications(false)} />
                                </div>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {notifications.map(n => (
                                        <div key={n.id} style={{
                                            padding: '0.8rem 1rem',
                                            borderBottom: 'var(--border-glass)',
                                            background: 'rgba(255,255,255,0.02)',
                                            cursor: 'pointer'
                                        }} className="hover-bg-glass">
                                            <div className="flex-between">
                                                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{n.title}</span>
                                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{n.time}</span>
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{n.message}</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ padding: '0.8rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-primary)', cursor: 'pointer' }}>
                                    View All
                                </div>
                            </div>
                        )}
                    </div>

                    <div
                        style={{ position: 'relative', cursor: 'pointer', transition: 'transform 0.2s' }}
                        className="hover-scale"
                        onClick={() => navigate('/profile')}
                        title="Settings"
                    >
                        <Settings size={22} color="var(--text-secondary)" />
                    </div>
                </div>

                {/* Profile Pill */}
                <div style={{ position: 'relative' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            cursor: 'pointer',
                            padding: '0.4rem 0.8rem 0.4rem 0.4rem',
                            background: showProfileMenu ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                            borderRadius: '99px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            transition: 'background 0.2s'
                        }}
                        className="hover-bg-glass"
                        onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
                    >
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'var(--gradient-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            border: '2px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }}>
                            {currentUser?.email?.[0].toUpperCase() || 'B'}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '0.5rem' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{currentUser?.displayName || 'Bhuvan Bam'}</span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Pro Member</span>
                        </div>
                        <ChevronDown size={14} color="var(--text-muted)" style={{ transform: showProfileMenu ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </div>

                    {/* Profile Dropdown */}
                    {showProfileMenu && (
                        <div className="glass-panel fade-in" style={{
                            position: 'absolute',
                            top: '50px',
                            right: '0',
                            width: '200px',
                            padding: '0.5rem',
                            zIndex: 100,
                            border: 'var(--border-glass-strong)',
                            boxShadow: 'var(--shadow-glass)'
                        }}>
                            <div
                                style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-primary)' }}
                                className="hover-bg-glass"
                                onClick={() => navigate('/profile')}
                            >
                                <User size={16} /> Profile
                            </div>
                            <div
                                style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-primary)' }}
                                className="hover-bg-glass"
                                onClick={() => navigate('/settings')}
                            >
                                <Settings size={16} /> Settings
                            </div>
                            <div style={{ height: '1px', background: 'var(--border-glass)', margin: '0.5rem 0' }} />
                            <div
                                style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem', borderRadius: '8px', cursor: 'pointer', color: 'var(--color-danger)' }}
                                className="hover-bg-glass"
                                onClick={handleLogout}
                            >
                                <LogOut size={16} /> Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopBar;
