import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LuShield, LuHeart, LuLightbulb, LuUsers } from 'react-icons/lu';
import './About.css';

const About = () => {
  // DRY Rule for Value Cards
  const valuesData = [
    {
      id: 1,
      icon: <LuShield />,
      title: "Trust",
      desc: "We protect your money with the highest security standards in the industry."
    },
    {
      id: 2,
      icon: <LuHeart />,
      title: "Customer First",
      desc: "Every decision we make starts with how it benefits our users."
    },
    {
      id: 3,
      icon: <LuLightbulb />,
      title: "Innovation",
      desc: "We constantly push boundaries to redefine what banking can be."
    },
    {
      id: 4,
      icon: <LuUsers />,
      title: "Inclusion",
      desc: "Banking for everyone — no minimums, no hidden fees, no barriers."
    }
  ];

  return (
    <div className="about-page">
      <Container>
        {/* Header Section */}
        <div className="about-header text-center slide-up">
          <h1 className="about-title">About NeoBank</h1>
          <p className="about-subtitle">
            We're building the future of finance — a world where managing money is effortless, transparent, and accessible to all.
          </p>
        </div>

        {/* Mission Card */}
        <Row className="justify-content-center slide-up" style={{ animationDelay: '0.1s' }}>
          <Col lg={10}>
            <div className="mission-card">
              <h2 className="mission-title">Our Mission</h2>
              <p className="mission-desc">
                NeoBank was founded with a simple belief: banking should work for people, not against them. We leverage cutting-edge technology to provide instant, secure, and borderless financial services. Our goal is to eliminate the friction, fees, and frustration of traditional banking, and replace it with an experience that's delightful, transparent, and empowering.
              </p>
            </div>
          </Col>
        </Row>

        {/* Values Grid (4 Cards) */}
        <Row className="g-4 mt-4">
          {valuesData.map((value, index) => (
            <Col lg={3} md={6} sm={12} key={value.id}>
              <div className="value-card slide-up" style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}>
                <div className="value-icon-wrapper">
                  {value.icon}
                </div>
                <h4 className="value-title">{value.title}</h4>
                <p className="value-desc">{value.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default About;