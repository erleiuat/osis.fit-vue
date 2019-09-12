<template>
    <v-dialog v-model="doShow" :fullscreen="$vuetify.breakpoint.xs" width="700" transition="dialog-bottom-transition" scrollable>
        <v-card>

            <v-card-title class="pa-0">
                <v-toolbar color="primary" flat dark dense>
                    <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="$emit('select', false)">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-card-title>

            <v-card-text class="pa-0" style="min-height: 200px">
                <OwnAndFavs v-if="!searchDB" @select="select" />
                <Browse v-else-if="$store.getters['auth/premium']" @select="select" />
            </v-card-text>

            <v-divider />

            <v-card-actions>
                <vcontainer class="pa-0">
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-btn @click="searchDB = true" v-if="$store.getters['auth/premium'] && !searchDB" text block>
                                {{ $t('database') }}
                                <v-icon right>search</v-icon>
                            </v-btn>
                            <v-btn :to="{name: 'premium', query: {notify: true}}" v-else-if="!$store.getters['auth/premium']" color="amber" text block>
                                {{ $t('database') }}
                                <v-icon right>search</v-icon>
                            </v-btn>
                            <v-btn @click="searchDB = false" v-else text block>
                                {{ $t('templates') }}
                                <v-icon right>search</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </vcontainer>
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
                title: 'Select Template',
                database: 'Database',
                templates: 'Templates',
                scan: 'Scan code'
            },
            de: {
                title: 'Vorlage auswählen',
                database: 'Datenbank',
                templates: 'Vorlagen',
                scan: 'Code scannen'
            }
        }
    }

}
</script>
