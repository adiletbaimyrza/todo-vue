import { ref } from 'vue'

const useToggle = (targetRef = ref(false)) => {
  if (typeof targetRef !== 'object' || !('value' in targetRef)) {
    throw new TypeError('targetRef must be a ref object')
  }
  return () => {
    targetRef.value = !targetRef.value
  }
}

export default useToggle
