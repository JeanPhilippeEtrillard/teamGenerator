<template>
    <v-list>
        <v-list-item-group>
            <v-list-item style="text-align: center">
                Team {{index+1}}
            </v-list-item>
            <v-list-item>
                <PlayerVue v-if="team.tank" class="playerList" v-bind:player="team.tank"/>
                <PlayerVue v-if="!team.tank" class="playerList" v-bind:player="emptyTank"/>
            </v-list-item>
            <v-list-item>
                <PlayerVue v-if="team.heal" class="playerList" v-bind:player="team.heal"/>
                <PlayerVue v-if="!team.heal" class="playerList" v-bind:player="emptyHeal"/>
            </v-list-item>
            <v-list-item>
                <PlayerVue v-if="team.dps[0]" class="playerList" v-bind:player="team.dps[0]"/>
                <PlayerVue v-if="!team.dps[0]" class="playerList" v-bind:player="emptyDPS"/>
            </v-list-item>
            <v-list-item>
                <PlayerVue v-if="team.dps[1]" class="playerList" v-bind:player="team.dps[1]"/>
                <PlayerVue v-if="!team.dps[1]" class="playerList" v-bind:player="emptyDPS"/>
            </v-list-item>
            <v-list-item>
                <PlayerVue v-if="team.dps[2]" class="playerList" v-bind:player="team.dps[2]"/>
                <PlayerVue v-if="!team.dps[2]" class="playerList" v-bind:player="emptyDPS"/>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script>
    import PlayerVue from "@/components/PlayerVue";

    export default {
        name: "TeamVue",
        components: {PlayerVue},
        props: ['team', 'index'],
        data: () => ({
            emptyTank: {role: 'T', pseudo: ''},
            emptyHeal: {role: 'H', pseudo: ''},
            emptyDPS: {role: 'D', pseudo: ''},
        })
    }
</script>

<style scoped>

    .playerList {
        width: 100%;
        margin-bottom: 1px;
    }
</style>