import { shallowMount } from '@vue/test-utils'
import App from './App.vue'
import HeaderBar from '../HeaderBar/HeaderBar.vue'
import NewTodo from '../NewTodo/NewTodo.vue'
import TodoList from '../TodoList/TodoList.vue'
import FooterBar from '../FooterBar/FooterBar.vue'

/* global describe it expect beforeEach */
describe('App.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(App)
  })

  it('renders the App correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders the HeaderBar component', () => {
    const headerBar = wrapper.findComponent(HeaderBar)
    expect(headerBar.exists()).toBe(true)
  })

  it('renders the NewTodo component', () => {
    const newTodo = wrapper.findComponent(NewTodo)
    expect(newTodo.exists()).toBe(true)
  })

  it('renders the TodoList component', () => {
    const todoList = wrapper.findComponent(TodoList)
    expect(todoList.exists()).toBe(true)
  })

  it('renders the FooterBar component', () => {
    const footerBar = wrapper.findComponent(FooterBar)
    expect(footerBar.exists()).toBe(true)
  })
})
