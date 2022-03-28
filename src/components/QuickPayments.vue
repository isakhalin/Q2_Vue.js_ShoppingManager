<template>
    <div>
        <div @click="quickPayment('Food', 200)">Food</div>
        <div @click="quickPayment('Transport', 50)">Transport</div>
        <div @click="quickPayment('Entertainment', 2000)">Entertainment</div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "QuickPayments",
        data() {
            return {}
        },
        methods: {
            quickPayment(cat, val) {
                //console.log('fsafsaf')
                this.$router.push({
                    name: 'add/payment',
                    params: {
                        value: val
                    },
                    path: `/add/payment/${cat}`,
                    query: {
                        //isTrial: true,
                        value: val
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>