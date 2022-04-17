<template>
    <v-app>
        <v-app-bar
                app
        >
            <v-btn plain :ripple="false" to="/dashboard">Dashboard</v-btn>
            <v-btn to="/about">About</v-btn>
            <v-btn @click="runTest">See Console</v-btn>

        </v-app-bar>

        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        data: () => ({
            //
        }),
        methods: {
            runTest() {
                console.log(this.$store.getters.getPaymentList)
            }
        }
    };
</script>
