import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import Header from './components/Header';
import Loading from './components/Loading';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data && Array.isArray(data.tickets) && Array.isArray(data.users)) {
          // Map users to tickets
          const userMap = data.users.reduce((acc, user) => {
            acc[user.id] = user.name;
            return acc;
          }, {});

          const ticketsWithUsers = data.tickets.map(ticket => ({
            ...ticket,
            user: userMap[ticket.userId] || 'Unassigned'
          }));

          setTickets(ticketsWithUsers);
        } else {
          throw new Error('Fetched data is not in expected format');
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGroupingChange = (groupBy) => {
    setGrouping(groupBy);
    localStorage.setItem('grouping', groupBy);
  };

  const handleSortingChange = (sortBy) => {
    setSorting(sortBy);
    localStorage.setItem('sorting', sortBy);
  };

  const addTask = (status) => {
    const newTask = {
      id: `CAM-${Math.floor(Math.random() * 10000)}`,
      title: 'New Task',
      status: status,
      priority: 0,
      user: 'Unassigned',
    };
    setTickets([...tickets, newTask]);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === taskId ? { ...ticket, status: newStatus } : ticket
    );
    setTickets(updatedTickets);
  };

  const deleteTask = (taskId) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== taskId);
    setTickets(updatedTickets);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app">
      <Header />
      <Controls 
        grouping={grouping} 
        setGrouping={handleGroupingChange} 
        sorting={sorting} 
        setSorting={handleSortingChange} 
      />
      <Board 
        tickets={tickets} 
        grouping={grouping} 
        sorting={sorting} 
        addTask={addTask}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
