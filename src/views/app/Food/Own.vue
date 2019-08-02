<template>
    <v-container grid-list-xl pt-0 fill-height>

        <v-layout wrap>

            <v-flex xs12>
                <v-layout wrap align-center v-if="$vuetify.breakpoint.mdAndUp">
                    <v-flex grow>
                        <div class="headline">{{ $t('title') }}</div>
                    </v-flex>
                    <v-flex shrink>
                        <FoodEditor :editObj="editObj" />
                    </v-flex>
                </v-layout>
                <v-layout wrap align-center>
                    <!-- TODO: MAKE STICKY -->
                    <v-toolbar dense fixed :tile="false">
                        <v-text-field v-model="query" hide-details prepend-icon="search" single-line />
                    </v-toolbar>
                </v-layout>
            </v-flex>

            <v-flex xs12 v-if="items.a && !items.b" pt-5 pl-0 pr-0>
                <v-layout wrap justify-center>
                    <v-flex xs12 sm6 pa-1 v-for="item in items.a" :key="item.id">
                        <FoodCard :item="item" @edit="editObj = $event"/>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12 v-else-if="items.b" pt-5>
                <v-layout wrap align-start pl-2 pr-2>
                    <v-flex sm6>
                        <v-layout column fill-height>
                            <v-flex xs12 pa-1 v-for="item in items.a" :key="item.id">
                                <FoodCard :item="item" @edit="editObj = $event" />
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex sm6>
                        <v-layout column fill-height>
                            <v-flex xs12 pa-1 v-for="item in items.b" :key="item.id">
                                <FoodCard :item="item" @edit="editObj = $event" />
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12 v-else>
                {{ $t('noneyet') }}
            </v-flex>

        </v-layout>

        <v-fab-transition v-if="!$vuetify.breakpoint.mdAndUp">
            <FoodEditor :editObj="editObj">
                <template v-slot:default="trigger">
                    <v-btn fab fixed bottom right color="primary" v-on="trigger.on">
                        <v-icon>add</v-icon>
                    </v-btn>
                </template>
            </FoodEditor>
        </v-fab-transition>

    </v-container>
</template>

<script>
const FoodCard = () => import('@/components/food/Card')
const FoodEditor = () => import('@/components/food/Editor')

export default {
    name: 'Own',

    components: {
        FoodCard, FoodEditor
    },

    data () {
        return {
            query: '',
            editObj: null
        }
    },

    computed: {

        items () {

            var items = this.$store.getters['food/all']
            var filtered = items.filter(el => el.title.includes(this.query))

            if (this.$vuetify.breakpoint.xsOnly || filtered.length < 2) return {
                a: filtered,
                b: false
            }

            var i = 0, col1 = [], col2 = []
            filtered.forEach(item => {
                if (i % 2 == 0) col1.push(item)
                else col2.push(item)
                i++
            });

            return {
                a: col1,
                b: col2
            }

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
                removeImgError: 'Image remove failed'
            },
            de: {
                title: 'Deine Vorlagen',
                amount: 'Menge',
                calories: 'Kalorien/100',
                total: 'Total',
                noneyet: 'Du hast noch keine eigenen Vorlagen erstellt',
                removeImgError: 'Bild entfernen fehlgeschlagen'
            }
        }
    }

}
</script>
