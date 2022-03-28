<template>
    <div class="home">This is Home Page
        <!--    <img alt="Vue logo" src="../assets/logo.png">-->
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <QuickPayments/>
    </div>
</template>

<script>
    // @ is an alias to /src
    //import HelloWorld from '@/components/HelloWorld.vue'
    import QuickPayments from "@/components/QuickPayments.vue";

    export default {
        name: 'HomeView',
        data() {
            return {
            }
        },
        components: {
            QuickPayments
            //HelloWorld
        }
    }
</script>
