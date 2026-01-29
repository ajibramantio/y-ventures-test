import todosReducer, { addTodo, toggleTodo, deleteTodo, Todo } from '../todosSlice'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('todosSlice', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('should return the initial state', () => {
    expect(todosReducer(undefined, { type: 'unknown' })).toEqual({
      todos: [],
    })
  })

  it('should handle adding a todo', () => {
    const previousState = { todos: [] }
    const action = addTodo('Test todo')
    const newState = todosReducer(previousState, action)

    expect(newState.todos).toHaveLength(1)
    expect(newState.todos[0].text).toBe('Test todo')
    expect(newState.todos[0].completed).toBe(false)
    expect(newState.todos[0].id).toBeDefined()
  })

  it('should handle toggling a todo', () => {
    const todo: Todo = {
      id: '1',
      text: 'Test todo',
      completed: false,
      createdAt: Date.now(),
    }
    const previousState = { todos: [todo] }
    const action = toggleTodo('1')
    const newState = todosReducer(previousState, action)

    expect(newState.todos[0].completed).toBe(true)
  })

  it('should handle deleting a todo', () => {
    const todo1: Todo = {
      id: '1',
      text: 'Test todo 1',
      completed: false,
      createdAt: Date.now(),
    }
    const todo2: Todo = {
      id: '2',
      text: 'Test todo 2',
      completed: false,
      createdAt: Date.now(),
    }
    const previousState = { todos: [todo1, todo2] }
    const action = deleteTodo('1')
    const newState = todosReducer(previousState, action)

    expect(newState.todos).toHaveLength(1)
    expect(newState.todos[0].id).toBe('2')
  })

  it('should persist todos to localStorage when adding', () => {
    const previousState = { todos: [] }
    const action = addTodo('Test todo')
    todosReducer(previousState, action)

    const stored = localStorageMock.getItem('todos')
    expect(stored).toBeTruthy()
    if (stored) {
      const parsed = JSON.parse(stored)
      expect(parsed).toHaveLength(1)
      expect(parsed[0].text).toBe('Test todo')
    }
  })
})
