import React, { useState } from 'react';
import './TaskManagement.css';
import { useNavigate } from "react-router-dom";

const TaskManagement = () => {
  const [user, setUser] = useState({
    id: localStorage.getItem('userid'),
    name: localStorage.getItem('username'),
  });
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem(`${user?.id}_tasks`));
    return storedTasks || [];
  });
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  const [editedTaskId, setEditedTaskId] = useState(null);
  const navigate = useNavigate();


  const updateLocalStorageTasks = (updatedTasks) => {
    localStorage.setItem(`${user.id}_tasks`, JSON.stringify(updatedTasks));
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');

  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        completed: false,
        userId: user.id,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      updateLocalStorageTasks(updatedTasks);
      setNewTaskTitle('');
    }
  };

  const handleEditTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.userId === user.id && task.id === taskId
        ? { ...task, title: editedTaskTitle !== '' ? editedTaskTitle : task.title }
        : task
    );
    setTasks(updatedTasks);
    updateLocalStorageTasks(updatedTasks);
    setEditedTaskId(null);
    setEditedTaskTitle('');
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(
      (task) => task.userId === user.id && task.id !== taskId
    );
    setTasks(updatedTasks);
    updateLocalStorageTasks(updatedTasks);
  };

  return (
    <div className="task-management">
      {!user ? (
        <button onClick={() => setUser({ id: '1', name: 'John Doe' })}>
          Auto Login
        </button>
      ) : (
        <>
          <div className="user-section">
            <h1>Welcome, {user.name}!</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="add-task-section">
            <input
              type="text"
              placeholder="New Task Title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>
          <table className="task-table">
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Completed</th>
                <th>Action</th>
                
                {/* <th>Delete</th> */}
              </tr>
            </thead>
            <tbody>
              {tasks
                .filter((task) => task.userId === user.id)
                .map((task) => (
                  <tr key={task.id}>
                    <td>
                      {editedTaskId === task.id ? (
                        <input
                          type="text"
                          value={editedTaskTitle}
                          onChange={(e) => setEditedTaskTitle(e.target.value)}
                        />
                      ) : (
                        task.title
                      )}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {
                          const updatedTasks = tasks.map((t) =>
                            t.id === task.id
                              ? { ...t, completed: !t.completed }
                              : t
                          );
                          setTasks(updatedTasks);
                          updateLocalStorageTasks(updatedTasks);
                        }}
                      />
                    </td>
                    <td>
                      {editedTaskId === task.id ? (
                        <>
                          <button onClick={() => handleEditTask(task.id)}>
                            Save
                          </button>
                          <button onClick={() => setEditedTaskId(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button onClick={() => setEditedTaskId(task.id)}>
                          Edit
                        </button>
                      )}
                      <button onClick={() => handleDeleteTask(task.id)}>
                        Delete
                      </button>
                    </td>
                    
                    {/* <td>
                      <button onClick={() => handleDeleteTask(task.id)}>
                        Delete
                      </button>
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TaskManagement;
