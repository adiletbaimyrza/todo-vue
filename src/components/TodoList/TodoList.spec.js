import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import TodoList from './TodoList.vue'
import TodoItem from '../TodoItem/TodoItem.vue'
import FilterBar from '../FilterBar/FilterBar.vue'

/* global describe beforeEach expect it jest */
describe('TodoList.vue', () => {
  let store
  let state
  let getters
  let wrapper
  let commitSpy

  beforeEach(() => {
    state = {
      todos: [
        { id: 1, content: 'Task 1', isCompleted: false },
        { id: 2, content: 'Task 2', isCompleted: false },
        { id: 3, content: 'Task 3', isCompleted: false },
        { id: 4, content: 'Task 4', isCompleted: false },
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

    commitSpy = jest.spyOn(store, 'commit')
  })

  it('renders correctly with initial state', () => {
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

  it('should reorder items on drag and drop', async () => {
    await wrapper.vm.onDragStart(0)
    expect(wrapper.vm.draggedItemIndex).toBe(0)

    const event = { preventDefault: jest.fn() }
    await wrapper.vm.onDragOver(event, 1)
    expect(wrapper.vm.filteredTodos[0].id).toBe(2)
    expect(wrapper.vm.filteredTodos[1].id).toBe(1)
    expect(wrapper.vm.filteredTodos[2].id).toBe(3)

    await wrapper.vm.onDrop()
    expect(wrapper.vm.draggedItemIndex).toBe(null)
    expect(commitSpy).toHaveBeenCalledWith('updateOrder', [
      { id: 2, content: 'Task 2', isCompleted: false },
      { id: 1, content: 'Task 1', isCompleted: false },
      { id: 3, content: 'Task 3', isCompleted: false },
      { id: 4, content: 'Task 4', isCompleted: false },
    ])
  })
})
