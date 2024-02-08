import React from 'react';
import "./ProgressBarCustom.css"

const ProgressBarCustom = ({ moneyGoal, moneyAcquired }) => {
  const calculatePercentage = () => {
    return Math.min((moneyAcquired / moneyGoal) * 100, 100);
  };

  const percentage = calculatePercentage();

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${percentage}%` }}>
        <div className="progress-line"></div>
      </div>
    </div>
  );
};

export default ProgressBarCustom;
