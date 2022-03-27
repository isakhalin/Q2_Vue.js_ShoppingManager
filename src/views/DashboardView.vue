<template>
    <div class="wrapper">
        <header>
            <p class="title">My personal coast</p>
            <div>My total {{ getFPV }}</div>
        </header>
        <main>
            <AddPayment
                    @addNewPayment="addData"
            />
            <PaymentsDisplay :list="currentElements"/>
            <my-pagination
                    :allPages="getAllPages"
                    :testLength="additionPaymentList.length"
                    :curPage="curPage"
                    :elDisplay="elDisplay"
                    @changePage="onChangePage"
            />
        </main>
    </div>
</template>

<script>
    import MyPagination from "@/components/MyPagination.vue";
    import AddPayment from "@/components/AddPayment.vue";
    import PaymentsDisplay from "@/components/PaymentDisplay.vue";

    export default {
        name: "DashboardView",
        components: {
            PaymentsDisplay,
            AddPayment,
            MyPagination
        },
        data() {
            return {
                //nextId: 4,
                elDisplay: 3,
                curPage: 1,
            };
        },
        computed: {
            getAllPages() {
                return this.$store.getters.getAllPages;
            },
            getFPV() {
                return this.$store.getters.getFullPaymentValue;
            },
            additionPaymentList() {
                return this.$store.getters.getAdditionPaymentList
            },
            additionCurrentElements() {
                return this.additionPaymentList.slice(
                    this.elDisplay * ((this.curPage - this.getAllPages) - 1),
                    this.elDisplay * ((this.curPage - this.getAllPages) - 1) + this.elDisplay
                );
            },
            currentElements() {
                if (this.curPage <= this.getAllPages) {
                    return this.$store.getters.getCurrentElements;
                } else {
                    return this.additionCurrentElements;
                }
            },
        },
        methods: {
            onChangePage(page) {
                this.curPage = page;
                if (page > this.getAllPages) {
                    return;
                } else {
                    this.$store.dispatch("fetchDataGit", page);
                }
            },
            addData(data) {
                this.$store.commit('addAdditionPayment', data)
            },
        },
        created() {
            this.$store.dispatch("fetchCategoryList");
            this.$store.dispatch("fetchDataGit", this.curPage);
        },
    };
</script>

<style scoped>

</style>