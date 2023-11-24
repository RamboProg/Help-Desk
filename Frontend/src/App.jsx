import { useState } from "react"; // Import React and useState
import "./styles.css"; // Corrected import statement

function App() {
  const [newItem, setNewItem] = useState(""); // Corrected typo: useSatte -> useState
  const [todos, setTodos] = useState([]); // Corrected typo: settodos -> setTodos

  function handleSubmit(e) {
    e.preventDefault();

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        title: newItem,
        complete: false,
      },
    ]);

    // Reset newItem after submission
    setNewItem("");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Add
        </button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.complete} />
            <label>{todo.title}</label>
            <button className="btn btn-danger">Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
