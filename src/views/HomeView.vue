<template>
    <div class="home">This is Home Page
        <div @click="quickPayment('Food', 200)">Food</div>
        <div @click="quickPayment('Transport', 50)">Transport</div>
        <div @click="quickPayment('Entertainment', 2000)">Entertainment</div>

        <router-view :valueAuto="cost"
                     callFromQuick="true"
                     showBtnSave="false"
                     showBtnAddcost="false"
                     :categoryFromQuickPay="category"/>
        <!--         blocked="false" -->

    </div>
</template>

<script>
    // @ is an alias to /src
    //import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'HomeView',
        data() {
            return {
                cost: '',
                //show: true,
                category: '',
            }
        },
        components: {
            //QuickPayments
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
                //this.$emit("saveQuickPayment");
            }
        },
        updated() {
            this.cost = this.$route.query.value;
            this.category = this.$route.params.category;
        }
    }
</script>
