<template>
    <div id="home">
        <router-link to='/players' class="disable_link">
            <v-btn outlined color="red" class="homeButton" x-large>Players</v-btn>
        </router-link>
        <router-link to='/teams' class="disable_link">
            <v-btn outlined color="info" class="homeButton" x-large>Teams</v-btn>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
    #home {
        margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 100%
    }

    .homeButton {
        margin: 10px;
        font-size: 5rem !important;
        height: 120px !important;
    }
    .disable_link{
        text-decoration: none !important;
    }
</style>