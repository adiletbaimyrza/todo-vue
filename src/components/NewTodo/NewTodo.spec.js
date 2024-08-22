import { shallowMount } from '@vue/test-utils'
import NewTodo from './NewTodo.vue'

/* global jest describe beforeEach it expect */
describe('NewTodo.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(NewTodo)
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('fires addNewTodo method on keyup.enter', async () => {
    const addNewTodoMock = jest.fn()
    wrapper.vm.addNewTodo = addNewTodoMock
    const input = wrapper.find('input')
    await input.setValue('Buy groceries')
    await input.trigger('keyup.enter')
    expect(addNewTodoMock).toHaveBeenCalled()
  })

  it('renders placeholder text correctly', () => {
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Ex: Buy groceries...')
  })
})
