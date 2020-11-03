<template>
    <div>
        <h1> Players</h1>


        <v-form class="mt-16 text-center mx-5" @submit.prevent="addPlayers">
            <v-row>
                <v-col class="px-5">
                    <v-select v-model="form.role" :items="roles" label="Role" attach multiple chips deletable-chips>

                    </v-select>
                </v-col>
                <v-col class="pa-5">
                    <v-text-field label="Pseudo" v-model="form.pseudo"/>
                </v-col>
                <v-col class="pa-5">
                    <v-btn color="success" type="submit">Ajouter</v-btn>
                </v-col>
            </v-row>
        </v-form>
        <v-main>
            <v-row>
                <v-col class="playerCard" v-for="(player,i) in players" :key="i" sm="2">
                    <v-card>
                        <v-list>
                            <v-list-item-group>
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon v-if="player.role === 'H'" color="green">mdi-hospital-box</v-icon>
                                        <v-icon v-if="player.role === 'T'" color="blue">mdi-shield</v-icon>
                                        <v-icon v-if="player.role === 'D'" color="red">mdi-sword</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="player.pseudo"></v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-btn color="red" icon small @click="deletePlayer(i)" >
                                            <v-icon>mdi-close-circle</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-main>
    </div>
</template>

<script>
    export default {
        name: "Players",
        data: () => ({
            roles: [{text: 'Tank', value: 'T'}, {text: 'DPS', value: 'D'}, {text: 'Heal', value: 'H'}],
            players: [
                {role: 'H', pseudo: 'Draésia'},

            ],
            form: {
                role: '',
                pseudo: '',
            }
        }),
        methods: {
            addPlayers() {

                console.log(this.form.role[0]);
                console.log(this.form.pseudo);

                this.players.push({
                    role: this.form.role[0],
                    pseudo: this.form.pseudo
                });
                this.clean()
            },
            clean(){
                this.form.role = '';
                this.form.pseudo = '';
            },
            deletePlayer(id){
                this.players.splice(id,1)
            }
        }
    }
</script>

<style scoped>
    .playerCard {
        width: fit-content;
    }
</style>