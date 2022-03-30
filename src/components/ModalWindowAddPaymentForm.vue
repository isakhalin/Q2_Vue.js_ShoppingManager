<template>
    <div class="wrapper" v-if="settings.content">
        <div class="header">
            {{ settings.title }}
            Add new payment
        </div>
        <div class="content">
            <AddPayment v-if="settings.content === 'AddPayment'"/>
            <MyAuth v-if="settings.content === 'Auth'"/>
        </div>
        <div class="footer">
            <button @click="onCloseClick">
                Close
            </button>
        </div>
    </div>
</template>

<script>
    import AddPayment from "@/components/AddPayment.vue";
    import MyAuth from "@/components/MyAuth";

    export default {
        name: "ModalWindowAddPaymentForm",
        components: {
            MyAuth,
            AddPayment
        },
        props: {
            settings: Object
        },
        data() {
        },
        watch: {},
        computed: {},
        methods: {
            onCloseClick() {
                this.$emit('close')
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
</style>