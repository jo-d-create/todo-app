import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTask from './components/AddTask';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:5003/tasks')
          .then(response => setTasks(response.data))
          .catch(error => console.error('Error fetching tasks:', error));
      }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>To-Do List App</h1>

            {/* Add an image from the public folder */}
            <img src="https://imageio.forbes.com/specials-images/dam/imageserve/1092571024/960x0.jpg?height=474&width=711&fit=bounds" alt="To-Do List (Forbes)" style={{ width: '300px' }} />

            <AddTask onTaskAdded={handleTaskAdded} />
            <TodoList tasks={tasks} setTasks={setTasks} />
        </div>
    );
}

export default App;
