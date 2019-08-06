<template>
    <v-dialog v-model="doShow" :fullscreen="$vuetify.breakpoint.xs" width="500" hide-overlay transition="dialog-bottom-transition" scrollable>
        <v-card>

            <v-card-title class="pl-0 pt-0 pr-0">
                <v-toolbar color="primary" flat dark>
                    <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="$emit('select', false)">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-card-title>

            <v-card-text class="pa-0">

                <OwnAndFavs v-if="!searchDB" @select="select" />

                <Browse v-else @select="select" />

            </v-card-text>

                <v-divider />

            <v-card-actions>
                <v-btn text block @click="searchDB = !searchDB">
                    Datenbank durchsuchen
                </v-btn>
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
            searchDB: false
        }
    },

    computed: {
        doShow: {
            get () {
                return this.show
            },
            set (val) {
                if (!val) this.$emit('select', val)
            }
        }
    },

    methods: {
        select (e) {
            if (!e) this.$emit('select', false)
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
