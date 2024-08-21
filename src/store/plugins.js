export const syncTodosToLocalStorage = store => {
  store.subscribe((_, state) => {
    localStorage.setItem('todos', JSON.stringify(state.todos))
  })
}
