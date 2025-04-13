import React from 'react';
import BookProgress from './BookProgress';

const ClassProgress = ({ className, books, progress, updateProgress }) => {
  return (
    <div className="class-progress">
      <h2>{className}</h2>
      {books.map((book, index) => (
        <BookProgress
          key={index}
          book={book}
          progress={progress[book]}
          updateProgress={updateProgress}
        />
      ))}
    </div>
  );
};

export default ClassProgress; 