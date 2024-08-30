<template>
  <img
    :class="$style['icon']"
    :src="src"
    :width="width"
    :height="height"
    alt="Icon"
    :data-testid="DataTestIds.CORE_ICON"
  />
</template>

<script>
import { DataTestIds } from '@/constants'

export default {
  name: 'CoreIcon',
  props: {
    src: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '24px',
    },
    height: {
      type: String,
      default: '24px',
    },
  },
  data() {
    return {
      DataTestIds,
    }
  },
}
</script>

<style lang="scss" module>
.icon {
  display: block;
}
</style>
