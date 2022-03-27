<template>
    <div id="app">
        <nav>
            <a href="dashboard">Dashboard</a> /
            <a href="about">About</a> /
            <a href="404">404</a>
        </nav>
        <main>
            <MyDashboard v-if="page === 'dashboard'"/>
            <MyPage404 v-if="page === '404'"/>
            <MyAbout v-if="page === 'about'"/>
        </main>
    </div>
</template>

<script>
    import MyPage404 from "@/components/MyPage404.vue";
    import MyAbout from "@/components/MyAbout.vue";
    import MyDashboard from "@/components/MyDashboard";

    export default {
        name: "App",
        components: {
            MyAbout,
            MyPage404,
            MyDashboard
        },
        data() {
            return {
                page: ''
            };
        },
        methods: {
            setPage() {
                this.page = location.pathname.slice(1);
            }
            // onClick(arg) {
            //     this.page = arg;
            // }
        },
        mounted() {
            this.setPage();
            //window.addEventListener('hashchange', () => this.setPage());
            const links = document.querySelectorAll("a");
            links.forEach(link => {
                link.addEventListener('click', event => {
                    event.preventDefault();
                    history.pushState({}, '', link.href);
                    this.setPage();
                });
            });
            //window.addEventListener('popstate', () => this.setPage());
            window.addEventListener('popstate', this.setPage);
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
