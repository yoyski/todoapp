import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // ----------------- State Management -----------------
  const [todoList, setTodoList] = useState([]);       // Stores all todos
  const [title, setTitle] = useState("");             // Stores new todo input
  const [editingId, setEditingId] = useState(null);   // Tracks which todo is being edited
  const [editTitle, setEditTitle] = useState("");     // Stores text for editing

  // ----------------- Fetch Todos -----------------
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/TodoList/");
      setTodoList(res.data);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  };

  useEffect(() => {
    fetchTodos(); // Load todos on component mount
  }, []);

  // ----------------- Add Todo -----------------
  const addTodo = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      const res = await axios.post("http://localhost:5000/TodoList/", { title });
      setTodoList([...todoList, res.data]);
      setTitle("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // ----------------- Delete Todo -----------------
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/TodoList/${id}`);
      setTodoList(todoList.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // ----------------- Edit Todo -----------------
  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleSave = async (id) => {
    await axios.put(`http://localhost:5000/TodoList/${id}`, { title: editTitle });
    setEditingId(null);
    setEditTitle("");
    fetchTodos();
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
  };

  // ----------------- UI -----------------
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Todo List</h1>

      {/* Add Todo Form */}
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

      {/* Todo List */}
      <ul className="w-full max-w-md space-y-3">
        {todoList.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            {editingId === todo.id ? (
              // Edit Mode
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
              // Normal Mode
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