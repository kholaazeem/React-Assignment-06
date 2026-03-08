import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard'; // Dashboard import kiya!

// Ek custom wrapper banaya taake hum route check kar saken
const AppLayout = ({ children }) => {
  const location = useLocation();
  // Check kar rahe hain ke kya user dashboard par hai?
  const isDashboard = location.pathname === '/dashboard';

  return (
    <>
      {/* Agar Dashboard NAHI hai, tabhi main Navbar dikhao */}
      {!isDashboard && <NavigationBar />}
      
      {/* Dashboard par top margin 0 kar diya kyunke uski apni navbar hai */}
      <div style={{ marginTop: isDashboard ? '0px' : '80px', minHeight: '80vh' }}>
        {children}
      </div>

      {/* Agar Dashboard NAHI hai, tabhi Footer dikhao */}
      {!isDashboard && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          {/* Naya Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;