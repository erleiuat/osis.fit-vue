<template>
    <v-dialog v-model="show" v-show="show" :fullscreen="$vuetify.breakpoint.xs" scrollable width="800" transition="dialog-bottom-transition">

        <template v-slot:activator="{ on }">
            <slot v-bind:on="on">
                <v-btn fab dark large color="red" v-on="on">
                    <v-icon dark>open_in_new</v-icon>
                </v-btn>
            </slot>
        </template>

        <v-card>
            <v-toolbar dark color="secondary">
                <v-toolbar-title>Trainings</v-toolbar-title>
                <v-spacer />
                <v-btn icon dark @click="show = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text class="pa-0">
                Hello
            </v-card-text>
        </v-card>

    </v-dialog>
</template>

<script>
export default {
    name: 'Trainings',

    components: {

    },

    data () {
        return {
            show: false
        }
    }

}
</script>
