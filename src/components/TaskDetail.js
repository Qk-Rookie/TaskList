import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const task = JSON.parse(localStorage.getItem('tasks')).find(t => t.id === parseInt(id));
    if (task) {
      setTask(task);
    }
  }, [id]);

  if (!task) return <div>Loading...</div>;

  const handleUpdateTask = (updatedTask) => {
    localStorage.setItem('tasks', JSON.stringify(
      JSON.parse(localStorage.getItem('tasks')).map(t => t.id === updatedTask.id ? updatedTask : t)
    ));
    setTask(updatedTask);
  };

  return (
    <div className="container">
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>状态: {task.status}</p>
      <p>优先级: {task.priority}</p>
      <p>截止日期: {task.dueDate}</p>
      <TaskForm task={task} onTaskUpdated={handleUpdateTask} />
      <button onClick={() => navigate('/')}>返回任务列表</button>
    </div>
  );
};

export default TaskDetail;