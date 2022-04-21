<template>
    <div class="about">
        <h1>This is an about page</h1>
<!--        <ModalWindowAddPaymentForm v-if="authFormShow" :settings="settings" @close="authFormShow = false"/>-->
<!--        <button @click="authFormShow = true">Auth</button>-->
    </div>
</template>

<script>
   //import ModalWindowAddPaymentForm from "@/components/ModalWindowAddPaymentForm";

    export default {
        name: 'AboutView',
        components: {
        //    ModalWindowAddPaymentForm
        },
        data() {
            return {
                settings: {
                    // content: 'auth',
                    // title: 'Auth form'
                },
                authFormShow: false
            }
        },
        watch: {},
        computed: {},
        methods: {},
        mounted() {
            this.$modal.show('Auth Form', {title: "Auth", content: "auth"})
        }
    }

</script>
