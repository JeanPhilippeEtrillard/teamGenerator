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
            teams: []
        }),
        methods: {
            generateTeams() {
                var healerList = _.filter(playerService.players, function (player) {
                    return player.role.includes("H")
                });
                var dpsList = _.filter(playerService.players, function (player) {
                    return player.role.includes("D")
                })
                var tankList = _.filter(playerService.players, function (player) {
                    return player.role.includes("T")
                });
                this.harmonized(healerList, tankList, dpsList);

                var nbTeam = Math.max(healerList.length, tankList.length, Math.round(dpsList.length / 3));
                var sliceDps = dpsList.length / nbTeam;
                for (let nb = 0; nb < nbTeam; nb++) {
                    var tankIdx = Math.floor(Math.random() * (tankList.length));
                    var tank = tankList[tankIdx];
                    this.filtrerList(tank, healerList, dpsList);
                    var healIdx = Math.floor(Math.random() * (healerList.length));
                    var heal = healerList[healIdx];
                    this.filtrerList(heal, tankList, dpsList);
                    var dpsListTmp = [];

                    for (let i = 0; ((!Number.isInteger(sliceDps) && i < 3) || (Number.isInteger(sliceDps) && i < sliceDps && i < 3));
                         i++
                    ) {
                        var dpsIdx = Math.floor(Math.random() * (dpsList.length));
                        var dps = dpsList[dpsIdx];
                        this.filtrerList(dps, healerList, tankList);
                        dpsListTmp.push(dps);
                        dpsList.splice(dpsIdx, 1)
                    }

                    var team = {
                        tank: tank,
                        heal: heal,
                        dps: dpsListTmp
                    }
                    this.teams.push(team);
                    tankList.splice(tankIdx, 1);
                    healerList.splice(healIdx, 1)
                }


                this.$forceUpdate();
            },
            filtrerList() {
                if (arguments.length >= 2) {
                    if (arguments[0] !== undefined) {
                        let playerName = arguments[0].pseudo;
                        for (let i = 1; i < arguments.length; i++) {
                            let idx = _.findIndex(arguments[i], function (player) {
                                return player.pseudo === playerName;
                            });
                            if (idx >= 0) {
                                arguments[i].splice(idx, 1)
                            }

                        }
                    }
                }

            },
            harmonized(healList, tankList, dpsList) {
                this.harmonizedTank(healList, tankList, dpsList);
                this.harmonizedHeal(healList, tankList, dpsList);
                this.harmonizedDps(healList, tankList, dpsList);
            },
            harmonizedTank(healList, tankList, dpsList) {
                let tankSize = tankList.length;
                let healSize = healList.length;
                let dpsSize = Math.round(dpsList.length / 3);

                if (tankSize > healSize && tankSize > dpsSize) {
                    let tankMultiRoleSize = _.filter(tankList, function (player) {
                        return player.role.includes("T") && player.role.length > 1;
                    });
                    if (tankMultiRoleSize.length > 0) {
                        for (let i = 0; i < tankMultiRoleSize.length && i < Math.max(healSize, dpsSize); i++) {
                            let tankIdx = Math.floor(Math.random() * (tankMultiRoleSize.length));
                            let tank = tankMultiRoleSize[tankIdx];
                            this.filtrerList(tank, tankList)
                        }
                        for(let i = 0;  i < tankMultiRoleSize.length ; i++){
                            let tankIdx = Math.floor(Math.random() * (tankMultiRoleSize.length));
                            let tank = tankMultiRoleSize[tankIdx];
                            this.filtrerList(tank, healList)
                            this.filtrerList(tank, dpsList)
                        }
                    }
                }
            },
            harmonizedHeal(healList, tankList, dpsList) {
                let tankSize = tankList.length;
                let healSize = healList.length;
                let dpsSize = Math.round(dpsList.length / 3);

                if (healSize > tankSize && healSize > dpsSize) {
                    let healMultiRoleSize = _.filter(healList, function (player) {
                        return player.role.includes("H") && player.role.length > 1;
                    });
                    if (healMultiRoleSize.length > 0) {
                        for (let i = 0; i < healMultiRoleSize.length && i < Math.max(tankSize, dpsSize); i++) {
                            let healIdx = Math.floor(Math.random() * (healMultiRoleSize.length));
                            let heal = healMultiRoleSize[healIdx];
                            this.filtrerList(heal, healList)
                        }
                        for(let i = 0;  i < healMultiRoleSize.length ; i++){
                            let healIdx = Math.floor(Math.random() * (healMultiRoleSize.length));
                            let heal = healMultiRoleSize[healIdx];
                            this.filtrerList(heal, tankList)
                            this.filtrerList(heal, dpsList)
                        }
                    }
                }
            },
            harmonizedDps(healList, tankList, dpsList) {
                let tankSize = tankList.length;
                let healSize = healList.length;
                let dpsSize = Math.round(dpsList.length / 3);

                if (dpsSize > tankSize && dpsSize > healSize) {
                    let dpsMultiRoleSize = _.filter(healList, function (player) {
                        return player.role.includes("D") && player.role.length > 1;
                    });
                    if (dpsMultiRoleSize.length > 0) {
                        for (let i = 0; i < dpsMultiRoleSize.length && i < Math.max(tankSize, healSize); i++) {
                            let dpsIdx = Math.floor(Math.random() * (dpsMultiRoleSize.length));
                            let dps = dpsMultiRoleSize[dpsIdx];
                            this.filtrerList(dps, dpsSize)
                        }
                        for(let i = 0;  i < dpsMultiRoleSize.length ; i++){
                            let dpsIdx = Math.floor(Math.random() * (dpsMultiRoleSize.length));
                            let dps = dpsMultiRoleSize[dpsIdx];
                            this.filtrerList(dps, tankList)
                            this.filtrerList(dps, healList)
                        }
                    }
                }
            },
            clear() {
                this.teams.splice(0, this.teams.length);
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