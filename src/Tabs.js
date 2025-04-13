import React, { useState } from 'react';
import './Tabs.css';

const Tabs = ({ classes, onSelectClass }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onSelectClass(index);
  };

  return (
    <div className="tabs">
      {classes.map((className, index) => (
        <button
          key={index}
          className={`tab ${activeTab === index ? 'active' : ''}`}
          onClick={() => handleTabClick(index)}
        >
          {className}
        </button>
      ))}
    </div>
  );
};

export default Tabs; 