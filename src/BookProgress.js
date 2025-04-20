import React from 'react';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const BookProgress = ({ book, progress, updateProgress, totalTests }) => {
  const changeProgress = (change) => {
    updateProgress(book, change);
  };
  return (
    <div className="book-progress">
      <h3>{book}</h3>
      <div className="controls">
        <FaMinusCircle onClick={() => changeProgress(-1)} style={{ color: '#d1133f', cursor: 'pointer' }} />
        <p>{progress} / {totalTests}</p>
        <FaPlusCircle onClick={() => changeProgress(1)} style={{ color: '#88d113', cursor: 'pointer' }} />
      </div>
    </div>
  );
};

export default BookProgress;