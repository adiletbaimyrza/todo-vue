<template>
  <footer :class="$style['container']">drag and drop to reorder list</footer>
</template>

<script>
export default {
  name: 'FooterBar',
}
</script>

<style lang="scss" module>
.container {
  margin: 4em 0 4em 0;
  color: #b1b1b1;

  &::first-letter {
    text-transform: capitalize;
  }
}
</style>
