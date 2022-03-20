<template>
  <div id="app">
    <div :class="wrapper">
      <header>
        My Personal Coasts
      </header>
      <main>
        <PaymentDisplay :list="paymentsList">

        </PaymentDisplay>
      </main>
    </div>

    <div>
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Shopping Manager App"/>-->
<!--    <my-button v-if="show" :key="1"/>-->
<!--    <my-button v-if="!show" :key="2"/>-->
<!--    <my-button text="Hello My Friend">-->
<!--      <template #append='{counter, helloFun}'>-->
<!--      Нажато {{ counter }} {{ helloFun('fsdfs') }}-->
<!--      </template>-->
<!--      Кол-во кликов-->
<!--    </my-button>-->

<!--    <my-button>-->
<!--      Нажатые кнопки-->
<!--    </my-button>-->
<!--    <button @click="show=!show">Show / Hide</button>-->
      </div> <!--Закоменченый код из урока-->
  </div>
</template>

<script>
  import PaymentDisplay from "@/components/PaymentDisplay.vue";
// import HelloWorld from './components/HelloWorld.vue'
// import MyButton from "./components/MyButton.vue";

export default {
  name: 'App',
  components: {
    PaymentDisplay
    // HelloWorld,
    // MyButton
  },
  data(){
    return {
      //show: false,
      paymentsList: []
    }
  },
  methods: {
    fetchData() {
      return [
        {
          id: '1',
          date: '28.03.2020',
          category: 'Food',
          value: 169
        },
        {
          id: '2',
          date: '24.03.2020',
          category: 'Transport',
          value: 360
        },
        {
          id: '3',
          date: '24.03.2020',
          category: 'Cafe',
          value: 532
        }
      ]
    },
  },
  created() {
    this.paymentsList = this.fetchData();
    console.log(this.paymentsList);
  }
}
</script>

<style lang="scss" scoped>
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  /*.wrapper {*/
  /*}*/
  .title {
    font-size: 30px;
  }
</style>
