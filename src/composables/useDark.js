import { Theme } from '@/constants'
import { ref, watchEffect } from 'vue'

const useDark = () => {
  const isDark = ref(false)

  const savedPreference = localStorage.getItem(Theme.TO_STRING)
  if (savedPreference) {
    isDark.value = savedPreference === Theme.DARK
  } else {
    isDark.value =
      window.matchMedia &&
      window.matchMedia(`(prefers-color-scheme: ${Theme.DARK})`).matches
  }

  watchEffect(() => {
    if (isDark.value) {
      document.documentElement.setAttribute(Theme.TO_STRING, Theme.DARK)
      localStorage.setItem(Theme.TO_STRING, Theme.DARK)
    } else {
      document.documentElement.removeAttribute(Theme.TO_STRING)
      localStorage.setItem(Theme.TO_STRING, Theme.LIGHT)
    }
  })

  return isDark
}
export default useDark
