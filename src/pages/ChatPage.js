import React, { useState, useEffect, useRef } from 'react';
import './ChatPage.css';
import MomentsPage from './MomentsPage';
import TransferPage from './TransferPage';

const ChatPage = ({ boyfriend, onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'boyfriend',
      text: `嗨~ 我是${boyfriend.name}，很高兴认识你！`,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentTab, setCurrentTab] = useState('chat');
  const [isBoyfriendTyping, setIsBoyfriendTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [pendingTransfers, setPendingTransfers] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 男友主动发消息
  useEffect(() => {
    const randomMessages = [
      `你今天怎么样呀？😊`,
      `想我���吗？`,
      `最近在忙什么呢？`,
      `给你转了点钱，记得查收哦～`,
      `我又更新朋友圈了，快去看看！`,
      `你晚餐吃了吗？要照顾好自己呢`,
      `最近天气变化大，别感冒了`,
      `周末一起约个时间聊天吧！`
    ];

    const timer = setTimeout(() => {
      if (Math.random() > 0.6) {
        const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        setIsBoyfriendTyping(true);
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'boyfriend',
            text: randomMsg,
            timestamp: new Date(),
            type: 'text'
          }]);
          setIsBoyfriendTyping(false);
        }, 1500);
      }
    }, Math.random() * 30000 + 10000); // 每10-40秒随机发一条

    return () => clearTimeout(timer);
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 用户消息
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // 模拟AI回复
    setIsBoyfriendTyping(true);
    setTimeout(() => {
      const responses = [
        '是啊，我也这么想的～',
        '你说得对呢，我很同意',
        '嗯嗯，我听你的',
        '哈哈哈，你真可爱',
        '怎么了吗？有什么我可以帮助你的吗？',
        '我也喜欢这样和你聊天',
        '你开心就好',
        '我们之间真的很有默契呢'
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'boyfriend',
        text: randomResponse,
        timestamp: new Date(),
        type: 'text'
      }]);
      setIsBoyfriendTyping(false);
    }, 1500);
  };

  const handleReceiveTransfer = (amount) => {
    setPendingTransfers(prev => [...prev, {
      id: Date.now(),
      amount: amount,
      status: 'pending'
    }]);

    const transferMessage = {
      id: Date.now(),
      sender: 'boyfriend',
      text: `给你转了 ¥${amount}`,
      timestamp: new Date(),
      type: 'transfer',
      amount: amount
    };
    setMessages(prev => [...prev, transferMessage]);
  };

  const handleAcceptTransfer = (transferId) => {
    setPendingTransfers(prev => 
      prev.map(t => t.id === transferId ? { ...t, status: 'accepted' } : t)
    );
  };

  if (currentTab === 'moments') {
    return <MomentsPage boyfriend={boyfriend} onBack={() => setCurrentTab('chat')} />;
  }

  if (currentTab === 'transfer') {
    return <TransferPage boyfriend={boyfriend} onBack={() => setCurrentTab('chat')} onTransfer={handleReceiveTransfer} />;
  }

  return (
    <div className="chat-page">
      {/* 顶部导航栏 */}
      <div className="chat-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="header-info">
          <h2>{boyfriend.name}</h2>
          <p>在线</p>
        </div>
        <div className="header-actions">
          <button className="icon-btn">☎️</button>
          <button className="icon-btn">📹</button>
          <button className="icon-btn">···</button>
        </div>
      </div>

      {/* 聊天区域 */}
      <div className="chat-container">
        <div className="messages-list">
          {messages.map(msg => (
            <div key={msg.id} className={`message-group ${msg.sender}`}>
              {msg.sender === 'boyfriend' && (
                <img src="https://via.placeholder.com/40" alt="avatar" className="avatar" />
              )}
              <div className={`message-bubble ${msg.type}`}>
                {msg.type === 'transfer' ? (
                  <div className="transfer-bubble">
                    <div className="transfer-icon">💰</div>
                    <div className="transfer-info">
                      <p>转账</p>
                      <p className="transfer-amount">¥{msg.amount}</p>
                    </div>
                    {pendingTransfers.find(t => t.id === msg.id)?.status === 'pending' && (
                      <button className="accept-transfer-btn" onClick={() => handleAcceptTransfer(msg.id)}>
                        接收
                      </button>
                    )}
                  </div>
                ) : (
                  msg.text
                )}
              </div>
              {msg.sender === 'user' && msg.sender === 'user' && (
                <img src="https://via.placeholder.com/40" alt="user-avatar" className="avatar" />
              )}
            </div>
          ))}
          {isBoyfriendTyping && (
            <div className="message-group boyfriend">
              <img src="https://via.placeholder.com/40" alt="avatar" className="avatar" />
              <div className="message-bubble typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入区域 */}
      <div className="input-area">
        <div className="input-toolbar">
          <button className="tool-btn" title="语音">🎙️</button>
          <button className="tool-btn" title="表情">😊</button>
          <button className="tool-btn" title="转账" onClick={() => setCurrentTab('transfer')}>💳</button>
          <button className="tool-btn" title="朋友圈" onClick={() => setCurrentTab('moments')}>📸</button>
          <button className="tool-btn" title="红包">🧧</button>
        </div>
        <form onSubmit={handleSendMessage} className="input-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="说点什么..."
            className="input-field"
          />
          <button type="submit" className="send-btn">发送</button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
