<template>
  <img
    :class="$style['icon']"
    :src="src"
    :width="width"
    :height="height"
    alt="Icon"
  />
</template>

<script>
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
}
</script>

<style lang="scss" module>
.icon {
  display: block;
}
</style>
