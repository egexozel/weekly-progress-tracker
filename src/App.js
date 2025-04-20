import React, { useState, useEffect } from 'react';
import ClassProgress from './ClassProgress';
import './styles.css';
import ProgressControl from './ProgressControl'; // Import the new component
import { FaHome, FaCog } from 'react-icons/fa'; // Import icons

import config from './config.json'; // Import the config file

function App() {
  // Dynamically generate classes from config
  const classes = Object.keys(config);

  const loadProgress = () => {
    const savedProgress = localStorage.getItem('progress');
    if (savedProgress) {
      return JSON.parse(savedProgress);
    } else {
      // Initialize progress from config file
      const initialProgress = {};
      for (const className of classes) {
        initialProgress[className] = {};
        for (const book of config[className]) {
          initialProgress[className][book.name] = 0;
        }
      }
      return initialProgress;
    }
  };

  const [progress, setProgress] = useState(loadProgress);
  const [selectedTab, setSelectedTab] = useState(0); // 0 for class progress, 1 for settings
  const [selectedClass, setSelectedClass] = useState(0);

  useEffect(() => {
      localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  const handleTabChange = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  const updateProgress = (book, change) => {
    console.log(`Updating progress for book: ${book}, change: ${change}`);

    setProgress((prevProgress) => {
      const newProgress = { ...prevProgress };
      const currentClass = classes[selectedClass];
      if (!newProgress[currentClass]) {
        newProgress[currentClass] = {};
      }
        newProgress[currentClass] = {
          ...newProgress[currentClass], [book]: (newProgress[currentClass][book] || 0) + change,
        };
      console.log(`New progress for ${book}:`, newProgress[classes[selectedClass]][book]);
          return newProgress;    });  };

  return (
    <div className="App">
      {selectedTab === 0 && (
        
          <ClassProgress
              className={classes[selectedClass]}
              progress={progress[classes[selectedClass]]}
              updateProgress={updateProgress}
            />
        
      )}
      {selectedTab === 1 && (
        <ProgressControl progress={progress} setProgress={setProgress} />
      )}

      <div className="navbar">
        

        {classes.map((className, index) => (
          <div
            key={index}
            className={`nav-item ${selectedTab === 0 && selectedClass === index ? 'active' : ''}`}
            onClick={() => {
              handleTabChange(0);
              setSelectedClass(index);
            }}
          >
            {className}
          </div>
        ))}
        <div
          className={`nav-item ${selectedTab === 1 ? 'active' : ''}`}
          onClick={() => handleTabChange(1)}
          id="progress-control-tab" // Added id here
        >
          <FaCog />
        </div>
      </div>
    </div>
  );
}

export default App;
