<template>
    <div class="home">This is Home Page
        <div @click="quickPayment('food', 200)">Food</div>
        <div @click="quickPayment('Transport', 50)">Transport</div>
        <div @click="quickPayment('Entertainment', 2000)">Entertainment</div>

        <router-view />
    </div>
</template>

<script>
    // @ is an alias to /src
    //import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'HomeView',
        data() {
            return {}
        },
        components: {
            //QuickPayments
            //HelloWorld
        },
        methods: {
            quickPayment(cat, val) {
                this.$router.push({
                    name: 'addpayment',
                    params: {
                        value: val,
                        cate: cat
                    },
                    path: `/add/payment/${cat}`,
                    query: {
                        //isTrial: true,
                        value: val,
                        catego: cat
                    }
                });
                console.log(this.$router);
                //this.$emit("saveQuickPayment");
            }
        }
    }
</script>
