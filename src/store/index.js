import { createStore } from 'vuex'

const initialTodos = [
  { id: 1, content: 'Buy groceries', isCompleted: false },
  { id: 2, content: 'Walk the dog', isCompleted: false },
  { id: 3, content: 'Read a book', isCompleted: true },
  { id: 4, content: 'Do laundry', isCompleted: true },
]

export default createStore({
  state: {
    todos: initialTodos,
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
  },
  getters: {
    sortedTodos(state) {
      return state.todos.slice().sort((a, b) => a.isCompleted - b.isCompleted)
    },
  },
})
