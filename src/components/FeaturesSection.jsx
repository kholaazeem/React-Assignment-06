import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// Lucide icons import kar rahe hain modern look ke liye
import { LuZap, LuShield, LuActivity, LuCreditCard, LuSmartphone, LuGlobe, LuLock, LuBell, LuArrowRight } from 'react-icons/lu';
import './FeaturesSection.css';

const FeaturesSection = () => {
  // DRY Principle: Sara data ek array mein rakh diya taake code bar bar na likhna paray
  const featuresData = [
    {
      id: 1,
      icon: <LuZap />,
      title: "Instant Transfers",
      desc: "Send money globally in seconds with zero fees on domestic transfers."
    },
    {
      id: 2,
      icon: <LuShield />,
      title: "Secure Vault",
      desc: "Bank-grade encryption and biometric authentication to protect your assets."
    },
    {
      id: 3,
      icon: <LuActivity/>,
      title: "Real-Time Tracking",
      desc: "Monitor every transaction with live analytics and spending insights."
    },
    {
      id: 4,
      icon: <LuCreditCard />,
      title: "Virtual Cards",
      desc: "Generate unlimited virtual cards for secure online purchases."
    },
    {
      id: 5,
      icon: <LuSmartphone />,
      title: "Mobile First",
      desc: "Manage your finances on the go with our native mobile experience."
    },
    {
      id: 6,
      icon: <LuGlobe />,
      title: "Multi-Currency",
      desc: "Hold and exchange 30+ currencies at the best market rates."
    },
    {
      id: 7,
      icon: <LuLock />,
      title: "Fraud Protection",
      desc: "AI-powered fraud detection monitors your account 24/7."
    },
    {
      id: 8,
      icon: <LuBell />,
      title: "Smart Alerts",
      desc: "Custom notifications for every transaction and account activity."
    },
    {
      id: 9,
      icon: <LuArrowRight />,
      title: "Auto Savings",
      desc: "Set rules to automatically save from every paycheck."
    }
  ];

  return (
<section id="features" className="features-section">
      <Container>
        {/* Section Heading */}
        <div className="features-header text-center slide-up">
          <h2 className="features-title">Everything You Need</h2>
          <p className="features-subtitle">Powerful features designed for the way you live and spend.</p>
        </div>

        {/* Features Grid */}
        <Row className="g-4"> {/* g-4 Bootstrap ki class hai jo cards ke darmiyan gap deti hai */}
          {featuresData.map((feature, index) => (
            // lg=4 ka matlab badi screen par 3 cards (12/4=3)
            // md=6 ka matlab tablet par 2 cards (12/6=2)
            // sm=12 ka matlab mobile par 1 card
            <Col lg={4} md={6} sm={12} key={feature.id}>
              <div 
                className="feature-card slide-up" 
                style={{ animationDelay: `${index * 0.1}s` }} // Har card thora ruk kar upar aayega
              >
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h4 className="feature-card-title">{feature.title}</h4>
                <p className="feature-card-desc">{feature.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;