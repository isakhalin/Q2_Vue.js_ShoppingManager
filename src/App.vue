<template>
    <v-app>
        <v-app-bar
                app
        >
            <v-btn plain :ripple="false" to="/dashboard">Dashboard</v-btn>
            <v-btn to="/about">About</v-btn>

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
    };
</script>
