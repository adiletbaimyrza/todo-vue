<template>
  <header :class="$style['bar']" :data-testid="DataTestIds.HEADER_BAR">
    <h1 :class="$style['bar__heading']" :data-testid="DataTestIds.HEADING">
      todo
    </h1>
    <button
      @click="toggleTheme"
      type="button"
      :class="$style['bar__button']"
      :data-testid="DataTestIds.TOGGLE"
    >
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
import useDark from '@/composables/useDark'
import useToggle from '@/composables/useToggle'
import { DataTestIds } from '@/constants'

const isDark = useDark()

export default {
  name: 'HeaderBar',
  components: {
    CoreIcon,
  },
  data() {
    return {
      isIconActive: false,
      DataTestIds,
    }
  },
  computed: {
    iconSrc() {
      return isDark.value
        ? require('../../assets/sun.svg')
        : require('../../assets/moon.svg')
    },
  },
  methods: {
    toggleTheme() {
      const toggleDark = useToggle(isDark)

      this.isIconActive = true
      setTimeout(() => {
        this.isIconActive = false
      }, 100)

      toggleDark()
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
    color: #fff;
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
