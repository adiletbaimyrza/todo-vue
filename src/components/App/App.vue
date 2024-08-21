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
:root {
  --app-background-color: #ffffff;
  --card-background-color: #ffffff;
  --font-color-regular: #000000;
  --filter-text--hover: #000000;
  --card-background-color--hover: #f1f1f1;
  --card-border-color: #e4e4e4;
}

[theme='dark'] {
  --app-background-color: #091a28;
  --card-background-color: #091a28;
  --font-color-regular: #ffffff;
  --filter-text--hover: #ffffff;
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

@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

html,
body,
#app {
  width: 100vw;
  height: 100vh;
  transition: color 0.1s linear, background 0.1s linear,
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
        rgba(189, 58, 208, 0.7198529069831057) 30%,
        rgba(153, 90, 194, 0.5237744756105567) 55%,
        rgba(38, 121, 180, 0.6526260162268032) 79%
      ),
      url('../../assets/mountains.jpg');
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
  }
}
</style>
