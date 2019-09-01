<template>
    <v-container grid-list-sm fill-height>

        <v-layout wrap>

            <v-flex xs12 class="title">
                {{ $t('title') }}
            </v-flex>

            <v-flex xs12>
                <v-layout row wrap v-if="items">
                    <v-flex xs12 md6 v-for="item in items" :key="item.id">
                        <v-hover v-slot:default="{ hover }">
                            <v-card link flat :elevation="hover ? 12 : 2">

                                <v-card-title>
                                    {{ item.title }}
                                </v-card-title>
                                <v-card-text>
                                    {{ item.description }}
                                </v-card-text>

                            </v-card>
                        </v-hover>
                    </v-flex>
                </v-layout>
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
            showEditor: false,
            editObj: null
        }
    },

    computed: {

        items () {
            var items = this.$store.getters['training/all']
            var query = this.$route.query.s || ''
            if (!items) return false

            var filtered = items.filter(el =>
                el.title.toUpperCase().includes(query.toUpperCase())
            )

            if (filtered.length <= 0) return false
            else return filtered
        }

    },

    mounted () {
        this.$store.dispatch('training/load')
    },

    i18n: {
        messages: {
            en: {
                title: 'Saved training plans'
            },
            de: {
                title: 'Deine Trainingspläne'
            }
        }
    }

}
</script>

<style scoped>
.sticky-bar {
    width: 100%;
}
.sticky-bar > .v-toolbar {
    position: fixed;
    width: inherit;
}
</style>
