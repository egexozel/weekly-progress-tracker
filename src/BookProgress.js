import React from 'react';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const BookProgress = ({ book, progress, updateProgress }) => {
  return (
    <div className="book-progress">
      <h3>{book}</h3>
      <div className="controls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaMinusCircle onClick={(event) => { event.stopPropagation(); updateProgress(book, -1); }} style={{ color: '#d1133f', cursor: 'pointer' }} />
        <p>Tests Completed: {progress}</p>
        <FaPlusCircle onClick={(event) => { event.stopPropagation(); updateProgress(book, 1); }} style={{ color: '#88d113', cursor: 'pointer' }} />
      </div>
    </div>
  );
};

export default BookProgress; 