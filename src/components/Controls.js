import React, { useState } from 'react';
import { ReactComponent as DisplayIcon } from '../assets/display.svg';

const Controls = ({ grouping, setGrouping, sorting, setSorting }) => {
  const [showDisplayMenu, setShowDisplayMenu] = useState(false);

  return (
    <div className="controls">
      <div className="control display-control">
        <div className="display-icon-container" onClick={() => setShowDisplayMenu(!showDisplayMenu)}>
          <DisplayIcon className="display-icon" />
          <label>Display</label>
        </div>
        {showDisplayMenu && (
          <div className="dropdown display-dropdown">
            <div className="dropdown-section">
              <label>Grouping:</label>
              <select onChange={(e) => setGrouping(e.target.value)} value={grouping}>
                <option value="status">By Status</option>
                <option value="user">By User</option>
                <option value="priority">By Priority</option>
              </select>
            </div>
            <div className="dropdown-section">
              <label>Ordering:</label>
              <select onChange={(e) => setSorting(e.target.value)} value={sorting}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;
