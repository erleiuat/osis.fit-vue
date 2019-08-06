<template>
    <v-dialog scrollable v-model="show" :fullscreen="$vuetify.breakpoint.xs" width="500" transition="dialog-bottom-transition">

        <v-card>
            
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
                    <v-tab-item value="ownAndFavs">
                        <OwnAndFavs @select="select" />
                    </v-tab-item>

                    <v-tab-item value="browse">
                        <Browse @select="select" />
                    </v-tab-item>
                </v-tabs-items>
            </v-card-text>

            <v-divider v-show="!$vuetify.breakpoint.xs" />

            <v-card-actions v-show="!$vuetify.breakpoint.xs">
                <v-btn text @click="show = false">{{ $t('btn.close') }}</v-btn>
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

    props: {
        show: Boolean
    },

    data () {
        return {
            active: 'ownAndFavs'
        }
    },

    methods: {

        select (e) {
            this.$emit('select', e)
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
