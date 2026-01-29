import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addTodo, toggleTodo, deleteTodo } from '../store/slices/todosSlice'
import EmptyState from '../components/EmptyState'

type FilterType = 'all' | 'completed' | 'pending'

const TodosPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todos.todos)
  const [newTodoText, setNewTodoText] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodoText.trim()) {
      dispatch(addTodo(newTodoText.trim()))
      setNewTodoText('')
    }
  }

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id))
  }

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed
    if (filter === 'pending') return !todo.completed
    return true
  })

  return (
    <div className="page-container">
      <h1>Todos</h1>
      
      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Add Task
        </button>
      </form>

      <div className="filter-buttons">
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={filter === 'pending' ? 'active' : ''}
        >
          Pending
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <EmptyState message={todos.length === 0 ? "No tasks yet. Add one above!" : `No ${filter} tasks.`} />
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="delete-button"
                aria-label="Delete task"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TodosPage
