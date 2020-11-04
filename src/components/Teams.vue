<template>
    <div>
        <h1>Teams</h1>
        <router-link to="/" class="disable_link">
            <v-btn outlined color="blue-grey" large>RETOUR</v-btn>
        </router-link>
        <v-divider class="mt-5"></v-divider>
            <v-navigation-drawer permanent absolute>
                <v-list dense nav>
                    <v-list-item v-if="players.length>0">
                        <v-btn color="info" @click="generateTeams" small>Generate Teams</v-btn>
                        <v-btn color="error" @click="clear" small> Clear</v-btn>
                    </v-list-item>
                    <v-list-item v-if="players.length===0">
                        <v-btn class="playerList" disabled>No Data Found</v-btn>
                    </v-list-item>
                    <v-list-item v-for="(player,i) in players" :key="i">
                        <PlayerVue class="playerList" v-bind:player="player" v-bind:index="i"/>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main class="teamsPanel">
                <v-row>
                    <v-col class="playerCard" v-for="(team,i) in teams" :key="i" sm="2">
                        <TeamVue v-bind:team="team" v-bind:index="i"/>
                    </v-col>
                </v-row>
            </v-main>

    </div>
</template>

<script>
    import playerService from "@/service/playerService";
    import PlayerVue from "@/components/PlayerVue";
    import TeamVue from "@/components/TeamVue";
    import _ from 'lodash'

    export default {
        name: "Teams",
        components: {PlayerVue, TeamVue},
        computed: {
            players: () => {
                return playerService.players;
            }
        },
        data: () => ({
            teams: [
            ]
        }),
        methods: {
            generateTeams() {
                var healerList = _.filter(playerService.players, {role: 'H'});
                var dpsList = _.filter(playerService.players, {role: 'D'});
                var tankList = _.filter(playerService.players, {role: 'T'});


                var nbTeam = Math.max(healerList.length, tankList.length, dpsList.length % 3)
                for(let nb=0; nb<nbTeam; nb++  ){
                    var tankIdx = Math.floor(Math.random()*(tankList.length))
                    var healIdx = Math.floor(Math.random()*(healerList.length))
                    var dpsListTmp =[];

                    for(let i=0; i<3 && i <= dpsList.length; i++){
                        var dpsIdx = Math.floor(Math.random()*(dpsList.length))
                        dpsListTmp.push(dpsList[dpsIdx]);
                        dpsList.splice(dpsIdx,1)
                    }

                    var team = {
                        tank: tankList[tankIdx],
                        heal: healerList[healIdx],
                        dps:dpsListTmp
                    }
                    this.teams.push(team)
                    tankList.splice(tankIdx,1)
                    healerList.splice(healIdx,1)
                }
                this.$forceUpdate();
            },
            clear(){
                this.teams.splice(0,this.teams.length);
                this.$forceUpdate();
            }
        }
    }
</script>

<style scoped>
    .playerList {
        width: 100%;
    }

    .teamsPanel {
        margin-left: 250px;
    }
</style>