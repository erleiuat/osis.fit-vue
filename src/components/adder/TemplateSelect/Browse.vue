<template>
    <vcontainer class="pt-0">

        <v-row no-gutters>
            <v-col cols="12" class="pb-2">
                <v-text-field v-if="search" v-model="query" ref="search" @blur="search = false" @input="changeIn()" autofocus clearable class="pt-0" hide-details single-line />
                <v-btn v-else @click="search = true" outlined block>
                    <strong>{{ query || $t('btn.search') }}</strong>
                    <v-icon right>search</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <v-row row wrap v-if="loading">
            <v-col cols="12">
                <v-progress-linear rounded indeterminate height="10" />
            </v-col>
        </v-row>

        <v-row dense>
            <v-col cols="6" md="4" v-for="item in items" :key="item.id">
                <v-card @click="$emit('select', item)" :color="isFav(item.id) ? 'amber' : ''" link hover ripple outlined style="height: 100%">
                    <v-img v-if="item.image" :src="item.image" :height="100" />
                    <v-card-text :class="isFav(item.id) ? 'black--text' : ''">
                        <div class="body-2">
                            {{item.title}}
                        </div>
                        <div class="caption">
                            {{ $t('amount') }}: {{ item.amount }} g/ml<br />
                            {{ $t('calories') }}: {{ item.caloriesPer100 }} Kcal<br />
                            {{ $t('total') }}: {{ item.total }} Kcal
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-layout row wrap pa-2 text-center v-if="results.length < 1 && !loading">
            <v-flex xs12>
                {{ $t('notFound') }}
            </v-flex>
        </v-layout>

    </vcontainer>

</template>

<script>
export default {
    name: 'Browse',

    data () {
        return {
            query: '',
            search: true,
            loading: false,
            typerTimer: null,
            results: []
        }
    },

    computed: {

        items () {
            var items = this.results
            if (items.length <= 0) return false
            else return items
        }

    },

    methods: {

        isFav (itemID) {
            if (this.$store.getters['foodFavorite/id'](itemID)) return true
            else return false
        },

        changeIn () {
            clearTimeout(this.typerTimer)
            this.typerTimer = setTimeout(() => {
                this.loading = true
                this.doSearch()
            }, 800)
        },

        doSearch () {
            if (this.query.length < 3) return
            this.$store.dispatch('foodFavorite/search', this.query).then(res => {
                this.results = res.items
            }).catch(err => {
                this.$notify({ type: 'error', title: this.$t('alert.error.default'), text: err })
            }).finally(() => {
                this.loading = false
            })
        }
    },

    i18n: {
        messages: {
            en: {
                browse: 'Search Items',
                notFound: 'No results',
                amount: 'Amount',
                calories: 'Calories/100',
                total: 'Total'
            },
            de: {
                browse: 'Lebensmittel suchen',
                notFound: 'Keine Suchergebnisse',
                amount: 'Menge',
                calories: 'Kalorien/100',
                total: 'Total'
            }
        }
    }

}
</script>
