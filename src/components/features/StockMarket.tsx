import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Briefcase, Plus, Minus, AlertCircle } from 'lucide-react';
import StockChart from './StockChart';

// Mock list for search (since we don't have a search API yet)
const AVAILABLE_STOCKS = [
    { symbol: 'RELIANCE', name: 'Reliance Industries' },
    { symbol: 'TCS', name: 'Tata Consultancy Svcs' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank' },
    { symbol: 'INFY', name: 'Infosys Ltd' },
    { symbol: 'TATAMOTORS', name: 'Tata Motors' },
    { symbol: 'SBIN', name: 'State Bank of India' }
];

const StockMarket: React.FC = () => {
    const [selectedStock, setSelectedStock] = useState('RELIANCE');
    const [searchTerm, setSearchTerm] = useState('');
    const [portfolio, setPortfolio] = useState<{ [key: string]: number }>({ 'RELIANCE': 10 });
    const [quantity, setQuantity] = useState(1);
    const [action, setAction] = useState<'buy' | 'sell'>('buy');

    // API Data State
    const [stockData, setStockData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStockData = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetch(`http://localhost:8000/api/stocks/${selectedStock}`);
                if (!response.ok) throw new Error('Failed to fetch stock data');
                const data = await response.json();
                setStockData(data);
            } catch (err) {
                console.error(err);
                setError('Could not load market data. Using last known values.');
                // Fallback mock for demo if API fails (e.g., if backend not running)
                setStockData({
                    symbol: selectedStock,
                    name: AVAILABLE_STOCKS.find(s => s.symbol === selectedStock)?.name || selectedStock,
                    price: 2450.00,
                    change: 1.2,
                    is_positive: true,
                    data: []
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStockData();
        // Poll every 30 seconds
        const interval = setInterval(fetchStockData, 30000);
        return () => clearInterval(interval);
    }, [selectedStock]);

    // Derived state
    const isPositive = stockData?.is_positive ?? true;
    // Use CSS variable values for consistency if possible, or keep hex to match variables.css
    const stockColor = isPositive ? '#10B981' : '#EF4444';

    const handleTrade = () => {
        if (action === 'buy') {
            setPortfolio(prev => ({ ...prev, [selectedStock]: (prev[selectedStock] || 0) + quantity }));
        } else {
            if ((portfolio[selectedStock] || 0) >= quantity) {
                setPortfolio(prev => ({ ...prev, [selectedStock]: prev[selectedStock] - quantity }));
            }
        }
        setQuantity(1);
    };

    const filteredStocks = AVAILABLE_STOCKS.filter(s =>
        s.symbol.includes(searchTerm.toUpperCase()) || s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fade-in" style={{ paddingBottom: '2rem' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 className="text-gradient" style={{ fontSize: '1.8rem', fontWeight: 800 }}>Stock Market</h1>
                    <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>Real-time Market Data</p>
                </div>
                <div className="glass-card flex-center" style={{ padding: '0.75rem 1.5rem', gap: '1rem' }}>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Portfolio Value</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                            ₹{stockData ? (Object.entries(portfolio).reduce((acc, [sym, qty]) => {
                                return acc + (sym === selectedStock ? stockData.price : 2000) * qty;
                            }, 0)).toLocaleString() : '...'}
                        </div>
                    </div>
                    <div style={{ padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
                        <Briefcase size={20} color="var(--color-primary)" />
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem' }}>
                {/* Watchlist */}
                <div className="glass-panel" style={{ padding: '1rem', height: 'fit-content', maxHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', marginBottom: '1rem' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search stocks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field"
                            style={{ width: '100%', paddingLeft: '2.2rem' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
                        {filteredStocks.map(s => (
                            <div
                                key={s.symbol}
                                onClick={() => setSelectedStock(s.symbol)}
                                className={`list-item-selectable ${selectedStock === s.symbol ? 'active' : ''}`}
                            >
                                <div className="flex-between">
                                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{s.symbol}</span>
                                    {selectedStock === s.symbol && stockData && <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>₹{stockData.price.toLocaleString()}</span>}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {s.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chart & Trade */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Chart Card */}
                    <div className="glass-panel" style={{ minHeight: '400px' }}>
                        {loading ? (
                            <div className="flex-center" style={{ height: '300px', flexDirection: 'column', gap: '1rem' }}>
                                <div className="spinner"></div>
                                <p className="text-muted">Fetching market data...</p>
                            </div>
                        ) : stockData ? (
                            <>
                                <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{stockData.name}</div>
                                        <span className={`badge ${isPositive ? 'badge-success' : 'badge-danger'}`}>
                                            {selectedStock}
                                        </span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: stockColor }}>₹{stockData.price.toLocaleString()}</div>
                                        <div style={{ fontSize: '0.9rem', color: stockColor, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem', fontWeight: 500 }}>
                                            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                            {isPositive ? '+' : ''}{stockData.change}% (1D)
                                        </div>
                                    </div>
                                </div>
                                <div style={{ height: '300px', width: '100%' }}>
                                    <StockChart data={stockData.data} color={stockColor} />
                                </div>
                            </>
                        ) : (
                            <div className="flex-center" style={{ height: '300px', color: 'var(--color-danger)' }}>
                                <AlertCircle style={{ marginRight: '0.5rem' }} /> {error || 'Unable to load data'}
                            </div>
                        )}
                    </div>

                    {/* Trade Card */}
                    <div className="glass-panel">
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            <button
                                onClick={() => setAction('buy')}
                                className={`btn ${action === 'buy' ? 'btn-success' : 'btn-secondary'}`}
                                style={{ flex: 1 }}
                            >
                                BUY
                            </button>
                            <button
                                onClick={() => setAction('sell')}
                                className={`btn ${action === 'sell' ? 'btn-danger' : 'btn-secondary'}`}
                                style={{ flex: 1 }}
                            >
                                SELL
                            </button>
                        </div>

                        <div className="flex-between" style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Quantity</label>
                                <div className="flex-center" style={{ gap: '1rem' }}>
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className='btn btn-secondary' style={{ padding: '0.25rem 0.5rem', height: '32px', width: '32px' }}><Minus size={16} /></button>
                                    <span style={{ fontWeight: 600, minWidth: '30px', textAlign: 'center', fontSize: '1.1rem' }}>{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className='btn btn-secondary' style={{ padding: '0.25rem 0.5rem', height: '32px', width: '32px' }}><Plus size={16} /></button>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Estimated Total</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                                    ₹{stockData ? (stockData.price * quantity).toLocaleString() : '0'}
                                </div>
                            </div>
                        </div>

                        {action === 'sell' && (portfolio[selectedStock] || 0) < quantity && (
                            <div className="badge-danger" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <AlertCircle size={16} /> Insufficient holdings ({portfolio[selectedStock] || 0} avail)
                            </div>
                        )}

                        <button
                            onClick={handleTrade}
                            disabled={!stockData || (action === 'sell' && (portfolio[selectedStock] || 0) < quantity)}
                            className={`btn ${action === 'buy' ? 'btn-success' : 'btn-danger'}`}
                            style={{
                                width: '100%', padding: '1rem',
                                opacity: (!stockData || (action === 'sell' && (portfolio[selectedStock] || 0) < quantity)) ? 0.5 : 1
                            }}
                        >
                            CONFIRM {action.toUpperCase()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockMarket;

