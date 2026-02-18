import React, { useState } from 'react';
import { Search, PieChart, Calculator, Filter } from 'lucide-react';
import FundCard from './FundCard';

const MOCK_FUNDS = [
    { id: '1', name: 'UpYield Bluechip Growth', category: 'Equity', risk: 'High', rating: 5, nav: 145.20, returns: '18.5%' },
    { id: '2', name: 'Stable Income Debt Fund', category: 'Debt', risk: 'Low', rating: 4, nav: 42.50, returns: '7.2%' },
    { id: '3', name: 'Flexi Cap Opportunity', category: 'Hybrid', risk: 'Moderate', rating: 5, nav: 88.90, returns: '14.8%' },
    { id: '4', name: 'Tax Saver ELSS', category: 'Equity', risk: 'High', rating: 4, nav: 210.15, returns: '22.1%' },
    { id: '5', name: 'Liquid Gold ETF', category: 'Commodity', risk: 'Moderate', rating: 3, nav: 55.40, returns: '9.5%' },
];

const MutualFunds: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [sipAmount, setSipAmount] = useState(5000);
    const [sipYears, setSipYears] = useState(5);
    const [showInvestModal, setShowInvestModal] = useState(false);
    const [selectedFund, setSelectedFund] = useState<string | null>(null);

    const filteredFunds = MOCK_FUNDS.filter(fund =>
        (categoryFilter === 'All' || fund.category === categoryFilter) &&
        fund.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const calculateSIP = () => {
        // Simple FV formula: P * ({[1 + i]^n - 1} / i) * (1 + i)
        // Assuming 12% annual return
        const monthlyRate = 12 / 12 / 100;
        const months = sipYears * 12;
        const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        return Math.round(futureValue);
    };

    const handleInvest = (fundId: string) => {
        setSelectedFund(fundId);
        setShowInvestModal(true);
    };

    return (
        <div className="fade-in" style={{ paddingBottom: '2rem' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>Mutual Funds Explorer</h1>
                    <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>Smart Investing for Long-Term Wealth</p>
                </div>
                <div className="glass-card" style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Investment</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>₹0.00</div>
                    </div>
                    <PieChart size={24} color="var(--color-primary)" />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' }}>
                {/* Main Fund List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Search & Filter */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search funds..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-field"
                                style={{ width: '100%', paddingLeft: '2.2rem' }}
                            />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Filter size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="input-field"
                                style={{ paddingLeft: '2.2rem', appearance: 'none', paddingRight: '2rem' }}
                            >
                                <option value="All">All Categories</option>
                                <option value="Equity">Equity</option>
                                <option value="Debt">Debt</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {filteredFunds.map(fund => (
                            <FundCard key={fund.id} fund={fund} onInvest={handleInvest} />
                        ))}
                    </div>
                </div>

                {/* Sidebar: SIP Calculator */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div className="flex-center" style={{ gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
                            <Calculator size={20} />
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>SIP Calculator</h3>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Monthly Investment</label>
                            <div style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem' }}>₹{sipAmount.toLocaleString()}</div>
                            <input
                                type="range" min="500" max="100000" step="500"
                                value={sipAmount}
                                onChange={(e) => setSipAmount(Number(e.target.value))}
                                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Duration (Years)</label>
                            <div style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem' }}>{sipYears} Years</div>
                            <input
                                type="range" min="1" max="30" step="1"
                                value={sipYears}
                                onChange={(e) => setSipYears(Number(e.target.value))}
                                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                            />
                        </div>

                        <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Expected Value (12%)</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)' }}>
                                ₹{calculateSIP().toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                Invested: ₹{(sipAmount * sipYears * 12).toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-success)' }}>Why Invest?</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                            Beat inflation and build wealth with our expert-curated funds. Start with as low as ₹500.
                        </p>
                    </div>
                </div>
            </div>

            {/* Investment Modal Mock */}
            {showInvestModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div className="glass-card" style={{ padding: '2rem', width: '90%', maxWidth: '400px', background: 'var(--bg-card-hover)', textAlign: 'center' }}>
                        <h2 style={{ marginTop: 0 }}>Confirm Investment</h2>
                        <p>Proceed to invest in <b>{MOCK_FUNDS.find(f => f.id === selectedFund)?.name}</b>?</p>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button
                                onClick={() => setShowInvestModal(false)}
                                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => { alert('Investment Successful!'); setShowInvestModal(false); }}
                                className="btn-primary"
                                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px' }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MutualFunds;
