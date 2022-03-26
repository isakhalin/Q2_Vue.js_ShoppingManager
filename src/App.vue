<template>
    <div id="app">
        <nav>
            <a href="#dasboard">Dashboard</a>
            <a href="#about">About</a>
            <a href="#404">404</a>
        </nav>
        <main>

        </main>
    </div>
</template>

<script>
    //import Dashboard from "@/components/Dashboard.vue";

    export default {
        name: "App",
        components: {
            // PaymentsDisplay,
            // AddPayment,
            // MyPagination,
        },
        data() {
            return {
                nextId: 4,
                elDisplay: 3,
                curPage: 1,
            };
        }
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
