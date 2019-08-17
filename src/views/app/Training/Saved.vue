<template>
    <v-container grid-list-xl pt-0 fill-height>
        <v-layout wrap v-if="items">

            <v-flex xs12 md6 v-for="item in items" :key="item.id">
                <v-card>

                    <v-card-title>
                        {{ item.title }}
                    </v-card-title>
                    <v-card-text>
                        {{ item.description }}
                    </v-card-text>

                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import training from '@/store/modules/training'

export default {
    name: 'Own',

    modules: {
        training
    },

    data () {
        return {
            query: null,
            showEditor: false,
            editObj: null
        }
    },

    computed: {

        items () {
            var items = this.$store.getters['training/all']

            var filtered = items.filter(el => el.title.includes(this.query || ''))

            if (filtered.length <= 0) return false
            else return filtered

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
        this.$store.dispatch('training/load')
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
