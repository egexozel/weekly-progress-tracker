import React, { useState, useEffect } from 'react';
import BookProgress from './BookProgress';
import config from './config.json'; // Import the config file

const ClassProgress = ({ className, progress, updateProgress }) => {
    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        // Read books data from config.json based on className
        if (config[className]) {
            setBooksData(config[className]);
        } else {
            console.error(`Class "${className}" not found in config.json`);
            setBooksData([]); // Set to empty array to avoid errors
        }
    }, [className]);

    if (!booksData || booksData.length === 0) {
        return <div>No data found for class: {className}</div>;
    }

    return (
      <div className="class-progress">
        <h2>{className}</h2>
        {booksData.map((book, index) => (
          <BookProgress
            key={index}
            book={book.name}  // Pass book name
            progress={progress && Object.prototype.hasOwnProperty.call(progress, book.name) ? progress[book.name] : 0}
            updateProgress={updateProgress}
            totalTests={book["number of tests"]} // Pass total tests from config
          />
        ))}
      </div>
    );
};

export default ClassProgress;