import React from 'react';
import { Typography } from '@material-ui/core';

function Message({ message }) {
  const isUser = message.role === 'user';

  return (
    <div 
      className={`message ${isUser ? 'user-message' : 'bot-message'}`}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '10px',
      }}
    >
      <div style={{
        maxWidth: '70%',
        padding: '10px 15px',
        borderRadius: '20px',
        backgroundColor: isUser ? '#000000' : '#e0e0e0',
        color: isUser ? '#ffffff' : '#000000',
      }}>
        <Typography variant="body1">{message.content}</Typography>
      </div>
    </div>
  );
}

export default Message;