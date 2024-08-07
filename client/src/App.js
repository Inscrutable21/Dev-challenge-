import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import FileUpload from './components/FileUpload';
import Chat from './components/Chat';

function App() {
  const [sourceId, setSourceId] = useState(null);

  const handleSourceIdCreated = (newSourceId) => {
    setSourceId(newSourceId);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/project" 
            element={
              !sourceId ? (
                <FileUpload onSourceIdCreated={handleSourceIdCreated} />
              ) : (
                <Chat sourceId={sourceId} />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;