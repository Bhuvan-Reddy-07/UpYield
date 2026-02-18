import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import TrustDashboard from './components/TrustDashboard'
import ComplaintCenter from './components/ComplaintCenter'
import TransparencyPage from './components/TransparencyPage'
import AgentDashboard from './components/AgentDashboard'
import HelpCenter from './components/HelpCenter'
import StatusPage from './components/StatusPage'
import Navigation from './components/Navigation'
import Login from './components/Login'
import Signup from './components/Signup'
import Chatbot from './components/Chatbot'
import TransactionHistory from './components/TransactionHistory'
import UPIPayments from './components/features/UPIPayments'
import StockMarket from './components/features/StockMarket'
import MutualFunds from './components/features/MutualFunds'
import ConnectedAccounts from './components/features/ConnectedAccounts'
import RBIVerification from './components/features/RBIVerification'
import SettingsPage from './components/SettingsPage'
import './styles/global.css'

// Protected Route Wrapper with Navigation
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh', background: 'var(--bg-dark)', color: 'white' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div className="spinner"></div>
          Loading UpYield...
        </div>
      </div>
    );
  }

  return currentUser ? (
    <div className="app-layout">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
    </div>
  ) : <Navigate to="/login" />;
};

function App() {
  console.log("App Component Rendering - No Chatbot");
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <TrustDashboard />
              </ProtectedRoute>
            } />

            <Route path="/history" element={
              <ProtectedRoute>
                <TransactionHistory />
              </ProtectedRoute>
            } />

            <Route path="/issues" element={
              <ProtectedRoute>
                <ComplaintCenter />
              </ProtectedRoute>
            } />
            <Route path="/transparency" element={
              <ProtectedRoute>
                <TransparencyPage />
              </ProtectedRoute>
            } />
            <Route path="/agent" element={
              <ProtectedRoute>
                <AgentDashboard />
              </ProtectedRoute>
            } />

            <Route path="/help" element={
              <ProtectedRoute>
                <HelpCenter />
              </ProtectedRoute>
            } />
            <Route path="/status" element={
              <ProtectedRoute>
                <StatusPage />
              </ProtectedRoute>
            } />

            {/* Profile & Settings */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={ // Alias for profile
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />

            {/* New Feature Routes */}
            <Route path="/payments/upi" element={
              <ProtectedRoute>
                <UPIPayments />
              </ProtectedRoute>
            } />
            <Route path="/invest/stocks" element={
              <ProtectedRoute>
                <StockMarket />
              </ProtectedRoute>
            } />
            <Route path="/invest/funds" element={
              <ProtectedRoute>
                <MutualFunds />
              </ProtectedRoute>
            } />
            <Route path="/finance/accounts" element={
              <ProtectedRoute>
                <ConnectedAccounts />
              </ProtectedRoute>
            } />
            <Route path="/finance/rbi-check" element={
              <ProtectedRoute>
                <RBIVerification />
              </ProtectedRoute>
            } />
          </Routes>
          {/* Global Chatbot */}
          <Chatbot />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
