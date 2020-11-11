<template>
    <v-card>
        <v-list v-bind:class="classPlayer">
            <v-list-item-group>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title v-text="player.pseudo" class="playerName"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action v-if="actions">
                        <v-btn color="white" icon small @click="$emit('modifyPlayer',index)">
                            <v-icon>mdi-pencil-circle-outline</v-icon>
                        </v-btn>
                        <v-btn color="red" icon small @click="$emit('deletePlayer',index)">
                            <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: "PlayerVue",
        props: ['player', 'index', 'actions'],
        computed: {
            classPlayer: function () {
                let tank;
                let heal;
                let dps;
                let healTankDps = false;
                let healTank = false;
                let tankDps = false;
                let healDps = false;
                heal = this.player.role.includes("H");
                tank = this.player.role.includes("T");
                dps = this.player.role.includes("D");



                if (heal && tank && dps) {
                    healTankDps = true;
                } else if (heal && tank) {
                    healTank = true;
                } else if (heal && dps) {
                    healDps = true;
                } else if (tank && dps) {
                    tankDps = true;
                }


                if (healTankDps || healTank || healDps || tankDps) {
                    tank = false;
                    heal = false;
                    dps = false;
                }
                return {
                    tank: tank,
                    heal: heal,
                    dps: dps,
                    healTankDps: healTankDps,
                    healTank: healTank,
                    tankDps: tankDps,
                    healDps: healDps
                }
            }
        }
    }
</script>

<style>
    .playerName {
        color: white;
    }

    .tank {
        background-color: #154473 !important;
    }

    .heal {
        background-color: #125C3B !important;
    }

    .dps {
        background-color: #8A1115 !important;
    }

    .healTankDps {
        background-image: linear-gradient(140deg, #125C3B, #154473, #8A1115) !important;
    }

    .healTank {
        background-image: linear-gradient(140deg, #125C3B, #154473) !important;
    }

    .tankDps {
        background-image: linear-gradient(140deg, #154473, #8A1115) !important;
    }

    .healDps {
        background-image: linear-gradient(140deg, #125C3B, #8A1115) !important;
    }
</style>