<template>
  <div :class="$style['list']">
    <TodoItem
      v-for="(item, index) in todos"
      :key="index"
      :content="item.content"
      :isCompleted="item.isCompleted"
    />
    <FilterBar />
  </div>
</template>

<script>
import FilterBar from '../FilterBar/FilterBar.vue'
import TodoItem from '../TodoItem/TodoItem.vue'

export default {
  name: 'TodoList',
  components: {
    TodoItem,
    FilterBar,
  },
  data() {
    return {
      todos: [
        { content: 'Buy groceries', isCompleted: false },
        { content: 'Walk the dog', isCompleted: false },
        { content: 'Read a book', isCompleted: true },
        { content: 'Do laundry', isCompleted: true },
      ],
    }
  },
}
</script>

<style lang="scss" module>
.list {
  display: flex;
  flex-direction: column;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 0.4em;

  > :first-child {
    border-top-left-radius: 0.4em;
    border-top-right-radius: 0.4em;
  }

  > :last-child {
    border-bottom-left-radius: 0.4em;
    border-bottom-right-radius: 0.4em;
    border-bottom: none;
  }
}
</style>
