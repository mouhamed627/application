import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Tasks() {
  const location = useLocation();
  const name = location.state?.name;

  const taskList = [
    { id: 1, title: 'task 1', description: 'delete all data', priority: 'medium', status: 'done', dateLim: '3/2/2025' },
    { id: 2, title: 'task 2', description: 'manage accounts', priority: 'low', status: 'in progress', dateLim: '4/2/2025' },
    { id: 3, title: 'task 3', description: 'create a web application', priority: 'high', status: 'in progress', dateLim: '6/2/2025' },
    { id: 4, title: 'task 4', description: 'show your work with your teammates', priority: 'high', status: 'in progress', dateLim: '9/2/2025' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [nextId, setNextId] = useState(5);
  const [tasks, setTasks] = useState(taskList);
  const [inputTask, setInputTask] = useState('');

  function handleAddButton() {
    if (inputTask.trim()) {
      let priority = prompt('Enter the priority of your task');
      let day = prompt('Enter the day');
      let month = prompt('Enter the month');
      let year = prompt('Enter the year');

      let newTask = {
        id: nextId,
        title: `task ${nextId}`,
        description: inputTask,
        priority: priority,
        status: 'in progress',
        dateLim:`${day}/${month}/${year}`
      };
      setNextId(nextId + 1);
      setInputTask('');
      setTasks([...tasks, newTask]);
    }
  }

  function handleDeleteButton(id) {
    const newTaskList = tasks.filter((task) => task.id !== id);
    setTasks(newTaskList);
  }

  function handleUpdateButton(id) {
    const taskToUpdate = tasks.find((task) => task.id === id);
    const newDescription = prompt('Enter a new description for the task', taskToUpdate.description);
    const newPriority = prompt('Enter a new priority for the task', taskToUpdate.priority);
    const newDateLim = prompt('Enter a new date limit for the task', taskToUpdate.dateLim);
    const newStatus = prompt('Enter the new status of the task', taskToUpdate.status);
    const updatedTask = { ...taskToUpdate, description: newDescription, priority: newPriority, dateLim: newDateLim, status: newStatus };
    const newTaskList = tasks.map((task) => (task.id === id ? updatedTask : task));
    setTasks(newTaskList);
  }

  const filteredTasks = tasks.filter((task) =>
    task.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='Tasks'>
      <h1>Hello {name}, nice to meet you. Here is your To-Do List:</h1>
      <input
        value={searchTerm}
        placeholder='Type here to search'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table border={6}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>{task.dateLim}</td>
              <td>
                <button className='Delete' onClick={() => handleDeleteButton(task.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button className='Update' onClick={() => handleUpdateButton(task.id)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <input
        value={inputTask}
        onChange={(e) => setInputTask(e.target.value)}
        placeholder='Enter a new task'
      />
      <button id='Add' onClick={handleAddButton}>
        Add
      </button>
    </div>
  );
}

export default Tasks;
