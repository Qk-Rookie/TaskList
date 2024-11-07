import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.css"; // 引入自定义样式
import TaskForm from "./TaskForm";

//任务列表组件
const TaskList = () => {
  //任务列表
  const [tasks, setTasks] = useState([]);
  //添加表单
  const [addFlag, setAddFlag] = useState(false);
  //编辑表单
  const [editTask, setEditTask] = useState(null);
  //状态
  const [selectedStatus, setSelectedStatus] = useState("");
  //排序
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    // 假设这里是从服务器获取任务列表
    const sampleTasks = [
      {
        id: 1,
        title: "任务一",
        description: "描述一",
        status: "待办",
        priority: "高",
        dueDate: "2024-11-10",
      },
      {
        id: 2,
        title: "任务二",
        description: "描述二",
        status: "进行中",
        priority: "中",
        dueDate: "2024-11-15",
      },
      {
        id: 3,
        title: "任务三",
        description: "描述三",
        status: "已完成",
        priority: "低",
        dueDate: "2024-11-20",
      },
    ];
    setTasks(sampleTasks);
  }, []);

  //删除任务
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
//添加/修改
  const handleToggleAddForm = () => {
    setAddFlag(!addFlag);
    setEditTask(null); // 确保添加模式时清除编辑任务
  };
//添加任务
  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    setAddFlag(false); // 关闭表单
  };
//更新任务
  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setAddFlag(false); // 关闭表单
  };
//修改任务
  const handleEditTask = (task) => {
    setEditTask(task);
    setAddFlag(true); // 显示表单
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setAddFlag(false);
    setEditTask(null); 
  };

  //状态筛选
  const filteredTasks = selectedStatus
    ? tasks.filter((task) => task.status === selectedStatus)
    : tasks;

  //任务优先级筛选
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorities = ["低", "中", "高"];
    const indexA = priorities.indexOf(a.priority);
    const indexB = priorities.indexOf(b.priority);
    if (selectedSort === "asc") {
      return indexA - indexB;
    } else if (selectedSort === "desc") {
      return indexB - indexA;
    }
    return 0;
  });

  return (
    <div className="container">
      <h1>任务列表</h1>
      <div className="filter-container">
        <label htmlFor="status-filter">筛选状态:</label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">全部</option>
          <option value="待办">待办</option>
          <option value="进行中">进行中</option>
          <option value="已完成">已完成</option>
        </select>
        <label htmlFor="sort-filter">排序优先级:</label>
        <select
          id="sort-filter"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="">无</option>
          <option value="asc">升序</option>
          <option value="desc">降序</option>
        </select>
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th>标题</th>
            <th>描述</th>
            <th>状态</th>
            <th>优先级</th>
            <th>截止日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr key={task.id}>
              <td>
                <Link to={`/tasks/${task.id}`}>{task.title}</Link>
              </td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>{task.dueDate}</td>
              <td>
                <button onClick={() => handleEditTask(task)}>编辑</button>
                <button data-type="delete"  onClick={() => handleDeleteTask(task.id)}>删除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="action-buttons">
        {addFlag && editTask && (
          <button onClick={handleCancelEdit}>取消修改</button>
        )}
        <button onClick={handleToggleAddForm}>
          {addFlag ? (editTask ? "确认修改" : "取消添加") : "添加"}
        </button>
      </div>
      {addFlag && (
        <TaskForm
          task={editTask}
          onTaskCreated={handleTaskCreated}
          onTaskUpdated={handleTaskUpdated}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default TaskList;