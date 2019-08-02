<template>
    <v-dialog v-model="show" :fullscreen="$vuetify.breakpoint.mdAndDown" scrollable width="1000" transition="dialog-bottom-transition">

        <template v-slot:activator="{ on }">
            <slot v-bind:on="on">
                <v-btn fab dark large color="red" v-on="on">
                    <v-icon dark>open_in_new</v-icon>
                </v-btn>
            </slot>
        </template>

        <v-card>
            <v-toolbar color="primary" dark tabs>
                <v-toolbar-title>{{ $t('templates') }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="show = false">
                    <v-icon>close</v-icon>
                </v-btn>

                <template v-slot:extension>
                    <v-tabs v-model="tab" color="primary" slider-color="secondary" grow>
                        <v-tab href="#tab-own">
                            <v-icon>folder</v-icon>
                        </v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>

            <v-card-text class="pa-0">
                <v-tabs-items v-model="tab">
                    <v-tab-item lazy value="tab-own">
                    </v-tab-item>
                </v-tabs-items>
            </v-card-text>
        </v-card>

    </v-dialog>
</template>

<script>
export default {
    name: 'Food',

    data () {
        return {
            show: false,
            tab: 'tab-own'
        }
    },

    i18n: {
        messages: {
            en: {
                templates: 'Templates'
            },
            de: {
                templates: 'Vorlagen'
            }
        }
    }

}
</script>
