<template>
  <div :class="$style['container']">
    <p :class="$style['container__count']">{{ count }} items left</p>
    <ul :class="$style['container__filters']">
      <li>
        <button
          type="button"
          :class="
            currentFilter === 'all' ? $style['container__filters--active'] : ''
          "
        >
          all
        </button>
      </li>
      <li>
        <button
          type="button"
          :class="
            currentFilter === 'active'
              ? $style['container__filters--active']
              : ''
          "
        >
          active
        </button>
      </li>
      <li>
        <button
          type="button"
          :class="
            currentFilter === 'completed'
              ? $style['container__filters--active']
              : ''
          "
        >
          completed
        </button>
      </li>
    </ul>
    <button type="button" :class="$style['container__clear']">
      clear completed
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterBar',
  props: {
    count: {
      type: Number,
      required: true,
      default: 0,
    },
    currentFilter: {
      type: String,
      required: true,
      default: 'all',
    },
  },
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  padding: 1em 1.5em;
  align-items: center;

  &__count {
    font-size: 0.9em;
    color: #b1b1b1;

    &:hover {
      cursor: default;
    }
  }

  &__filters {
    flex-grow: 1;
    display: flex;
    justify-content: center;

    li button {
      color: #b1b1b1;
      font-family: Inter, sans-serif;
      font-weight: 500;
      padding: 0 1em 0 1em;
      text-transform: capitalize;

      &:hover {
        color: #000000;
      }
    }

    &--active {
      color: #1969ff !important;
    }
  }

  &__clear {
    font-family: Inter, sans-serif;
    text-transform: capitalize;
    color: #b1b1b1;

    &:hover {
      color: #000000;
    }
  }
}
</style>
