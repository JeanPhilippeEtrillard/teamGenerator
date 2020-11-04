<template>
    <v-app id="app">
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>

    export default {
        name: 'App',
    }
</script>

<style>
    html, body, #app {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    #app {
        text-align: center;
    }
    .disable_link{
        text-decoration: none !important;
    }

</style>
