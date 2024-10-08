import { shallowMount } from '@vue/test-utils'
import TodoItem from './TodoItem.vue'

/* global jest describe it expect */
describe('TodoItem.vue', () => {
  const todoPropsNotCompleted = {
    id: 1,
    content: 'Test Todo',
    isCompleted: false,
  }
  const todoPropsCompleted = {
    id: 1,
    content: 'Test Todo',
    isCompleted: true,
  }

  it('renders correctly with required props', () => {
    const wrapper = shallowMount(TodoItem, {
      props: todoPropsNotCompleted,
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders todo content correctly', () => {
    const wrapper = shallowMount(TodoItem, {
      props: todoPropsNotCompleted,
    })
    const content = wrapper.find('p')
    expect(content.text()).toBe('Test Todo')
  })

  it('calls checkTodo method when check button is clicked', async () => {
    const wrapper = shallowMount(TodoItem, {
      props: todoPropsNotCompleted,
    })
    const checkTodoMock = jest.fn()
    wrapper.vm.checkTodo = checkTodoMock
    const checkButton = wrapper.find('button')
    await checkButton.trigger('click')
    expect(checkTodoMock).toHaveBeenCalled()
  })

  it('calls deleteTodo method when delete button is clicked', async () => {
    const wrapper = shallowMount(TodoItem, {
      props: todoPropsNotCompleted,
    })
    const deleteTodoMock = jest.fn()
    wrapper.vm.deleteTodo = deleteTodoMock
    const deleteButton = wrapper.findAll('button').at(1)
    await deleteButton.trigger('click')
    expect(deleteTodoMock).toHaveBeenCalled()
  })

  it("applies 'item__content--completed' class if isCompleted === true", () => {
    const wrapper = shallowMount(TodoItem, {
      props: todoPropsCompleted,
    })
    const content = wrapper.find('p')
    expect(content.classes()).toContain(
      wrapper.vm.$style['item__content--completed']
    )
  })
})
