import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//创建表单组件，用于添加或编辑
const TaskForm = ({ task, onTaskCreated, onTaskUpdated, onCancel }) => {
  //标题
  const [title, setTitle] = useState("");
  //描述
  const [description, setDescription] = useState("");
  //状态
  const [status, setStatus] = useState("待办");
  //优先级
  const [priority, setPriority] = useState("低");
  //日期
  const [dueDate, setDueDate] = useState("");


  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    //若点击编辑按钮，则回填表单
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate);
    }
  }, [task]);

    //提交表单
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: id || Date.now(),
      title,
      description,
      status,
      priority,
      dueDate,
    };
    if (id) {
      onTaskUpdated(newTask);
    } else {
      onTaskCreated(newTask);
    }
    // 清空输入框
    setTitle("");
    setDescription("");
    setStatus("待办");
    setPriority("低");
    setDueDate("");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">标题:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">描述:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">状态:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="待办">待办</option>
          <option value="进行中">进行中</option>
          <option value="已完成">已完成</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="priority">优先级:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="低">低</option>
          <option value="中">中</option>
          <option value="高">高</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">截止日期:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div className="form-buttons">
        <button type="submit" className="submit-button">
          确定
        </button>
        {id && (
          <button type="button" onClick={onCancel} className="cancel-button">
            取消修改
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;