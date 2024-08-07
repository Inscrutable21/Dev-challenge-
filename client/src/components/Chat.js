import React, { useState, useEffect, useRef } from 'react';
import { TextField, IconButton, LinearProgress } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import Message from './Message';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import backgroundImage from '../images/backgroundImage.jpg';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    filter: blur(10px);
    z-index: -1;
  }
`;

const Header = styled.div`
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #ffffff;
`;

const HeaderTitle = styled.h6`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin-left: 10px;
  font-weight: bold;
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d4246e;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const InputForm = styled.form`
  display: flex;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    fieldset {
      border-color: rgba(255, 255, 255, 0.5);
    }
    &:hover fieldset {
      border-color: #d4246e;
    }
    &.Mui-focused fieldset {
      border-color: #d4246e;
    }
  }
  .MuiInputBase-input {
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
  }
`;

const SendButton = styled(IconButton)`
  &.MuiIconButton-root {
    background-color: ${props => props.disabled ? 'rgba(255, 255, 255, 0.3)' : '#d4246e'};
    color: white;
    margin-left: 10px;
    &:hover {
      background-color: ${props => props.disabled ? 'rgba(255, 255, 255, 0.3)' : '#b31e5c'};
    }
  }
`;

const StyledLinearProgress = styled(LinearProgress)`
  &.MuiLinearProgress-root {
    height: 4px;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .MuiLinearProgress-bar {
    background-color: #d4246e;
  }
`;

function Chat({ sourceId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('/api/chat', {
        sourceId,
        messages: [...messages, userMessage],
      });

      if (response.data && response.data.content) {
        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'assistant', content: response.data.content },
        ]);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: 'Sorry, an error occurred while processing your request.' },
      ]);
    }

    setInput('');
    setLoading(false);
  };

  return (
    <ChatContainer>
      <Header>
        <BackButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <ArrowBackIcon />
          <HeaderTitle>Paper Whisper</HeaderTitle>
        </BackButton>
        <Logo>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="white"/>
          </svg>
        </Logo>
      </Header>

      {loading && <StyledLinearProgress />}

      <MessageContainer>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </MessageContainer>

      <InputForm onSubmit={handleSubmit}>
        <StyledTextField
          fullWidth
          variant="outlined"
          placeholder="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <SendButton 
          type="submit" 
          disabled={!input.trim() || loading}
        >
          <SendIcon />
        </SendButton>
      </InputForm>
    </ChatContainer>
  );
}

export default Chat;