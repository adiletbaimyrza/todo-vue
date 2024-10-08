<template>
  <div
    @click="checkTodo"
    :class="[$style['item'], { [$style['item--dragging']]: isDragging }]"
    draggable="true"
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @drop="onDrop"
    @dragend="onDragEnd"
    :data-testid="DataTestIds.TODO_ITEM"
    :data-completed="isCompleted"
  >
    <button
      @click.stop="checkTodo"
      :class="$style['item__button']"
      type="button"
      :data-testid="DataTestIds.CHECK"
    >
      <CoreIcon
        :src="
          isCompleted
            ? require('../../assets/circle-check.svg')
            : require('../../assets/circle.svg')
        "
      />
    </button>
    <p
      :class="[
        $style['item__content'],
        { [$style['item__content--completed']]: isCompleted },
      ]"
      :data-testid="DataTestIds.CONTENT"
    >
      {{ content }}
    </p>
    <button
      @click.stop="deleteTodo"
      :class="[$style['item__button'], $style['item__button--delete']]"
      type="button"
      :data-testid="DataTestIds.DELETE"
    >
      <CoreIcon :src="require('../../assets/xmark.svg')" />
    </button>
  </div>
</template>

<script>
import { DataTestIds } from '@/constants'
import CoreIcon from '../CoreIcon/CoreIcon.vue'

export default {
  name: 'TodoItem',
  components: {
    CoreIcon,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isDragging: false,
      DataTestIds,
    }
  },
  methods: {
    checkTodo() {
      this.$store.commit('check', this.id)
    },
    deleteTodo() {
      this.$store.commit('delete', this.id)
    },
    onDragStart() {
      this.isDragging = true
      this.$emit('dragStart', this.index)
    },
    onDragOver(event) {
      this.$emit('dragOver', event, this.index)
    },
    onDrop(event) {
      event.preventDefault()
      this.isDragging = false
      this.$emit('dropItem')
    },
    onDragEnd() {
      this.isDragging = false
    },
  },
}
</script>

<style lang="scss" module>
.item {
  display: flex;
  width: 600px;
  padding: 1em 1.5em;
  align-items: center;
  color: var(--font-color-regular);
  background-color: var(--card-background-color);
  border-bottom: 1px solid var(--card-border-color);

  &__button {
    &--delete {
      visibility: hidden;
    }
  }

  &:hover {
    background-color: var(--card-background-color--hover);
    cursor: pointer;

    .item__button--delete {
      visibility: visible;
    }
  }

  &__content {
    flex-grow: 1;
    text-align: left;
    padding: 0 1em;
    word-break: break-all;

    &--completed {
      color: #b1b1b1;
      text-decoration: line-through;
    }
  }

  &__icon {
    height: 2em;
    width: 2em;
  }

  &--dragging {
    background-color: var(--card-background-color--hover);
  }
}
</style>
