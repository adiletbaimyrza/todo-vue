import { ref } from 'vue'
import useToggle from './useToggle'

/* global describe it expect */
describe('useToggle', () => {
  it('should toggle the value of the ref from false to true', () => {
    const myRef = ref(false)
    const toggle = useToggle(myRef)

    toggle()
    expect(myRef.value).toBe(true)
  })

  it('should toggle the value of the ref from true to false', () => {
    const myRef = ref(true)
    const toggle = useToggle(myRef)

    toggle()
    expect(myRef.value).toBe(false)
  })

  it('should work with the default ref value (false)', () => {
    const toggle = useToggle()
    expect(toggle()).toBe(true)
    expect(toggle()).toBe(false)
  })
})
