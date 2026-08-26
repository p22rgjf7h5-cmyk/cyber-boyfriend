import React, { useState } from 'react';
import './TransferPage.css';

const TransferPage = ({ boyfriend, onBack, onTransfer }) => {
  const [transferAmount, setTransferAmount] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const quickAmounts = [5, 10, 20, 50, 100, 200];

  const handleSelectAmount = (amount) => {
    setTransferAmount(amount.toString());
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setTransferAmount(value);
    }
  };

  const handleConfirmTransfer = () => {
    if (transferAmount && parseFloat(transferAmount) > 0) {
      setShowConfirm(true);
    }
  };

  const handleExecuteTransfer = () => {
    onTransfer(parseFloat(transferAmount));
    setTransferAmount('');
    setShowConfirm(false);
    onBack();
  };

  return (
    <div className="transfer-page">
      <div className="transfer-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h2>转账给 {boyfriend.name}</h2>
        <div style={{ width: 40 }}></div>
      </div>

      <div className="transfer-container">
        {!showConfirm ? (
          <>
            <div className="transfer-input-group">
              <label>输入金额</label>
              <div className="amount-input-wrapper">
                <span className="currency">¥</span>
                <input
                  type="text"
                  value={transferAmount}
                  onChange={handleCustomAmount}
                  placeholder="0.00"
                  className="amount-input"
                  autoFocus
                />
              </div>
            </div>

            <div className="quick-amounts">
              <p>快速选择</p>
              <div className="amount-buttons">
                {quickAmounts.map(amount => (
                  <button
                    key={amount}
                    className={`amount-btn ${transferAmount === amount.toString() ? 'active' : ''}`}
                    onClick={() => handleSelectAmount(amount)}
                  >
                    ¥{amount}
                  </button>
                ))}
              </div>
            </div>

            <div className="transfer-notes">
              <p>💡 提示：每笔转账都代表一份心意</p>
            </div>
          </>
        ) : (
          <div className="transfer-confirm">
            <div className="confirm-icon">💰</div>
            <p className="confirm-text">确认转账</p>
            <p className="confirm-amount">¥{transferAmount}</p>
            <p className="confirm-to">给 {boyfriend.name}</p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setShowConfirm(false)}>取消</button>
              <button className="btn-confirm" onClick={handleExecuteTransfer}>确认转账</button>
            </div>
          </div>
        )}

        {!showConfirm && transferAmount && (
          <button className="transfer-btn" onClick={handleConfirmTransfer}>
            转账 ¥{transferAmount}
          </button>
        )}
      </div>
    </div>
  );
};

export default TransferPage;
