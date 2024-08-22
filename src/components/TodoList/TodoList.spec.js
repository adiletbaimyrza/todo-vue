import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import TodoList from './TodoList.vue'
import TodoItem from '../TodoItem/TodoItem.vue'
import FilterBar from '../FilterBar/FilterBar.vue'

/* global describe beforeEach expect it */
describe('TodoList.vue', () => {
  let store
  let state
  let getters
  let wrapper

  beforeEach(() => {
    state = {
      todos: [
        { id: 1, content: 'Task 1', isCompleted: false },
        { id: 2, content: 'Task 2', isCompleted: true },
      ],
    }

    getters = {
      filteredTodos: () => state.todos,
    }

    store = createStore({
      state,
      getters,
    })

    wrapper = shallowMount(TodoList, {
      global: {
        plugins: [store],
      },
    })
  })

  it('renders correctly with initial state', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders the correct number of TodoItem components', () => {
    const todoItems = wrapper.findAllComponents(TodoItem)
    expect(todoItems.length).toBe(state.todos.length)
  })

  it('passes the correct props to TodoItem components', () => {
    const todoItems = wrapper.findAllComponents(TodoItem)
    todoItems.forEach((item, index) => {
      expect(item.props().id).toBe(state.todos[index].id)
      expect(item.props().content).toBe(state.todos[index].content)
      expect(item.props().isCompleted).toBe(state.todos[index].isCompleted)
    })
  })

  it('renders the FilterBar component', () => {
    const filterBar = wrapper.findComponent(FilterBar)
    expect(filterBar.exists()).toBe(true)
  })
})
