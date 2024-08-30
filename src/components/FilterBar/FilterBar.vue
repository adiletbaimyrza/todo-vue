<template>
  <div :class="$style['container']" :data-testid="DataTestIds.FILTER_BAR">
    <p
      :class="$style['container__count']"
      :data-testid="DataTestIds.ACTIVE_COUNT"
    >
      {{ activeCount }} items left
    </p>
    <ul
      :class="$style['container__filters']"
      :data-testid="DataTestIds.FILTERS"
    >
      <li>
        <button
          @click="setFilter(TodoFilter.ALL)"
          type="button"
          :class="{
            [$style['container__filters--active']]:
              currentFilter === TodoFilter.ALL,
          }"
          :data-testid="DataTestIds.FILTER_ALL"
        >
          all
        </button>
      </li>
      <li>
        <button
          @click="setFilter(TodoFilter.ACTIVE)"
          type="button"
          :class="{
            [$style['container__filters--active']]:
              currentFilter === TodoFilter.ACTIVE,
          }"
          :data-testid="DataTestIds.FILTER_ACTIVE"
        >
          active
        </button>
      </li>
      <li>
        <button
          @click="setFilter(TodoFilter.COMPLETED)"
          type="button"
          :class="{
            [$style['container__filters--active']]:
              currentFilter === TodoFilter.COMPLETED,
          }"
          :data-testid="DataTestIds.FILTER_COMPLETED"
        >
          completed
        </button>
      </li>
    </ul>
    <button
      @click="deleteCompleted"
      type="button"
      :class="$style['container__clear']"
      :data-testid="DataTestIds.CLEAR_COMPLETED"
    >
      clear completed
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { TodoFilter, DataTestIds } from '@/constants'

export default {
  name: 'FilterBar',
  computed: {
    ...mapState(['currentFilter']),
    ...mapGetters(['activeCount']),
  },
  methods: {
    ...mapMutations(['setFilter', 'deleteCompleted']),
  },
  data() {
    return {
      TodoFilter,
      DataTestIds,
    }
  },
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  padding: 1em 1.5em;
  align-items: center;
  width: 600px;
  background-color: var(--card-background-color);

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
      padding: 0 1em;
      text-transform: capitalize;

      &:hover {
        color: var(--filter-text--hover);
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
      color: var(--filter-text--hover);
    }
  }
}
</style>
