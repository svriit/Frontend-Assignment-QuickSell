import React from 'react';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <h1 className="loading-title">Kanban Dashboard</h1>
        <div className="spinner"></div>
        <div className='spinner_text'>Loading ....</div>
      </div>
    </div>
  );
};

export default Loading;
