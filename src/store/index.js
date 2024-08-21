import { createStore } from 'vuex'
import { TodoFilter } from '@/constants'

const initialTodos = [
  { id: 1, content: 'Buy groceries', isCompleted: false },
  { id: 2, content: 'Walk the dog', isCompleted: false },
  { id: 3, content: 'Read a book', isCompleted: true },
  { id: 4, content: 'Do laundry', isCompleted: true },
]

const initialFilter = TodoFilter.ALL

export default createStore({
  state: {
    todos: initialTodos,
    currentFilter: initialFilter,
  },
  mutations: {
    add(state, todo) {
      state.todos.push(todo)
    },
    check(state, todoId) {
      const todo = state.todos.find(t => t.id === todoId)
      if (todo) {
        todo.isCompleted = !todo.isCompleted
      }
    },
    delete(state, todoId) {
      state.todos = state.todos.filter(t => t.id !== todoId)
    },
    setFilter(state, filter) {
      state.currentFilter = filter
    },
    deleteCompleted(state) {
      state.todos = state.todos.filter(t => !t.isCompleted)
    },
  },
  getters: {
    sortedTodos(state) {
      return state.todos.slice().sort((a, b) => a.isCompleted - b.isCompleted)
    },
    filteredTodos(state) {
      let filtered = []
      switch (state.currentFilter) {
        case TodoFilter.ALL:
          filtered = state.todos
          break
        case TodoFilter.ACTIVE:
          filtered = state.todos.filter(t => !t.isCompleted)
          break
        case TodoFilter.COMPLETED:
          filtered = state.todos.filter(t => t.isCompleted)
          break
        default:
          filtered = state.todos
      }
      return filtered.sort((a, b) => a.isCompleted - b.isCompleted)
    },
    activeCount(state) {
      return state.todos.filter(t => !t.isCompleted).length
    },
  },
})
