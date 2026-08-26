import React, { useState, useEffect } from 'react';
import './CreateBoyfriend.css';
import { saveBoyfriend } from '../utils/storage';

const CreateBoyfriend = ({ onBack, onSelect }) => {
  const [formData, setFormData] = useState({
    name: '王清',
    personality: '温柔体贴',
    backstory: '你出生前就认识，一直温柔地照顾你。是父亲的好友，也是你成长中最重要的人。他不知道从什么时候开始，对你有了特殊的感情。',
    traits: ['温暖', '体贴', '聪慧', '开明'],
    age: 42,
    job: '历史学教授'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleTraitToggle = (trait) => {
    setFormData(prev => ({
      ...prev,
      traits: prev.traits.includes(trait)
        ? prev.traits.filter(t => t !== trait)
        : [...prev.traits, trait]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('请输入名字');
      return;
    }
    if (!formData.personality) {
      setError('请选择性格特征');
      return;
    }

    const boyfriend = saveBoyfriend(formData);
    onSelect(boyfriend);
  };

  return (
    <div className="create-boyfriend-page">
      <div className="create-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2>王清的故事</h2>
        <div style={{ width: 40 }}></div>
      </div>

      <form onSubmit={handleSubmit} className="create-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>名字</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled
            maxLength="20"
          />
          <span className="char-count">{formData.name.length}/20</span>
        </div>

        <div className="form-group">
          <label>年龄</label>
          <input
            type="text"
            value={formData.age}
            disabled
          />
        </div>

        <div className="form-group">
          <label>职业</label>
          <input
            type="text"
            value={formData.job}
            disabled
          />
        </div>

        <div className="form-group">
          <label>性格特征</label>
          <input
            type="text"
            value={formData.personality}
            onChange={handleChange}
            placeholder="如：温柔、沉静、内敛..."
          />
        </div>

        <div className="form-group">
          <label>背景故事</label>
          <textarea
            name="backstory"
            value={formData.backstory}
            onChange={handleChange}
            rows="6"
            maxLength="500"
          />
          <span className="char-count">{formData.backstory.length}/500</span>
        </div>

        <div className="form-group">
          <label>其他特点</label>
          <div className="traits-list">
            {['温暖', '体贴', '有趣', '聪慧', '开明', '浪漫'].map(trait => (
              <button
                key={trait}
                type="button"
                className={`tag-btn ${formData.traits.includes(trait) ? 'active' : ''}`}
                onClick={() => handleTraitToggle(trait)}
              >
                {trait}
              </button>
            ))}
          </div>
        </div>

        <div className="form-tips">
          <p>💡 王清喜欢喝酒，但酒量很差，喝醉后会很话唠也很爱哭。试试在聊天里给他灌醉吧～</p>
        </div>

        <button type="submit" className="submit-btn">
          开始聊天 💬
        </button>
      </form>
    </div>
  );
};

export default CreateBoyfriend;
