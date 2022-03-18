<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Shopping Manager App"/>
<!--    <my-button v-if="show" :key="1"/>-->
<!--    <my-button v-if="!show" :key="2"/>-->
    <my-button>
      <template #append>
      +
      </template>
      Кол-во кликов
    </my-button>

    <my-button>
      Нажатые кнопки
    </my-button>
<!--    <button @click="show=!show">Show / Hide</button>-->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MyButton from "./components/MyButton.vue";

export default {
  name: 'App',
  components: {
    HelloWorld,
    MyButton
  },
  data(){
    return {
      show: false
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
