<template>
  <div
    :class="[
      $style['bar'],
      { [$style['bar--error']]: (isInputTooLong || isInputEmpty) && isFocused },
    ]"
  >
    <CoreIcon
      :src="require('../../assets/circle.svg')"
      :class="$style['bar__icon']"
    />
    <input
      v-model="newTodoContent"
      @keyup.enter="addNewTodo"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :class="$style['bar__input']"
      type="text"
      placeholder="Ex: Buy groceries..."
      maxlength="151"
    />
    <p v-if="isInputTooLong && isFocused" :class="$style['error-message']">
      Content should not exceed 150 characters.
    </p>
    <p v-if="isInputEmpty && isFocused" :class="$style['error-message']">
      Content should not be empty.
    </p>
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
      enterPressed: false,
      isFocused: false,
    }
  },
  computed: {
    isInputTooLong() {
      return this.newTodoContent.length > 150
    },
    isInputEmpty() {
      return this.newTodoContent.length === 0 && this.enterPressed
    },
  },
  methods: {
    addNewTodo() {
      this.enterPressed = true
      const trimmedNewTodoContent = this.newTodoContent.trim()

      if (trimmedNewTodoContent === '') {
        return
      }

      if (trimmedNewTodoContent.length > 150) {
        return
      }

      const newTodo = {
        id: Date.now(),
        content: trimmedNewTodoContent,
        isCompleted: false,
      }
      this.$store.commit('add', newTodo)
      this.newTodoContent = ''
      this.enterPressed = false
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
  border: 2px solid var(--card-background-color);
  margin-bottom: 1.5em;
  box-shadow: rgb(100 100 111 / 20%) 0 7px 29px 0;
  caret-color: var(--font-color-regular);
  position: relative;

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

  &--error {
    border: 2px solid #ff3c7d;
  }
}

.error-message {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -2em;
  color: #ff007f;
  font-size: 0.875em;
  margin-bottom: 1.5em;
}
</style>
