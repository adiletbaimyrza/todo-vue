import { shallowMount } from '@vue/test-utils'
import CoreIcon from './CoreIcon.vue'

/* global describe it expect */
describe('CoreIcon.vue', () => {
  const propsWithSizes = {
    src: 'test-icon.png',
    width: '32px',
    height: '32px',
  }
  const propsWithoutSizes = {
    src: 'test-icon.png',
  }
  it('renders correctly', () => {
    const wrapper = shallowMount(CoreIcon, {
      props: propsWithoutSizes,
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders with correct src, width, and height props', () => {
    const wrapper = shallowMount(CoreIcon, {
      props: propsWithSizes,
    })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('test-icon.png')
    expect(img.attributes('width')).toBe('32px')
    expect(img.attributes('height')).toBe('32px')
  })

  it('applies default width and height when not provided', () => {
    const wrapper = shallowMount(CoreIcon, {
      props: propsWithoutSizes,
    })
    const img = wrapper.find('img')
    expect(img.attributes('width')).toBe('24px')
    expect(img.attributes('height')).toBe('24px')
  })
})
