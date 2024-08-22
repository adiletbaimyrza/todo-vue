import { createStore } from 'vuex'
import { TodoFilter } from '@/constants'
import { storeConfig } from './index'

/* global describe beforeEach it expect */
describe('Vuex Store', () => {
  let store

  const initialTodos = [
    { id: 1, content: 'Buy groceries', isCompleted: false },
    { id: 2, content: 'Walk the dog', isCompleted: false },
    { id: 3, content: 'Read a book', isCompleted: true },
    { id: 4, content: 'Do laundry', isCompleted: true },
  ]

  beforeEach(() => {
    store = createStore(storeConfig)
  })

  it('initial state', () => {
    expect(store.state.todos).toEqual(initialTodos)
    expect(store.state.currentFilter).toBe(TodoFilter.ALL)
  })

  it('add mutation', () => {
    const newTodo = { id: 5, content: 'Write tests', isCompleted: false }
    store.commit('add', newTodo)
    expect(store.state.todos).toContainEqual(newTodo)
  })

  it('check mutation', () => {
    store.commit('check', 1)
    expect(store.state.todos.find(todo => todo.id === 1).isCompleted).toBe(true)
    store.commit('check', 1)
    expect(store.state.todos.find(todo => todo.id === 1).isCompleted).toBe(
      false
    )
  })

  it('delete mutation', () => {
    store.commit('delete', 1)
    expect(store.state.todos.find(todo => todo.id === 1)).toBeUndefined()
  })

  it('setFilter mutation', () => {
    store.commit('setFilter', TodoFilter.ACTIVE)
    expect(store.state.currentFilter).toBe(TodoFilter.ACTIVE)
  })

  it('deleteCompleted mutation', () => {
    store.commit('deleteCompleted')
    expect(store.state.todos.every(todo => !todo.isCompleted)).toBe(true)
  })

  it('filteredTodos getter', () => {
    store.commit('setFilter', TodoFilter.ACTIVE)
    let filteredTodos = store.getters.filteredTodos
    expect(filteredTodos.every(todo => !todo.isCompleted)).toBe(true)

    store.commit('setFilter', TodoFilter.COMPLETED)
    filteredTodos = store.getters.filteredTodos
    expect(filteredTodos.every(todo => todo.isCompleted)).toBe(true)

    store.commit('setFilter', TodoFilter.ALL)
    filteredTodos = store.getters.filteredTodos
    expect(filteredTodos.length).toBe(store.state.todos.length)
  })

  it('activeCount getter', () => {
    const activeCount = store.getters.activeCount
    expect(activeCount).toBe(
      store.state.todos.filter(todo => !todo.isCompleted).length
    )
  })
})
