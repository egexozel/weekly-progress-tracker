import React, { useState, useEffect } from 'react';
import Tabs from './Tabs';
import ClassProgress from './ClassProgress';
import './styles.css';

function App() {
  const classes = ['8A', '8B', '8C'];
  const books = ['Yaprak Test', 'Genel Deneme', 'More&More'];

  const loadProgress = () => {
    const savedProgress = localStorage.getItem('progress');
    return savedProgress ? JSON.parse(savedProgress) : {
      '8A': { 'Yaprak Test': 0, 'Genel Deneme': 0, 'More&More': 0 },
      '8B': { 'Yaprak Test': 0, 'Genel Deneme': 0, 'More&More': 0 },
      '8C': { 'Yaprak Test': 0, 'Genel Deneme': 0, 'More&More': 0 },
    };
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
      newProgress[classes[selectedClass]] = {
        ...newProgress[classes[selectedClass]],
        [book]: newProgress[classes[selectedClass]][book] + change,
      };
      console.log(`New progress for ${book}:`, newProgress[classes[selectedClass]][book]);
      return newProgress;
    });
  };

  return (
    <div className="App">
      <ClassProgress
        className={classes[selectedClass]}
        books={books}
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
    </div>
  );
}

export default App;
