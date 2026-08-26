import React, { useState } from 'react';
import './CreateBoyfriend.css';
import { saveBoyfriend } from '../utils/storage';

const CreateBoyfriend = ({ onBack, onSelect }) => {
  const [formData, setFormData] = useState({
    name: '',
    personality: '',
    backstory: '',
    traits: []
  });
  const [error, setError] = useState('');

  const personalityOptions = [
    '温柔体贴',
    '幽默逗趣',
    '成熟稳重',
    '活力开朗',
    '神秘高冷',
    '宠溺暖心'
  ];

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
        <h2>创建新男友</h2>
        <div style={{ width: 40 }}></div>
      </div>

      <form onSubmit={handleSubmit} className="create-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>名字 *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="给他起个名字..."
            maxLength="20"
            required
          />
          <span className="char-count">{formData.name.length}/20</span>
        </div>

        <div className="form-group">
          <label>性格特征 *</label>
          <div className="traits-grid">
            {personalityOptions.map(personality => (
              <button
                key={personality}
                type="button"
                className={`trait-btn ${formData.personality === personality ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, personality }))}
              >
                {personality}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>背景故事</label>
          <textarea
            name="backstory"
            value={formData.backstory}
            onChange={handleChange}
            placeholder="讲述他的故事，越详细越好..."
            rows="5"
            maxLength="500"
          />
          <span className="char-count">{formData.backstory.length}/500</span>
        </div>

        <div className="form-group">
          <label>其他特点</label>
          <div className="traits-list">
            {['温暖', '体贴', '有趣', '上进', '专一', '浪漫'].map(trait => (
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

        <button type="submit" className="submit-btn">
          开始聊天 💬
        </button>
      </form>
    </div>
  );
};

export default CreateBoyfriend;
