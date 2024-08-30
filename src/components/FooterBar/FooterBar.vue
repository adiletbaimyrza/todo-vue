<template>
  <footer :class="$style['container']" :data-testid="DataTestIds.FOOTER_BAR">
    drag and drop to reorder list
  </footer>
</template>

<script>
import { DataTestIds } from '@/constants'

export default {
  name: 'FooterBar',
  data() {
    return { DataTestIds }
  },
}
</script>

<style lang="scss" module>
.container {
  margin: 4em 0;
  color: #b1b1b1;

  &::first-letter {
    text-transform: capitalize;
  }
}
</style>
