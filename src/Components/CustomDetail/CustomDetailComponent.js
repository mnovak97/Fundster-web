import React from 'react';
import "./CustomDetailComponent.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useTranslation } from 'react-i18next';

const CustomDetailComponent = ({ project, componentType }) => {
  const { t } = useTranslation();
  const fundedComponent = () => {
    const percentage = ((project.moneyAcquired || 0) / (project.moneyGoal || 1)) * 100;
    const roundedPercentage = percentage.toFixed(1);
    return (
      <div className="componentContent">
        <div>
          <i className="fas fa-dollar-sign"></i>
          <span>{roundedPercentage}%</span>
        </div>
        <p>{t('funded')}</p>
      </div>
    );
  };

  const backersComponent = () => (
    <div className="componentContent">
      <div>
        <i className="fas fa-user"></i>
        <span>{project.backers || 0}</span>
      </div>
      <p>{t('backers')}</p>
    </div>
  );

  const daysLeftComponent = () => {
    const daysLeft = Math.floor((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    return (
      <div className="componentContent">
        <div>
          <i className="far fa-clock"></i>
          <span>{daysLeft}</span>
        </div>
        <p>{t('daysLeft')}</p>
      </div>
    );
  };

  const renderComponent = () => {
    switch (componentType) {
      case 'funded':
        return fundedComponent();
      case 'backers':
        return backersComponent();
      case 'days':
        return daysLeftComponent();
      default:
        return null;
    }
  };

  return (
    <div>
      {renderComponent()}
    </div>
  );
};

export default CustomDetailComponent;
