import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ onTaskAdded }) => {
  const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Task to be added:', task);

        axios.post('http://localhost:5003/tasks', { task })
            .then(response => {
                console.log('Task added successfully:', response.data);
                onTaskAdded(response.data);  // Call the parent component's function to add the new task to the state
                setTask('');  // Clear the input field
            })
            .catch(error => console.error('Error adding task:', error));
    };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter new task"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
