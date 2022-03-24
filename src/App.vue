<template>
    <div id="app">
        <div :class="wrapper">
            <header>
                <div class="title">My Personal Coasts</div>
                <div>My total coast {{ getFPV }}</div>
            </header>
            <main>
                <!--        <video width="560" height="315" src="https://www.youtube.com/embed/5-JtB8lU8t8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></video>-->
                <!--        <video src="https://www.youtube.com/embed/5-JtB8lU8t8" ref="player" />-->
                <button @click="showPaymentForm=!showPaymentForm">Добавить покупку</button>
                <AddPaymentForm @addNewPayment="addData" ref="addpaymentForms"
                                v-if="showPaymentForm"></AddPaymentForm>
                <PaymentDisplay :list="paymentsList"></PaymentDisplay>
                <div>Всего потрачено: {{ getFPV }}р.</div>
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
    import AddPaymentForm from "@/components/AddPaymentForm.vue";
    import {mapMutations, mapGetters} from "vuex";

    export default {
        name: 'App',
        components: {
            PaymentDisplay,
            AddPaymentForm
        },
        data() {
            return {
                //show: false,
                showPaymentForm: false
            }
        },
        computed: {
            ...mapGetters([
                "getPaymentsList",
                "getFullPaymentValue"
            ]),
            getFPV() {
                return this.getFullPaymentValue;
                //return this.$store.getters.getFullPaymentValue
            },
            paymentsList() {
                return this.getPaymentsList;
                //return this.$store.getters.getPaymentsList
            }
        },
        // actions: { //импортируем экшены из store
        //     ...mapActions([
        //         'fetchData',
        //         'fetchCategoryList'
        //     ])
        // },
        methods: {
            ...mapMutations([
                "setPaymentListData",
                "addDataPayment"
            ]),
            // fetchData() {
            //     return [
            //         {
            //             date: '28.03.2020',
            //             category: 'Food',
            //             value: 169
            //         },
            //         {
            //             date: '24.03.2020',
            //             category: 'Transport',
            //             value: 360
            //         },
            //         {
            //             date: '24.03.2020',
            //             category: 'Cafe',
            //             value: 532
            //         }
            //     ]
            // },
            addData(data) {
                //this.$store.commit('addDataPayment', data); //Нативно
                this.addDataPayment(data);              //Через импорт мутаций
                //this.paymentsList.push(data);
            }
        },
        created() {
            this.setPaymentListData(this.fetchData());
            //this.$store.commit('setPaymentListData', this.fetchData()); //Global State
            //this.paymentsList = this.fetchData();
            //console.log(this.paymentsList);
            //this.$store.dispatch('fetchData');   //dispatch вызывает экшены из store vuex
            //this.$store.dispatch('fetchCategoryList');

        },
        mounted() {
            //if (!this.paymentsList?.length) {
            this.$store.dispatch('fetchData');
            //}
            //console.log(this.$refs.addpaymentForm);
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
