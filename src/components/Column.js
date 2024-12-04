import React from 'react';
import Card from './Card';
import { ReactComponent as BacklogIcon } from '../assets/backlog.svg';
import { ReactComponent as ToDoIcon } from '../assets/todo.svg';
import { ReactComponent as InProgressIcon } from '../assets/in-progress.svg';
import { ReactComponent as DoneIcon } from '../assets/done.svg';
import { ReactComponent as CancelledIcon } from '../assets/cancelled.svg';
import { ReactComponent as UrgentPriorityIcon } from '../assets/urgent-priority.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/high-priority.svg';
import { ReactComponent as MediumPriorityIcon } from '../assets/medium-priority.svg';
import { ReactComponent as LowPriorityIcon } from '../assets/low-priority.svg';
import { ReactComponent as NoPriorityIcon } from '../assets/no-priority.svg';

const Column = ({ group, tickets, addTask, updateTaskStatus, deleteTask }) => {
  const columnIcons = {
    'Backlog': <BacklogIcon className="column-icon" />,
    'To Do': <ToDoIcon className="column-icon" />,
    'In Progress': <InProgressIcon className="column-icon" />,
    'Done': <DoneIcon className="column-icon" />,
    'Cancelled': <CancelledIcon className="column-icon" />,
    'Urgent': <UrgentPriorityIcon className="column-icon" />,
    'High': <HighPriorityIcon className="column-icon" />,
    'Medium': <MediumPriorityIcon className="column-icon" />,
    'Low': <LowPriorityIcon className="column-icon" />,
    'No Priority': <NoPriorityIcon className="column-icon" />,
  };

  return (
    <div className="column">
      <div className="column-header">
        <div className="column-header-content">
          {columnIcons[group]} 
          <h3>{group}</h3>
          <span>{tickets.length} </span>
        </div>
        {group !== 'Cancelled' && (
          <button className="add-task-btn" onClick={addTask}>+</button>
        )}
      </div>
      {tickets.map((ticket) => (
        <Card key={ticket.id} ticket={ticket} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default Column;
