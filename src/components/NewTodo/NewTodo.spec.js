import { mount } from '@vue/test-utils'
import NewTodo from './NewTodo.vue'
import { createStore } from 'vuex'

/* global jest describe beforeEach afterEach it expect */
describe('NewTodo.vue', () => {
  let wrapper
  let addNewTodoSpy
  let commitSpy

  beforeEach(() => {
    const store = createStore()

    commitSpy = jest.spyOn(store, 'commit')

    wrapper = mount(NewTodo, {
      global: {
        plugins: [store],
      },
    })

    addNewTodoSpy = jest.spyOn(wrapper.vm, 'addNewTodo')
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('fires addNewTodo and calls commit with correct input', async () => {
    const input = wrapper.find('input')
    await input.setValue('Buy groceries')
    await input.trigger('keyup.enter')
    expect(addNewTodoSpy).toHaveBeenCalled()
    expect(commitSpy).toHaveBeenCalledWith('add', expect.anything())
  })

  it('fires addNewTodo and does not call commit when input is empty', async () => {
    const input = wrapper.find('input')
    await input.setValue('')
    await input.trigger('keyup.enter')
    expect(addNewTodoSpy).toHaveBeenCalled()
    expect(commitSpy).not.toHaveBeenCalled()
  })

  it('fires addNewTodo and does not call commit when input is too long', async () => {
    const input = wrapper.find('input')
    const longText = 'a'.repeat(151)
    await input.setValue(longText)
    await input.trigger('keyup.enter')
    expect(addNewTodoSpy).toHaveBeenCalled()
    expect(commitSpy).not.toHaveBeenCalled()
  })

  it('renders placeholder text correctly', () => {
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Enter a new task...')
  })

  it('shows error message when input is too long', async () => {
    const input = wrapper.find('input')
    await input.setValue('a'.repeat(151))
    await input.trigger('focus')
    expect(wrapper.find('.error-message').text()).toBe(
      'Content should not exceed 150 characters.'
    )
    expect(wrapper.classes()).toContain('bar--error')
  })

  it('shows error message when input is empty', async () => {
    const input = wrapper.find('input')
    await input.setValue('')
    await input.trigger('focus')
    await input.trigger('keyup.enter')
    expect(wrapper.find('.error-message').text()).toBe(
      'Content should not be empty.'
    )
    expect(wrapper.classes()).toContain('bar--error')
  })

  it('does not show error message when input is too long and not focused', async () => {
    const input = wrapper.find('input')
    await input.setValue('a'.repeat(151))
    expect(wrapper.find('.error-message').exists()).toBe(false)
    expect(wrapper.classes()).not.toContain('bar--error')
  })

  it('does not show error message when input is empty and not focused', async () => {
    const input = wrapper.find('input')
    await input.setValue('')
    expect(wrapper.find('.error-message').exists()).toBe(false)
    expect(wrapper.classes()).not.toContain('bar--error')
  })
})
