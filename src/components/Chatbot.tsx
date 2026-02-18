import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    type?: 'text' | 'priority'; // New message type
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hi! I'm your UpYield virtual assistant. How can I help you regarding your trust score or transactions today?", sender: 'bot', type: 'text' }
    ]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newUserMsg: Message = { id: Date.now(), text: inputText, sender: 'user', type: 'text' };
        setMessages(prev => [...prev, newUserMsg]);
        setInputText("");

        // Mock response logic
        setTimeout(() => {
            const lowerInput = inputText.toLowerCase();
            let newBotMsg: Message = { id: Date.now() + 1, text: "", sender: 'bot', type: 'text' };

            // Priority Keywords Detection
            if (lowerInput.match(/(lost|money|fraud|scam|stuck|failed|deducted|risk)/i)) {
                newBotMsg = {
                    id: Date.now() + 1,
                    text: "I've detected a critical issue involving your money.",
                    sender: 'bot',
                    type: 'priority'
                };
            } else if (lowerInput.includes('refund')) {
                newBotMsg.text = "Refunds are automatically tracked. Check the 'Issues' tab to see the status of any failed transaction refunds.";
            } else if (lowerInput.includes('trust') || lowerInput.includes('score')) {
                newBotMsg.text = "Your Trust Score is calculated based on safe spending habits and verified locations. Raising it allows for higher instant transaction limits.";
            } else {
                newBotMsg.text = "I'm not sure about that. Try asking about 'refunds', 'fraud', or 'trust score'.";
            }

            setMessages(prev => [...prev, newBotMsg]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    position: 'fixed', bottom: '2rem', right: '2rem',
                    width: '60px', height: '60px', borderRadius: '50%',
                    background: 'var(--color-primary)', border: 'none',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)',
                    display: isOpen ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', zIndex: 9999, transition: 'transform 0.2s'
                }}
                className="hover-scale"
            >
                <MessageSquare color="white" size={28} />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="glass-card slide-up" style={{
                    position: 'fixed', bottom: '2rem', right: '2rem',
                    width: '350px', height: '500px', display: 'flex', flexDirection: 'column',
                    padding: 0, overflow: 'hidden', zIndex: 9999,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {/* Header */}
                    <div className="flex-between" style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="flex-center" style={{ gap: '0.5rem' }}>
                            <Bot size={20} color="var(--color-primary)" />
                            <span style={{ fontWeight: 600 }}>UpYield Support</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {messages.map(msg => (
                            <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                                <div style={{
                                    padding: '0.75rem', borderRadius: '12px',
                                    background: msg.sender === 'user' ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                                    color: 'white', fontSize: '0.9rem',
                                    borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
                                    borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '12px'
                                }}>
                                    {msg.text}
                                </div>

                                {msg.type === 'priority' && (
                                    <div className="glass-card fade-in" style={{ marginTop: '0.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--color-danger)' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--color-danger)', fontWeight: 600 }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-danger)' }} />
                                            Priority Support
                                        </div>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0' }}>
                                            We've flagged this as critical. Do you want to speak to a human immediately?
                                        </p>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => alert("Connecting to Agent Sarah... (Wait time: < 1 min)")}
                                                className="btn-primary"
                                                style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', borderRadius: '6px' }}
                                            >
                                                Chat Now
                                            </button>
                                            <button
                                                onClick={() => alert("Requesting Callback to +91 98*** *****")}
                                                style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', borderRadius: '6px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer' }}
                                            >
                                                Callback
                                            </button>
                                        </div>
                                        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                                            Response time: ~2 mins
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your question..."
                            style={{
                                flex: 1, padding: '0.75rem', borderRadius: '20px',
                                border: 'none', background: 'rgba(255,255,255,0.1)',
                                color: 'white', outline: 'none'
                            }}
                        />
                        <button
                            onClick={handleSend}
                            style={{
                                background: 'var(--color-primary)', border: 'none',
                                width: '40px', height: '40px', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <Send size={18} color="white" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
