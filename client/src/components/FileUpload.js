import React, { useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import backgroundImage from '../images/backgroundImage.jpg';

const PageContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: white;
  font-family: 'Poppins', sans-serif;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    filter: blur(8px);
    z-index: -1;
  }
`;

const ContentContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  margin: auto;
`;

const Title = styled(motion.h2)`
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
`;

const StepTitle = styled(motion.h3)`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const StepNumber = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #d4246e;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 18px;
`;

const UploadArea = styled(motion.div)`
  border: 2px dashed #d4246e;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(212, 36, 110, 0.1);
  }
`;

const Button = styled(motion.button)`
  background-color: #d4246e;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  margin-top: 10px;
  font-size: 14px;
`;

const FileUpload = ({ onSourceIdCreated }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/add-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data && response.data.sourceId) {
        onSourceIdCreated(response.data.sourceId);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error.response?.data?.message || 'Error uploading file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <ContentContainer>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Create Your Paper Whisper Agent
        </Title>
        
        <StepTitle
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StepNumber>1</StepNumber>
          Upload Your Knowledge
        </StepTitle>

        <UploadArea
          onClick={handleFileSelect}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt"
          />
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4246e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v12"/>
          </svg>
          <p style={{ 
            marginTop: '20px',
            color: '#fff',
            fontSize: '18px'
          }}>
            {file ? `Selected: ${file.name}` : 'Click to add your knowledge'}
          </p>
          <p style={{ 
            marginTop: '10px',
            color: '#ccc',
            fontSize: '14px'
          }}>
            Supported formats: PDF, DOC, DOCX, TXT
          </p>
        </UploadArea>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button
          onClick={handleFileUpload}
          disabled={!file || loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Creating...' : 'Create Agent'}
        </Button>
      </ContentContainer>
    </PageContainer>
  );
};

export default FileUpload;