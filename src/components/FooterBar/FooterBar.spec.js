import { shallowMount } from '@vue/test-utils'
import FooterBar from './FooterBar.vue'

/* global describe it expect */
describe('FooterBar.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(FooterBar)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders the correct text', () => {
    const wrapper = shallowMount(FooterBar)
    expect(wrapper.text()).toBe('drag and drop to reorder list')
  })
})
