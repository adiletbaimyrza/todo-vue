import useDark from '@/composables/useDark'
import { nextTick } from 'vue'
import { Theme } from '@/constants'

/* global describe beforeEach afterEach it expect jest */
describe('useDark', () => {
  let matchMediaMock
  let setItemMock
  let getItemMock

  beforeEach(() => {
    matchMediaMock = jest.fn().mockImplementation(query => ({
      matches: query.includes(Theme.DARK),
    }))
    window.matchMedia = matchMediaMock

    setItemMock = jest.fn()
    getItemMock = jest.fn()
    Storage.prototype.setItem = setItemMock
    Storage.prototype.getItem = getItemMock
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set isDark to true if localStorage has dark theme', () => {
    getItemMock.mockReturnValue(Theme.DARK)
    const isDark = useDark()
    expect(isDark.value).toBe(true)
  })

  it('should set isDark to false if localStorage has light theme', () => {
    getItemMock.mockReturnValue(Theme.LIGHT)
    const isDark = useDark()
    expect(isDark.value).toBe(false)
  })

  it('should set isDark based on matchMedia if localStorage is empty', () => {
    getItemMock.mockReturnValue(null)
    const isDark = useDark()
    expect(isDark.value).toBe(true)
  })

  it('should update localStorage and document attribute when isDark changes', async () => {
    getItemMock.mockReturnValue(null)
    const isDark = useDark()
    isDark.value = false
    await nextTick()
    expect(setItemMock).toHaveBeenCalledWith(Theme.TO_STRING, Theme.LIGHT)
    expect(document.documentElement.getAttribute(Theme.TO_STRING)).toBe(null)

    isDark.value = true
    await nextTick()
    expect(setItemMock).toHaveBeenCalledWith(Theme.TO_STRING, Theme.DARK)
    expect(document.documentElement.getAttribute(Theme.TO_STRING)).toBe(
      Theme.DARK
    )
  })
})
