import React from 'react';
import Column from './Column';
import { ReactComponent as UrgentPriorityIcon } from '../assets/urgent-priority.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/high-priority.svg';
import { ReactComponent as MediumPriorityIcon } from '../assets/medium-priority.svg';
import { ReactComponent as LowPriorityIcon } from '../assets/low-priority.svg';
import { ReactComponent as NoPriorityIcon } from '../assets/no-priority.svg';

const Board = ({ tickets, grouping, sorting, addTask, updateTaskStatus, deleteTask }) => {
  if (!Array.isArray(tickets)) {
    return null;
  }

  let groupedTickets = {};

  // Group by status
  if (grouping === 'status') {
    const columns = {
      "Backlog": [],
      "To Do": [],
      "In Progress": [],
      "Done": [],
      "Cancelled": []
    };

    tickets.forEach((ticket) => {
      if (columns[ticket.status]) {
        columns[ticket.status].push(ticket);
      } else {
        columns["Backlog"].push(ticket);
      }
    });

    groupedTickets = columns;

  } 
  // Group by user
  else if (grouping === 'user') {
    tickets.forEach((ticket) => {
      if (!groupedTickets[ticket.user]) {
        groupedTickets[ticket.user] = [];
      }
      groupedTickets[ticket.user].push(ticket);
    });

  } 
  // Group by priority with custom order
  else if (grouping === 'priority') {
    const priorityLabels = {
      4: { name: 'Urgent', icon: <UrgentPriorityIcon className="priority-icon" /> },
      3: { name: 'High', icon: <HighPriorityIcon className="priority-icon" /> },
      2: { name: 'Medium', icon: <MediumPriorityIcon className="priority-icon" /> },
      1: { name: 'Low', icon: <LowPriorityIcon className="priority-icon" /> },
      0: { name: 'No Priority', icon: <NoPriorityIcon className="priority-icon" /> },
    };

    tickets.forEach((ticket) => {
      const priorityLabel = priorityLabels[ticket.priority] || priorityLabels[0]; // Default to 'No Priority'
      if (!groupedTickets[priorityLabel.name]) {
        groupedTickets[priorityLabel.name] = [];
      }
      groupedTickets[priorityLabel.name].push(ticket);
    });

    // Custom order for priority groups: Urgent, High, Medium, Low, No Priority
    const priorityOrder = ['Urgent', 'High', 'Medium', 'Low', 'No Priority'];
    groupedTickets = priorityOrder.reduce((ordered, priority) => {
      if (groupedTickets[priority]) {
        ordered[priority] = groupedTickets[priority];
      }
      return ordered;
    }, {});
  }

  const sortedColumns = Object.keys(groupedTickets).map((group) => ({
    group,
    tickets: groupedTickets[group].sort((a, b) => {
      if (sorting === 'priority') {
        return b.priority - a.priority;
      } else if (sorting === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    }),
    itemCount: groupedTickets[group].length, // Item count for each group
  }));

  return (
    <div className="board">
      {sortedColumns.map((column) => (
        <Column 
          key={column.group} 
          group={column.group} 
          tickets={column.tickets} 
          addTask={() => addTask(column.group)}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          itemCount={column.itemCount} // Pass itemCount to Column component
        />
      ))}
    </div>
  );
};

export default Board;
