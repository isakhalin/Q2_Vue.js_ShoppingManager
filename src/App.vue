<template>
    <div id="app">
        <nav>
            <a href="#dasboard">Dashboard</a>
            <a href="#about">Dashboard</a>
            <a href="#unknown">dev/null</a>
        </nav>
        <div class="wrapper">
            <header>
                <p class="title">My personal coast</p>
                <div>My total {{ getFPV }}</div>
            </header>
            <main>
                <AddPayment
                        @addNewPayment="addData"
                        :next-id="(this.getAllPages * 3)+1"
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
    </div>
</template>

<script>
    import AddPayment from "./components/AddPayment.vue";
    import MyPagination from "./components/MyPagination.vue";
    import PaymentsDisplay from "./components/PaymentDisplay.vue";

    export default {
        name: "App",
        components: {
            PaymentsDisplay,
            AddPayment,
            MyPagination,
        },
        data() {
            return {
                nextId: 4,
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
                this.$store.dispatch("fetchDataGit", page);
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

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .title {
        font-size: 30px;
    }
</style>
