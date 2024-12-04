import React, { useState } from 'react';
import { ReactComponent as ThreeDotsIcon } from '../assets/three-dots.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/high-priority.svg';
import { ReactComponent as MediumPriorityIcon } from '../assets/medium-priority.svg';
import { ReactComponent as LowPriorityIcon } from '../assets/low-priority.svg';
import { ReactComponent as NoPriorityIcon } from '../assets/no-priority.svg';
import { ReactComponent as UrgentPriorityIcon } from '../assets/urgent-priority.svg';
import { FaTrashAlt } from 'react-icons/fa';

const Card = ({ ticket, updateTaskStatus, deleteTask, grouping }) => {
  const [showMenu, setShowMenu] = useState(false);

  const priorityIcons = {
    4: <UrgentPriorityIcon className="priority-icon urgent" />,
    3: <HighPriorityIcon className="priority-icon high" />,
    2: <MediumPriorityIcon className="priority-icon medium" />,
    1: <LowPriorityIcon className="priority-icon low" />,
    0: <NoPriorityIcon className="priority-icon none" />,
  };

  const handleStatusChange = (newStatus) => {
    updateTaskStatus(ticket.id, newStatus);
    setShowMenu(false);
  };

  // Extract initials from user's name
  const getUserInitials = (userName) => {
    if (!userName) return '';
    const names = userName.split(' ');
    return names.map(name => name.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4>{ticket.title}</h4>
        <div className="menu-container">
          <ThreeDotsIcon
            className="three-dots"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="dropdown-menu">
              <button onClick={() => handleStatusChange('Backlog')}>Backlog</button>
              <button onClick={() => handleStatusChange('To Do')}>To Do</button>
              <button onClick={() => handleStatusChange('In Progress')}>In Progress</button>
              <button onClick={() => handleStatusChange('Done')}>Done</button>
              <button onClick={() => handleStatusChange('Cancelled')}>Cancelled</button>
            </div>
          )}
        </div>
      </div>

      <div className="card-user-info">
        {/* Conditionally render the user initials based on grouping */}
        {grouping !== 'user' && (
          <div className="card-user-circle">
            {getUserInitials(ticket.user)}
          </div>
        )}

        {/* Conditionally render user name */}
        {grouping !== 'user' && (
          <p className="card-user-name">{ticket.user}</p>
        )}
      </div>

      {/* Conditionally render priority if not grouped by priority */}
      {grouping !== 'priority' && ticket.status !== 'Done' && ticket.status !== 'Cancelled' && (
        <p>Priority: {priorityIcons[ticket.priority]}</p>
      )}

      {/* Show delete button if status is Cancelled */}
      {ticket.status === 'Cancelled' && (
        <button className="delete-task-btn" onClick={() => deleteTask(ticket.id)}>
          <FaTrashAlt className="bin-icon" /> Delete Permanently
        </button>
      )}
    </div>
  );
};

export default Card;
