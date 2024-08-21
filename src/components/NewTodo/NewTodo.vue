<template>
  <div :class="$style['bar']">
    <CoreIcon
      :src="require('../../assets/circle.svg')"
      :class="$style['bar__icon']"
    />
    <input
      v-model="newTodoContent"
      @keyup.enter="addNewTodo"
      :class="$style['bar__input']"
      type="text"
      placeholder="Ex: Buy groceries..."
    />
  </div>
</template>

<script>
import CoreIcon from '../CoreIcon/CoreIcon.vue'

export default {
  name: 'NewTodo',
  components: { CoreIcon },
  data() {
    return {
      newTodoContent: '',
    }
  },
  methods: {
    addNewTodo() {
      if (this.newTodoContent.trim() !== '') {
        const newTodo = {
          id: Date.now(),
          content: this.newTodoContent,
          isCompleted: false,
        }
        this.$store.commit('add', newTodo)
        this.newTodoContent = ''
      }
    },
  },
}
</script>

<style lang="scss" module>
.bar {
  display: flex;
  width: 600px;
  background-color: var(--card-background-color);
  padding: 1em 1.5em;
  border-radius: 0.4em;
  margin-bottom: 1.5em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  caret-color: var(--font-color-regular);

  &__icon {
    margin-right: 1em;
  }

  &__input {
    flex-grow: 1;
    outline: none;
    border: none;
    font-size: 1em;
    color: var(--font-color-regular);
    background-color: var(--card-background-color);

    &::placeholder {
      color: #b1b1b1;
    }
  }
}
</style>
