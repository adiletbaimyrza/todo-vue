<template>
  <HeaderBar />
  <NewTodo />
  <TodoList />
  <FooterBar />
</template>

<script>
import HeaderBar from '../HeaderBar/HeaderBar.vue'
import NewTodo from '../NewTodo/NewTodo.vue'
import TodoList from '../TodoList/TodoList.vue'
import FooterBar from '../FooterBar/FooterBar.vue'

export default {
  name: 'App',
  components: { HeaderBar, NewTodo, TodoList, FooterBar },
}
</script>

<style lang="scss">
@import 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap';

:root {
  --app-background-color: #fff;
  --card-background-color: #fff;
  --font-color-regular: #000;
  --filter-text--hover: #000;
  --card-background-color--hover: #f1f1f1;
  --card-border-color: #e4e4e4;
}

[theme='dark'] {
  --app-background-color: #091a28;
  --card-background-color: #091a28;
  --font-color-regular: #fff;
  --filter-text--hover: #fff;
  --card-background-color--hover: #11314b;
  --card-border-color: #08263f;
}

/* css reset --- start */
*,
*::before,
*::after {
  margin: unset;
  padding: unset;
  box-sizing: border-box;
  z-index: 3;
}

button {
  border: unset;
  background: unset;
  cursor: pointer;
}

ul,
ol {
  list-style: none;
}

/* css reset --- end */

html,
body,
#app {
  width: 100vw;
  height: 100vh;
  transition:
    color 0.1s linear,
    background 0.1s linear,
    background-color 0.1s linear;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-x: hidden;
  background-color: var(--app-background-color);
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 45%;
    background-size: cover;
    background-image: linear-gradient(
        142deg,
        rgb(189 58 208 / 72%) 30%,
        rgb(153 90 194 / 52.4%) 55%,
        rgb(38 121 180 / 65.3%) 79%
      ),
      url('../../assets/mountains.jpg');
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
  }
}
</style>
