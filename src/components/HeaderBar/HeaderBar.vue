<template>
  <header :class="$style['bar']">
    <h1 :class="$style['bar__heading']">todo</h1>
    <button type="button" :class="$style['bar__button']">
      <CoreIcon
        :src="require('../../assets/moon.svg')"
        height="32px"
        width="32px"
      />
    </button>
  </header>
</template>

<script>
import CoreIcon from '../CoreIcon/CoreIcon.vue'

export default {
  name: 'HeaderBar',
  components: {
    CoreIcon,
  },
}
</script>

<style lang="scss" module>
.bar {
  display: flex;
  justify-content: space-between;
  width: 600px;
  margin-bottom: 4em;
  margin-top: 16vh;

  &__heading {
    text-transform: uppercase;
    color: #ffffff;
    letter-spacing: 0.5em;
    cursor: default;
  }
}
</style>
