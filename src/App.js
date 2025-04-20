import React, { useState, useEffect } from 'react';
import ClassProgress from './ClassProgress';
import './styles.css';
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
  const [selectedClass, setSelectedClass] = useState(0);

  useEffect(() => {
      localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

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
      return newProgress;
    });
  };

  const exportProgress = () => {
    const dataStr = JSON.stringify(progress);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'progress.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importProgress = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContent = JSON.parse(e.target.result);
          setProgress(fileContent);
        } catch (error) {
          console.error("Error parsing the file:", error);
          // Handle the error appropriately (e.g., display an error message)
        }
      };
      reader.readAsText(file);
    }
  };











  return (
    <div className="App">
      <ClassProgress
          className={classes[selectedClass]}
          progress={progress[classes[selectedClass]]}
          updateProgress={updateProgress}
        />
        <div className="navbar">
        {classes.map((className, index) => (
          <div
            key={index}
            className={`nav-item ${selectedClass === index ? 'active' : ''}`}
            onClick={() => setSelectedClass(index)}
          >
            {className}
          </div>
        ))}
      </div>

      <div className="progress-controls">
        <button onClick={exportProgress}>Export Progress</button>
        <input type="file" id="import-file-input" accept=".json" onChange={importProgress} style={{ display: 'none' }} />
        <button id="import-progress-button" onClick={() => {
          document.getElementById('import-file-input').click();
        }}>
          Import Progress
        </button>
      </div>
    </div>
  );
}

export default App;
