<template>
    <v-container grid-list-xl pt-0 fill-height>

        <FoodEditor v-model="showEditor" :item="editObj" />

        <v-layout wrap>

            <v-flex xs12>
                <v-layout wrap align-center v-if="$vuetify.breakpoint.mdAndUp">
                    <v-flex grow>
                        <div class="headline">{{ $t('title') }}</div>
                    </v-flex>
                    <v-flex shrink>
                        <v-btn @click="openEditor()" fab depressed small color="primary">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12>
                <v-layout wrap justify-center align-start pl-0 pr-0>
                    <v-flex xs12 sm6 md4 v-for="(arr, key) in items" :key="key">
                        <v-layout column fill-height>
                            <v-flex xs12 v-for="(item, key) in arr" :key="key" :class="$vuetify.breakpoint.smAndUp ? 'pa-2':'pa-1'">
                                <FoodCard :item="item" @select="openEditor(item)" />
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12 v-if="!items && !query">
                {{ $t('noneyet') }}
            </v-flex>

            <v-flex xs12 v-if="!items && query">
                {{ $t('nonefound') }}
            </v-flex>

        </v-layout>

        <v-fab-transition v-if="!$vuetify.breakpoint.mdAndUp">
            <v-btn @click="openEditor()" fab fixed bottom right color="primary">
                <v-icon>add</v-icon>
            </v-btn>
        </v-fab-transition>

    </v-container>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import FoodEditor from '@/components/food/Editor'

import food from '@/store/modules/food'
const FoodCard = () => import('@/components/food/Card')

export default {
    name: 'Own',

    components: {
        FoodCard, FoodEditor
    },

    modules: {
        food
    },

    data () {
        return {
            showEditor: false,
            editObj: null
        }
    },

    computed: {

        items () {
            var items = this.$store.getters['food/all']

            var query = this.$route.query.s || ''

            var filtered = items.filter(el =>
                el.title.toUpperCase().includes(query.toUpperCase() || '')
            )

            if (filtered.length <= 0) return false

            if (this.$vuetify.breakpoint.xsOnly || filtered.length < 2)
                return {
                    a: filtered
                }

            var i = 1; var col1 = []; var col2 = []; var col3 = []

            if (this.$vuetify.breakpoint.smOnly) {
                filtered.forEach(item => {
                    if (i === 1) {
                        col1.push(item)
                        i++
                    } else if (i === 2) {
                        col2.push(item)
                        i = 1
                    }
                })
                return {
                    a: col1,
                    b: col2
                }
            } else {
                filtered.forEach(item => {
                    if (i === 1) {
                        col1.push(item)
                        i++
                    } else if (i === 2) {
                        col2.push(item)
                        i++
                    } else if (i === 3) {
                        col3.push(item)
                        i = 1
                    }
                })
                return {
                    a: col1,
                    b: col2,
                    c: col3
                }
            }
        }

    },

    methods: {
        openEditor (item = false) {
            var copy = (item ? clonedeep(item) : false)
            this.editObj = copy
            this.showEditor = true
        }
    },

    mounted () {
        this.$store.dispatch('food/load')
    },

    i18n: {
        messages: {
            en: {
                title: 'Your Templates',
                amount: 'Amount',
                calories: 'Calories/100',
                total: 'Total',
                noneyet: 'You have not yet created your own templates',
                nonefound: 'No results',
                removeImgError: 'Image remove failed'
            },
            de: {
                title: 'Deine Vorlagen',
                amount: 'Menge',
                calories: 'Kalorien/100',
                total: 'Total',
                noneyet: 'Du hast noch keine eigenen Vorlagen erstellt',
                nonefound: 'Keine Resultate',
                removeImgError: 'Bild entfernen fehlgeschlagen'
            }
        }
    }

}
</script>
