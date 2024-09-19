import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5003/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5003/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.task} <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
