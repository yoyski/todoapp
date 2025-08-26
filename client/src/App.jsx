import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // ✅ Use your deployed backend URL
  const API_BASE = "https://todoapp-27hq.onrender.com";

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_BASE}/TodoList/`);
      setTodoList(res.data);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      const res = await axios.post(`${API_BASE}/TodoList/`, { title });
      setTodoList([...todoList, res.data]);
      setTitle("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/TodoList/${id}`);
      setTodoList(todoList.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleSave = async (id) => {
    await axios.put(`${API_BASE}/TodoList/${id}`, { title: editTitle });
    setEditingId(null);
    setEditTitle("");
    fetchTodos();
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Todo List</h1>

      <form onSubmit={addTodo} className="flex gap-2 mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Add a new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      <ul className="w-full max-w-md space-y-3">
        {todoList.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            {editingId === todo.id ? (
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  onClick={() => handleSave(todo.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <span className="text-gray-800">{todo.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
