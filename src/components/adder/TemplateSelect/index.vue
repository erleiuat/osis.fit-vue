<template>
    <v-dialog scrollable v-model="show" v-show="show" :fullscreen="$vuetify.breakpoint.xs" width="500" transition="dialog-bottom-transition">

        <template v-slot:activator="{ on }">
            <slot v-bind:on="on">
                <v-btn v-on="on" fab icon small color="primary" depressed>
                    <v-icon>open_in_new</v-icon>
                </v-btn>
            </slot>
        </template>

        <v-card v-if="show">
            <v-toolbar color="primary" class="white--text" v-show="$vuetify.breakpoint.xs">
                <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click="show = false">
                        <v-icon right color="white">close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-card-title class="headline primary white--text" v-show="!$vuetify.breakpoint.xs">
                {{ $t('title') }}
            </v-card-title>

            <v-tabs v-model="active" color="secondary" slider-color="primary" grow dark>
                <v-tab href="#ownAndFavs">
                    <v-icon>folder</v-icon>
                </v-tab>
                <v-tab href="#browse">
                    <v-icon>search</v-icon>
                </v-tab>
            </v-tabs>

            <v-card-text class="pa-0" style="height: 600px;">
                <v-tabs-items v-model="active">
                    <v-tab-item lazy value="ownAndFavs">
                        <OwnAndFavs @select-item="select" />
                    </v-tab-item>

                    <v-tab-item lazy value="browse">
                        <Browse @select-item="select" />
                    </v-tab-item>
                </v-tabs-items>
            </v-card-text>

            <v-divider v-show="!$vuetify.breakpoint.xs" />

            <v-card-actions v-show="!$vuetify.breakpoint.xs">
                <v-btn @click="show = false" flat>{{ $t('btn.close') }}</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
const OwnAndFavs = () => import('@/components/adder/TemplateSelect/OwnAndFavs')
const Browse = () => import('@/components/adder/TemplateSelect/Browse')

export default {
    name: 'TemplateSelect',

    components: {
        OwnAndFavs, Browse
    },

    data () {
        return {
            show: false,
            active: 'ownAndFavs'
        }
    },

    props: {
        value: Object
    },

    methods: {

        select (e) {
            this.value.title = e.title
            this.value.amount = e.amount
            this.value.caloriesPer100 = e.caloriesPer100
            this.value.calories = e.caloriesPer100 * (e.amount / 100)
            this.show = false
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Select Template'
            },
            de: {
                title: 'Vorlage auswählen'
            }
        }
    }

}
</script>
