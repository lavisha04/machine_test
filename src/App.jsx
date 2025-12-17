import { useState } from "react";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  
  //create and update todo list
  const handleAddTodo = () => {
    if (!todo.trim()) return;

    if (editId !== null) {
      const updatedTodos = todos.map((item) =>
        item.id === editId ? { ...item, text: todo } : item
      );
      setTodos(updatedTodos);
      setEditId(null);
    } 
    else {
      setTodos([...todos, 
        { id: Date.now(), 
          text: todo }
        ]);
    }
    setTodo("");
  };

 //delete todo list
  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };
 
  //edit todo list
  const handleEdit = (item) => {
    setTodo(item.text);
    setEditId(item.id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-300 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
         Simple Todo List
        </h2>

        <div className="flex gap-2 mb-4">
          <input
           className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            placeholder="Enter your todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            
          />
          <button
            onClick={handleAddTodo}
            className={`px-4 py-2 rounded-xl font-medium text-white transition ${
              editId ? "bg-green-500 hover:bg-green-600" : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-xl"
            >
              <span className="text-gray-800">
                {item.text}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-sm px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-sm px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No todos yet </p>
        )}
      </div>
    </div>
  );
}

