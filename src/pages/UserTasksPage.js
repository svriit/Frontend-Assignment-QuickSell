import React from 'react';

const UserTasksPage = ({ tickets, sorting, updateTaskStatus, deleteTask, sortedTasks }) => {
  return (
    <div className="user-tasks-page">
      <h2>User Tasks</h2>
      <div className="user-tasks">
        {Object.entries(tickets).map(([user, userTasks]) => (
          <div key={user} className="user-column">
            <h3>{user}</h3>
            {sortedTasks(userTasks).map((task) => (
              <div key={task.id} className="task-card">
                <p><strong>{task.title}</strong></p>
                <p>Status: {task.status}</p>
                <p>Priority: {task.priority}</p>
                <div className="task-actions">
                  <button onClick={() => updateTaskStatus(task.id, 'In Progress')}>Start</button>
                  <button onClick={() => updateTaskStatus(task.id, 'Completed')}>Complete</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTasksPage;
