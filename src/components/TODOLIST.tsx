import React, { useState, ChangeEvent } from 'react';

interface TODOListProps {
  todos: Array<{ id: number, text: string }>;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TODOList: React.FC<TODOListProps> = ({ todos, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditingText(event.target.value);
  };

  const handleEditClick = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSaveClick = (id: number) => {
    onEdit(id, editingText);
    setEditingId(null);
    setEditingText('');
  };

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-item">
          {editingId === todo.id ? (
            <input
              className="edit-input"
              value={editingText}
              onChange={handleEditChange}
            />
          ) : (
            <span>{todo.text}</span>
          )}
          <div className="button-group">
            {editingId === todo.id ? (
              <button className="save-button" onClick={() => handleSaveClick(todo.id)}>Save</button>
            ) : (
              <>
                <button className="edit-button" onClick={() => handleEditClick(todo.id, todo.text)}>Edit</button>
                <button className="delete-button" onClick={() => onDelete(todo.id)}>Delete</button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TODOList;
