import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection'; // Ye line add ki

function App() {
  return (
    <Router>
      <NavigationBar />
      {/* Ab humein margin-top yahan dene ki zaroorat nahi kyunke humne HeroSection.css mein padding de di ha */}
      <div> 
        <Routes>
          {/* Jab koi Home ("/") par aayega to ye Hero section dikhega */}
          <Route path="/" element={<HeroSection />} />
          {/* Baaki pages jaise login/signup hum aage banayenge */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;