<template>
  <header :class="$style['bar']">
    <h1 :class="$style['bar__heading']">todo</h1>
    <button @click="toggleTheme" type="button" :class="$style['bar__button']">
      <CoreIcon
        :src="iconSrc"
        height="32px"
        width="32px"
        :class="[
          $style['bar__button__icon'],
          { [$style['bar__button__icon--active']]: isIconActive },
        ]"
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
  data() {
    return {
      iconSrc: this.getIconSrc(),
      isIconActive: false,
    }
  },
  methods: {
    toggleTheme() {
      this.isIconActive = true
      setTimeout(() => {
        this.isIconActive = false
      }, 100)
      const html = document.documentElement
      if (html.getAttribute('theme') === 'dark') {
        html.removeAttribute('theme')
      } else {
        html.setAttribute('theme', 'dark')
      }
      this.iconSrc = this.getIconSrc()
    },
    getIconSrc() {
      return document.documentElement.getAttribute('theme') === 'dark'
        ? require('../../assets/sun.svg')
        : require('../../assets/moon.svg')
    },
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

  &__button__icon {
    transition: transform 0.3s ease-in-out;

    &--active,
    &--leave-active {
      transform: scale(1.5);
    }
  }
}
</style>
