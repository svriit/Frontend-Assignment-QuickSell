import React, { useState, useEffect } from 'react';
import { ReactComponent as UrgentPriorityIcon } from '../assets/urgent-priority.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/high-priority.svg';
import { ReactComponent as MediumPriorityIcon } from '../assets/medium-priority.svg';
import { ReactComponent as LowPriorityIcon } from '../assets/low-priority.svg';
import { ReactComponent as NoPriorityIcon } from '../assets/no-priority.svg';


const Modal = ({ onClose, onSubmit, task = {}, isEditMode = false }) => {
  const [taskTitle, setTaskTitle] = useState(task.title || '');
  const [allocatedPerson, setAllocatedPerson] = useState(task.user || '');
  const [priority, setPriority] = useState(task.priority || 0);

  const priorityOptions = [
    { value: 4, label: 'Urgent', icon: <UrgentPriorityIcon /> },
    { value: 3, label: 'High', icon: <HighPriorityIcon /> },
    { value: 2, label: 'Medium', icon: <MediumPriorityIcon /> },
    { value: 1, label: 'Low', icon: <LowPriorityIcon /> },
    { value: 0, label: 'No Priority', icon: <NoPriorityIcon /> },
  ];

  const handleSubmit = () => {
    if (taskTitle && allocatedPerson) {
      onSubmit({
        id: task.id || `CAM-${Math.floor(Math.random() * 10000)}`,
        title: taskTitle,
        status: task.status || 'Todo',
        priority,
        user: allocatedPerson
      });
    }
  };

  useEffect(() => {
    // Pre-fill modal fields if editing an existing task
    if (isEditMode && task) {
      setTaskTitle(task.title || '');
      setAllocatedPerson(task.user || '');
      setPriority(task.priority || 0);
    }
  }, [isEditMode, task]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{isEditMode ? 'Edit Task' : 'Add New Task'}</h3>
        <div className="modal-field">
          <label>Task Title</label>
          <input 
            type="text" 
            value={taskTitle} 
            onChange={(e) => setTaskTitle(e.target.value)} 
            placeholder="Enter task title" 
          />
        </div>
        <div className="modal-field">
          <label>Allocated Person</label>
          <input 
            type="text" 
            value={allocatedPerson} 
            onChange={(e) => setAllocatedPerson(e.target.value)} 
            placeholder="Enter allocated person" 
          />
        </div>
        <div className="modal-field">
          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(parseInt(e.target.value))}>
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-buttons">
          <button className="submit-btn" onClick={handleSubmit}>
            {isEditMode ? 'Save Changes' : 'Add Task'}
          </button>
          <button className="close-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
