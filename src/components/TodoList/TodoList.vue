<template>
  <div :class="$style['list']">
    <TodoItem
      v-for="(item, index) in filteredTodos"
      :key="item.id"
      :id="item.id"
      :index="index"
      :content="item.content"
      :isCompleted="item.isCompleted"
      @dragStart="onDragStart"
      @dragOver="onDragOver"
      @dropItem="onDrop"
    />
    <FilterBar />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FilterBar from '../FilterBar/FilterBar.vue'
import TodoItem from '../TodoItem/TodoItem.vue'

export default {
  name: 'TodoList',
  components: {
    TodoItem,
    FilterBar,
  },
  computed: {
    ...mapGetters(['filteredTodos']),
  },
  data() {
    return {
      draggedItemIndex: null,
    }
  },
  methods: {
    onDragStart(index) {
      this.draggedItemIndex = index
    },
    onDragOver(event, index) {
      event.preventDefault()

      if (index !== this.draggedItemIndex) {
        const draggedItem = this.filteredTodos[this.draggedItemIndex]
        this.filteredTodos.splice(this.draggedItemIndex, 1)
        this.filteredTodos.splice(index, 0, draggedItem)
        this.draggedItemIndex = index
      }
    },
    onDrop() {
      this.updateOrder()
      this.draggedItemIndex = null
    },
    updateOrder() {
      this.$store.commit('updateOrder', this.filteredTodos)
    },
  },
}
</script>

<style lang="scss" module>
.list {
  display: flex;
  flex-direction: column;
  box-shadow: rgb(100 100 111 / 20%) 0 7px 29px 0;
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
