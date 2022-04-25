<template>
    <div class="wrapper" v-if="settings.content">
        <div class="header">
            {{ settings.title }}
        </div>
        <div class="content">
            <!-- Подставляет компонент, имя которое соответствует тому, что передали в settings.content -->
            <component :is="settings.content" some="123"/>
            <!--            <AddPayment v-if="settings.content === 'addpayment'"/>-->
            <!--            <MyAuth v-if="settings.content === 'auth'"/>-->
        </div>
        <div class="footer">
            <button @click="onCloseClick">
                Close
            </button>
        </div>
    </div>
</template>

<script>
    //import AddPayment from "@/components/AddPayment.vue";
    //import MyAuth from "@/components/MyAuth";

    export default {
        name: "ModalWindowAddPaymentForm",
        components: {
            //Импортируем компонент, указываем имя chank'а и путь до компонента
            MyAuth: () => import('@/components/MyAuth.vue'),
            AddPayment: () => import('@/components/AddPayment.vue')
        },
        props: {
            settings: Object,
            //whereIam: String
        },
        data() {
            return {}
        },
        watch: {},
        computed: {},
        methods: {
            onCloseClick() {
                //console.log(this.whereIam)
                this.$modal.hide();
                //console.log('close clicked from editForm')
                // this.$emit('close')
            }
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        }
    }
</script>

<style scoped>

    .wrapper {
        padding: 20px;
        position: absolute;
        top: 20px;
        background: #efefef;
    }

    /*.editForm {*/
    /*    background: #cccccc;*/
    /*}*/
</style>