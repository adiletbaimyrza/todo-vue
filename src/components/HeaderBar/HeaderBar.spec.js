import { shallowMount } from '@vue/test-utils'
import HeaderBar from './HeaderBar.vue'
import CoreIcon from '../CoreIcon/CoreIcon.vue'

/* global jest describe beforeEach it expect */
describe('Header.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(HeaderBar)
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders todo text correctly', () => {
    const text = 'todo'
    const renderedText = wrapper.text()
    expect(renderedText).toContain(text)
  })

  it('renders CoreIcon correctly', () => {
    const coreIcon = wrapper.findComponent(CoreIcon)
    expect(coreIcon.exists()).toBe(true)
  })

  it('fires toggleTheme method when button is clicked', async () => {
    const toggleThemeMock = jest.fn()
    wrapper.vm.toggleTheme = toggleThemeMock
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(toggleThemeMock).toHaveBeenCalled()
  })
})
