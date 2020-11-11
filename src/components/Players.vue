<template>
    <div>
        <h1> Players</h1>
        <router-link to="/" class="disable_link">
            <v-btn outlined color="blue-grey" large>BACK</v-btn>
        </router-link>
        <v-divider class="mt-5"></v-divider>

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
                    <v-btn color="success" type="submit">Send</v-btn>
                </v-col>
            </v-row>
        </v-form>
        <v-divider class="mb-5"></v-divider>
        <v-main>
            <v-row>
                <v-col class="playerCard" v-for="(player,i) in players" :key="player.id" sm="2">
                    <PlayerVue v-bind:player="player" v-bind:index="i" actions="true"
                               v-on:deletePlayer="deletePlayer"
                    v-on:modifyPlayer="modifyPlayer"/>
                </v-col>
            </v-row>
        </v-main>
    </div>
</template>

<script>
    import playerService from "@/service/playerService";
    import PlayerVue from "@/components/PlayerVue";
    import _ from 'lodash'

    export default {
        name: "Players",
        components: {PlayerVue},
        data: () => ({
            roles: [{text: 'Tank', value: 'T'}, {text: 'DPS', value: 'D'}, {text: 'Heal', value: 'H'}],
            form: {
                role: '',
                pseudo: '',
                id:''
            }
        }),
        computed: {
            players: () => {
                return playerService.players;
            }
        },
        methods: {
            addPlayers() {
                let id = this.form.id;
                let idx = _.findIndex( playerService.players, function(player){
                    return player.id === id
                });

                if(idx > -1){

                    console.log(this.form.role);
                    playerService.players[idx].pseudo = this.form.pseudo;
                    playerService.players[idx].role = this.form.role;
                    playerService.players[idx].id = Date.now();

                }else{

                    playerService.players.push({
                        role: this.form.role,
                        pseudo: this.form.pseudo,
                        id: Date.now()
                    });
                }
                this.$forceUpdate();
                this.clean()
            },
            clean() {
                this.form.role = '';
                this.form.pseudo = '';
                this.form.id = '';
            },
            deletePlayer(id) {
                playerService.players.splice(id, 1);
                this.$forceUpdate();
            },
            modifyPlayer(id) {
                let player = playerService.players[id];
                this.form.role = player.role;
                this.form.pseudo = player.pseudo;
                this.form.id = player.id;
                this.$forceUpdate();
            }
        }
    }
</script>

<style scoped>
    .playerCard {
        width: fit-content;
    }
</style>