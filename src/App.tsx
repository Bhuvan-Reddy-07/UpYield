import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import TrustDashboard from './components/TrustDashboard'
import ComplaintCenter from './components/ComplaintCenter'
import TransparencyPage from './components/TransparencyPage'
import AgentDashboard from './components/AgentDashboard'
import HelpCenter from './components/HelpCenter'
import StatusPage from './components/StatusPage'
import Navigation from './components/Navigation'
import Chatbot from './components/Chatbot'
import TransactionHistory from './components/TransactionHistory'
import UPIPayments from './components/features/UPIPayments'
import StockMarket from './components/features/StockMarket'
import MutualFunds from './components/features/MutualFunds'
import ConnectedAccounts from './components/features/ConnectedAccounts'
import RBIVerification from './components/features/RBIVerification'
import SettingsPage from './components/SettingsPage'
import './styles/global.css'

// Main Layout Wrapper with Navigation
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-layout">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  console.log("App Component Rendering - Direct Access");
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Routes>
            {/* Redirect login and signup directly to dashboard */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />

            {/* Application Routes */}
            <Route path="/" element={
              <AppLayout>
                <TrustDashboard />
              </AppLayout>
            } />

            <Route path="/history" element={
              <AppLayout>
                <TransactionHistory />
              </AppLayout>
            } />

            <Route path="/issues" element={
              <AppLayout>
                <ComplaintCenter />
              </AppLayout>
            } />
            <Route path="/transparency" element={
              <AppLayout>
                <TransparencyPage />
              </AppLayout>
            } />
            <Route path="/agent" element={
              <AppLayout>
                <AgentDashboard />
              </AppLayout>
            } />

            <Route path="/help" element={
              <AppLayout>
                <HelpCenter />
              </AppLayout>
            } />
            <Route path="/status" element={
              <AppLayout>
                <StatusPage />
              </AppLayout>
            } />

            {/* Profile & Settings */}
            <Route path="/profile" element={
              <AppLayout>
                <SettingsPage />
              </AppLayout>
            } />
            <Route path="/settings" element={ // Alias for profile
              <AppLayout>
                <SettingsPage />
              </AppLayout>
            } />

            {/* New Feature Routes */}
            <Route path="/payments/upi" element={
              <AppLayout>
                <UPIPayments />
              </AppLayout>
            } />
            <Route path="/invest/stocks" element={
              <AppLayout>
                <StockMarket />
              </AppLayout>
            } />
            <Route path="/invest/funds" element={
              <AppLayout>
                <MutualFunds />
              </AppLayout>
            } />
            <Route path="/finance/accounts" element={
              <AppLayout>
                <ConnectedAccounts />
              </AppLayout>
            } />
            <Route path="/finance/rbi-check" element={
              <AppLayout>
                <RBIVerification />
              </AppLayout>
            } />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {/* Global Chatbot */}
          <Chatbot />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
