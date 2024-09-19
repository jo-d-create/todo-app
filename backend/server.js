const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5003;

app.use(express.json());

let tasks = [];

// Fetch all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  const newTask = { id: Date.now(), task };
  tasks.push(newTask);
  res.json(newTask);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== parseInt(id));
  res.json({ message: 'Task deleted' });
});

// Serve static files from the React app (frontend)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
