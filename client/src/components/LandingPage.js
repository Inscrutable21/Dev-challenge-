import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: white;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
`;

const BackgroundIframe = styled.iframe`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%; // Increased from 100% to zoom in
  height: 120%; // Increased from 100% to zoom in
  transform: translate(-50%, -50%); // Center the iframe
  border: none;
  z-index: -1;
`;

const ContentOverlay = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AnimatedText = styled(motion.span)`
  display: inline-block;
`;

const LandingPage = () => {
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <PageContainer>
      <BackgroundIframe
        title="A moment of calm"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        src="https://sketchfab.com/models/99e22570cc58439f9186fa96ea339cbb/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0"
      />
      <ContentOverlay>
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            alignItems: 'center',
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              fontFamily: '"Playfair Display", serif',
            }}
          >
           Paper Whisper
          </motion.div>
          <nav>
            {[ 'Services'
              
            ].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, color: '#00ffcc' }}
                style={{ margin: '0 15px', textDecoration: 'none', color: 'white' }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
        </motion.header>

        <motion.main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 20px',
          }}
        >
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: 'clamp(2rem, 8vw, 5rem)',
              marginBottom: '30px',
              fontWeight: 'bold',
              letterSpacing: '3px',
              fontFamily: '"Playfair Display", serif',
            }}
          >
            {"Paper Whisper".split('').map((char, index) => (
              <AnimatedText key={index} variants={letterVariants}>
                {char}
              </AnimatedText>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              maxWidth: '600px',
              marginBottom: '30px',
              fontFamily: '"Poppins", sans-serif',
            }}
          >
          Unlocking the Power of Your Documents: From Static PDFs to Dynamic Conversations
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/project" style={{
              backgroundColor: '#d4246e',
              color: 'white',
              padding: '15px 40px',
              borderRadius: '30px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 4px 15px rgba(212,36,110,0.3)',
              transition: 'all 0.3s ease',
              fontFamily: '"Poppins", sans-serif',
            }}>
             Get Started
            </Link>
          </motion.div>
        </motion.main>
      </ContentOverlay>
    </PageContainer>
  );
};

export default LandingPage;