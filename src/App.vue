<template>
    <div id="app">
        <nav>
            <router-link to="/">Home</router-link>
            |
            <router-link to="/dashboard">Dashboard</router-link>
            |
            <router-link to="/about">About</router-link>
            <div @click="goToPageAbout">Go to About</div>
        </nav>
        <main>
            <router-view/>
        </main>
        <ModalWindowAddPaymentForm v-if="modalShow" :settings="settings"/>
    </div>
</template>

<script>
    import ModalWindowAddPaymentForm from "@/components/ModalWindowAddPaymentForm";

    export default {
        name: 'App',
        components: {
            ModalWindowAddPaymentForm
        },
        data() {
            return {
                modalShow: false,
                settings: {}
            }
        },
        computed: {},
        methods: {
            onShow(settings) {
                console.log(settings)
                this.modalShow = true;
                this.settings = settings;
            },
            onHide() {
                this.modalShow = false;
                this.settings = {};
            },
            goToPageAbout() {
                let coast = 500;
                //addStaticPayment(item, price)
                this.$router.push({
                    name: 'about',
                    params: {
                        value: coast
                    },
                    query: {
                        //isTrial: true,
                        value: coast
                    }
                });
            }
        },
        created() {
            console.log(this.$router);
        },
        mounted() {
            this.$modal.EventBus.$on('show', this.onShow);
            this.$modal.EventBus.$on('hide', this.onHide);
            // this.$modal.show();     //Вызываем метод из модуля
            // this.$modal.hide();
        },
        beforeDestroy() {
            this.$modal.EventBus.$off('show', this.onShow);
            this.$modal.EventBus.$off('hide', this.onHide);
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
