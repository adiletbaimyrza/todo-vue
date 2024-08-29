import { mount } from '@vue/test-utils'
import CoreIcon from './CoreIcon.vue'

/* global describe it expect afterEach beforeEach */
describe('CoreIcon.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CoreIcon, {
      props: {
        src: 'test-icon.png',
      },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders with correct src, width, and height props', async () => {
    await wrapper.setProps({
      width: '32px',
      height: '32px',
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('test-icon.png')
    expect(img.attributes('width')).toBe('32px')
    expect(img.attributes('height')).toBe('32px')
  })

  it('applies default width and height when not provided', () => {
    const img = wrapper.find('img')
    expect(img.attributes('width')).toBe('24px')
    expect(img.attributes('height')).toBe('24px')
  })
})
