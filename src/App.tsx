import React, { useState, ChangeEvent } from 'react';
import Input from './components/Input';
import Button from './components/Button';
import TODOList from './components/TODOLIST';
import './App.css';

const App: React.FC = () => {
  const [todoText, setTodoText] = useState<string>('');
  const [todos, setTodos] = useState<Array<{ id: number, text: string }>>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const handleAddTodo = () => {
    if (todoText.trim()) {
      setTodos([...todos, { id: Date.now(), text: todoText }]);
      setTodoText('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  return (
    <div className="app">
      <h1>TODO App</h1>
      <div className="input-container">
        <Input
          value={todoText}
          onChange={handleInputChange}
          placeholder="Enter a new TODO"
        />
        <Button
          onClick={handleAddTodo}
          text="Add"
        />
        <Button
          onClick={handleDeleteAll}
          text="Delete All"
          className="delete-all-button"
        />
      </div>
      <TODOList todos={todos} onDelete={handleDeleteTodo} onEdit={handleEditTodo} />
    </div>
  );
};

export default App;
