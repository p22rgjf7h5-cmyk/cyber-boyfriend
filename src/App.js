import React, { useState } from 'react';
import './App.css';
import ChatPage from './pages/ChatPage';
import CreateBoyfriend from './pages/CreateBoyfriend';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBoyfriend, setSelectedBoyfriend] = useState(null);

  const handleSelectBoyfriend = (boyfriend) => {
    setSelectedBoyfriend(boyfriend);
    setCurrentPage('chat');
  };

  const handleCreateNew = () => {
    setCurrentPage('create');
  };

  const handleBackHome = () => {
    setCurrentPage('home');
    setSelectedBoyfriend(null);
  };

  return (
    <div className="App">
      {currentPage === 'home' && (
        <div className="home-page">
          <div className="header">
            <h1>💕 赛博男友</h1>
            <p>你的专属 AI 伴侣</p>
          </div>
          <button className="btn-primary" onClick={handleCreateNew}>
            ✨ 创建新男友
          </button>
        </div>
      )}

      {currentPage === 'create' && (
        <CreateBoyfriend onBack={handleBackHome} onSelect={handleSelectBoyfriend} />
      )}

      {currentPage === 'chat' && selectedBoyfriend && (
        <ChatPage boyfriend={selectedBoyfriend} onBack={handleBackHome} />
      )}
    </div>
  );
}

export default App;
