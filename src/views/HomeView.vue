<template>
    <div class="home">This is Home Page
        <div @click="quickPayment('Food', 200)">Food</div>
        <div @click="quickPayment('Transport', 50)">Transport</div>
        <div @click="quickPayment('Entertainment', 2000)">Entertainment</div>

        <router-view :valueQuickPay="coast"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    //import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'HomeView',
        data() {
            return {
                coast: ''
            }
        },
        components: {
            //QuickPayments
            //HelloWorld
        },
        methods: {
            quickPayment(cat, val) {
                this.$router.push({
                    name: 'quickpayment',
                    params: {
                        value: val,
                        category: cat
                    },
                    query: {
                        //isTrial: true,
                        value: val
                    }
                });
                //console.log(this.$router);
                //this.$emit("saveQuickPayment");
            }
        },
        updated() {
            this.coast = this.$route.query.value;
        }
    }
</script>
