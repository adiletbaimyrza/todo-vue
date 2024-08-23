import { createStore } from 'vuex'
import { TodoFilter } from '@/constants'
import { syncTodosToLocalStorage } from './plugins'

const loadTodos = () => {
  const todos = localStorage.getItem('todos')
  return todos
    ? JSON.parse(todos)
    : [
        { id: 1, content: 'Buy groceries', isCompleted: false },
        { id: 2, content: 'Walk the dog', isCompleted: false },
        { id: 3, content: 'Read a book', isCompleted: true },
        { id: 4, content: 'Do laundry', isCompleted: true },
      ]
}

const initialFilter = TodoFilter.ALL

export const storeConfig = {
  state: {
    todos: loadTodos(),
    currentFilter: initialFilter,
  },
  mutations: {
    add(state, todo) {
      state.todos.unshift(todo)
    },
    check(state, todoId) {
      const todo = state.todos.find(todo => todo.id === todoId)
      if (todo) {
        todo.isCompleted = !todo.isCompleted
      }
    },
    delete(state, todoId) {
      state.todos = state.todos.filter(todo => todo.id !== todoId)
    },
    setFilter(state, filter) {
      state.currentFilter = filter
    },
    deleteCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.isCompleted)
    },
    updateOrder(state, newOrderTodos) {
      state.todos = newOrderTodos
    },
  },
  getters: {
    sortedTodos(state) {
      return state.todos
        .slice()
        .sort((todoA, todoB) => todoA.isCompleted - todoB.isCompleted)
    },
    filteredTodos(state) {
      let filtered = []
      switch (state.currentFilter) {
        case TodoFilter.ALL:
          filtered = state.todos
          break
        case TodoFilter.ACTIVE:
          filtered = state.todos.filter(todo => !todo.isCompleted)
          break
        case TodoFilter.COMPLETED:
          filtered = state.todos.filter(todo => todo.isCompleted)
          break
        default:
          filtered = state.todos
      }
      return filtered.sort(
        (todoA, todoB) => todoA.isCompleted - todoB.isCompleted
      )
    },
    activeCount(state) {
      return state.todos.filter(todo => !todo.isCompleted).length
    },
  },
  plugins: [syncTodosToLocalStorage],
}

export default createStore(storeConfig)
