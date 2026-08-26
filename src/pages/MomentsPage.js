import React, { useState } from 'react';
import './MomentsPage.css';

const MomentsPage = ({ boyfriend, onBack }) => {
  const [moments, setMoments] = useState([
    {
      id: 1,
      sender: 'boyfriend',
      content: '在咖啡馆，享受美好时光 ☕',
      image: 'https://via.placeholder.com/400x400?text=Coffee',
      likes: 12,
      comments: 3,
      timestamp: new Date(Date.now() - 3600000),
      liked: false
    },
    {
      id: 2,
      sender: 'boyfriend',
      content: '工作再忙，也要记得休息～',
      image: 'https://via.placeholder.com/400x400?text=Work',
      likes: 8,
      comments: 2,
      timestamp: new Date(Date.now() - 7200000),
      liked: false
    }
  ]);
  const [newMoment, setNewMoment] = useState('');

  const handleAddMoment = () => {
    if (newMoment.trim()) {
      setMoments([{
        id: Date.now(),
        sender: 'user',
        content: newMoment,
        image: 'https://via.placeholder.com/400x400?text=Moment',
        likes: 0,
        comments: 0,
        timestamp: new Date(),
        liked: false
      }, ...moments]);
      setNewMoment('');
    }
  };

  const handleLike = (id) => {
    setMoments(moments.map(m => 
      m.id === id ? {
        ...m,
        liked: !m.liked,
        likes: m.liked ? m.likes - 1 : m.likes + 1
      } : m
    ));
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString();
  };

  return (
    <div className="moments-page">
      <div className="moments-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2>朋友圈</h2>
        <div style={{ width: 40 }}></div>
      </div>

      {/* 发布朋友圈 */}
      <div className="moment-composer">
        <textarea
          value={newMoment}
          onChange={(e) => setNewMoment(e.target.value)}
          placeholder="分享你的想法..."
          className="composer-input"
        />
        <div className="composer-actions">
          <button className="tool-btn">📷</button>
          <button className="tool-btn">🎬</button>
          <button className="composer-btn" onClick={handleAddMoment}>发表</button>
        </div>
      </div>

      {/* 朋友圈列表 */}
      <div className="moments-list">
        {moments.map(moment => (
          <div key={moment.id} className={`moment-card ${moment.sender}`}>
            <div className="moment-header">
              <img src="https://via.placeholder.com/40" alt="avatar" className="moment-avatar" />
              <div className="moment-user-info">
                <p className="moment-user-name">
                  {moment.sender === 'boyfriend' ? boyfriend.name : '你'}
                </p>
                <p className="moment-time">{formatTime(moment.timestamp)}</p>
              </div>
            </div>
            <p className="moment-content">{moment.content}</p>
            {moment.image && (
              <img src={moment.image} alt="moment" className="moment-image" />
            )}
            <div className="moment-footer">
              <button 
                className={`like-btn ${moment.liked ? 'liked' : ''}`}
                onClick={() => handleLike(moment.id)}
              >
                {moment.liked ? '❤️' : '🤍'} {moment.likes > 0 ? moment.likes : ''}
              </button>
              <button className="comment-btn">💬 {moment.comments > 0 ? moment.comments : ''}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MomentsPage;
