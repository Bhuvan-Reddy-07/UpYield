import React from 'react';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

export type TransactionStatus = 'initiated' | 'processing' | 'success' | 'failed' | 'refunded';

interface TransactionTimelineProps {
  status: TransactionStatus;
  timestamp: string;
  errorReason?: 'BANK_OFFLINE' | 'INSUFFICIENT_FUNDS' | 'INVALID_RECIPIENT' | 'FRAUD_FLAG';
}

const ERROR_DETAILS = {
  BANK_OFFLINE: {
    what: "Recipient's bank server is temporarily offline.",
    where: "Your money is safe in your account.",
    next: "We will automatically retry in 2 hours.",
    action: "Wait for auto-retry"
  },
  INSUFFICIENT_FUNDS: {
    what: "Your account balance was too low.",
    where: "Transaction was declined immediately.",
    next: "No money was deducted.",
    action: "Add funds and try again"
  },
  INVALID_RECIPIENT: {
    what: "The UPI ID or Account Number does not exist.",
    where: "Money was not deducted.",
    next: "Please check the details.",
    action: "Verify details"
  },
  FRAUD_FLAG: {
    what: "Our security system flagged this as risky.",
    where: "Transaction blocked for your safety.",
    next: "Contact support to unblock.",
    action: "Chat with Support"
  }
};

const steps = ['initiated', 'processing', 'success'];

const TransactionTimeline: React.FC<TransactionTimelineProps> = ({ status, timestamp, errorReason }) => {
  const getIcon = (step: string) => {
    if (status === 'failed' && step === 'success') return <XCircle className="w-5 h-5" style={{ color: 'var(--color-danger)' }} />;
    if (status === 'refunded' && step === 'success') return <AlertCircle className="w-5 h-5 text-yellow-500" />;

    if (steps.indexOf(status) >= steps.indexOf(step) || status === 'success' || (status === 'refunded' && step !== 'refunded')) {
      return <CheckCircle className="w-5 h-5" style={{ color: 'var(--color-success)' }} />;
    }
    if (step === 'processing' && status === 'initiated') {
      return <Clock className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />;
    }
    return <div className="w-4 h-4 rounded-full" style={{ background: 'var(--text-muted)' }} />;
  };

  const getLabel = (step: string) => {
    if (step === 'success' && status === 'failed') return 'Failed';
    if (step === 'success' && status === 'refunded') return 'Refunded';
    return step.charAt(0).toUpperCase() + step.slice(1);
  };

  const errorInfo = errorReason ? ERROR_DETAILS[errorReason] : null;

  return (
    <div className="glass-card w-full" style={{ padding: '1rem' }}>
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <h4 style={{ margin: 0, fontWeight: 600 }}>Transaction Status</h4>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{new Date(timestamp).toLocaleString()}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        {/* Progress Line */}
        <div style={{
          position: 'absolute', top: '50%', left: 0, right: 0, height: '2px',
          background: 'var(--bg-card-hover)', zIndex: 0
        }} />

        {steps.map((step) => (
          <div key={step} style={{
            position: 'relative', zIndex: 1, background: 'var(--bg-dark)',
            padding: '0 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
          }}>
            {getIcon(step)}
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{getLabel(step)}</span>
          </div>
        ))}
      </div>

      {status === 'failed' && errorInfo && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>What Happened</div>
              <div style={{ color: 'var(--color-danger)', fontWeight: 500 }}>{errorInfo.what}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Where is my money?</div>
              <div style={{ color: 'var(--text-primary)' }}>{errorInfo.where}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>What happens next?</div>
              <div style={{ color: 'var(--text-primary)' }}>{errorInfo.next}</div>
            </div>

            <button style={{
              marginTop: '0.5rem', width: '100%', padding: '0.6rem',
              background: 'var(--bg-card)', border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem'
            }}>
              {errorInfo.action}
            </button>
          </div>
        </div>
      )}

      {status === 'failed' && !errorInfo && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-danger)' }}>
            Transaction failed. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionTimeline;
