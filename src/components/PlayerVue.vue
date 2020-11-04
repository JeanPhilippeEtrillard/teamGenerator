<template>
    <v-card >
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
                    <v-list-item-action v-if="deleteEnable">
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
        props: ['player', 'index','deleteEnable']
    }
</script>

<style scoped>

</style>