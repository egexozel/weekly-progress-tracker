import React, { useState } from 'react';
import Tabs from './Tabs';
import ClassProgress from './ClassProgress';
import './App.css';

function App() {
  const classes = ['8A', '8B', '8C'];
  const books = ['Yaprak Test', 'Genel Deneme', 'More&More'];
  const [progress, setProgress] = useState({
    '8A': { 'Yaprak Test': 0, 'Genel Deneme': 0, 'More&More': 0 },
    '8B': { 'Yaprak Test': 0, 'Genel Deneme': 0, 'More&More': 0 },
    '8C': { 'Yaprak Test': 0, 'Genel Deneme': 0, 'More&More': 0 },
  });
  const [selectedClass, setSelectedClass] = useState(0);

  const updateProgress = (book, change) => {
    setProgress((prevProgress) => {
      const newProgress = { ...prevProgress };
      newProgress[classes[selectedClass]][book] += change;
      return newProgress;
    });
  };

  return (
    <div className="App">
      <Tabs classes={classes} onSelectClass={setSelectedClass} />
      <ClassProgress
        className={classes[selectedClass]}
        books={books}
        progress={progress[classes[selectedClass]]}
        updateProgress={updateProgress}
      />
    </div>
  );
}

export default App;
