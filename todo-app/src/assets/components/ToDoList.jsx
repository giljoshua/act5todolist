import { useState, useEffect } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
  };

  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editedTask;
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <button className="dark-mode-toggle" onClick={toggleDarkMode} title="Toggle Dark Mode">
        {darkMode ? "☀️" : "🌙"}
      </button>
      
      <div className="todo-header">
        <h2>To-Do List</h2>
        <div className="todo-input-group">
          <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        
        <div className="filter-buttons">
          <button 
            onClick={() => setFilter("all")}
            style={{opacity: filter === "all" ? 1 : 0.7}}
          >
            All
          </button>
          <button 
            onClick={() => setFilter("completed")}
            style={{opacity: filter === "completed" ? 1 : 0.7}}
          >
            Completed
          </button>
          <button 
            onClick={() => setFilter("pending")}
            style={{opacity: filter === "pending" ? 1 : 0.7}}
          >
            Pending
          </button>
        </div>
      </div>
      
      <ul className="todo-container">
        {filteredTasks.map((t, index) => {
          const actualIndex = tasks.findIndex(task => task === t);
          return (
            <li key={index} className={t.completed ? "completed" : ""}>
              {editingIndex === actualIndex ? (
                <div className="edit-input-group">
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    autoFocus
                  />
                  <button onClick={() => saveEdit(actualIndex)}>Save</button>
                </div>
              ) : (
                <>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggleComplete(actualIndex)}
                    />
                    <span className="task-text">{t.text}</span>
                  </div>
                  <div className="task-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => startEditing(actualIndex)}
                    >
                      Edit
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => removeTask(actualIndex)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          );
        })}
        {filteredTasks.length === 0 && (
          <p style={{textAlign: 'center', color: '#888'}}>
            No {filter === "all" ? "" : filter} tasks found
          </p>
        )}
      </ul>
    </div>
  );
}