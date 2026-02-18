import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            setError('');
            setIsLoading(true);
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            console.error(err);
            setError('Failed to log in: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex-center" style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                <div className="flex-center" style={{ flexDirection: 'column', marginBottom: '2rem', gap: '0.5rem' }}>
                    <div className="flex-center" style={{
                        width: '50px', height: '50px', borderRadius: '50%',
                        background: 'rgba(16, 185, 129, 0.2)', marginBottom: '0.5rem'
                    }}>
                        <ShieldCheck size={28} color="var(--color-success)" />
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Sign in to access your trust dashboard</p>
                </div>

                {error && <div style={{
                    padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)',
                    color: 'var(--color-danger)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem',
                    fontSize: '0.875rem'
                }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email</label>
                        <input
                            type="email"
                            required
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Password</label>
                        <input
                            type="password"
                            required
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            marginTop: '1rem', padding: '0.75rem', borderRadius: 'var(--radius-md)',
                            background: 'var(--color-primary)', color: 'white', border: 'none',
                            fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
