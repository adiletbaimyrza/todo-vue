import { mount } from '@vue/test-utils'
import HeaderBar from './HeaderBar.vue'
import CoreIcon from '../CoreIcon/CoreIcon.vue'
import useToggle from '@/composables/useToggle'

jest.mock('@/composables/useToggle')

/* global jest describe beforeEach it expect */
describe('HeaderBar.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(HeaderBar)
  })

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
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
    const toggleThemeSpy = jest.spyOn(wrapper.vm, 'toggleTheme')

    const toggleDarkMock = jest.fn()
    useToggle.mockReturnValue(toggleDarkMock)

    const button = wrapper.find('button')
    await button.trigger('click')
    expect(toggleThemeSpy).toHaveBeenCalled()
    expect(toggleDarkMock).toHaveBeenCalled()
  })
})
