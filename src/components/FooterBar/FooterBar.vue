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
  margin-top: 4em;
  color: #b1b1b1;

  &::first-letter {
    text-transform: capitalize;
  }
}
</style>
