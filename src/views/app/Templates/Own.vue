<template>
    <v-container :class="$vuetify.breakpoint.xs ? 'pa-0 grid-list-md': 'grid-list-md'">

        <v-layout row wrap align-center pa-2>
            <v-flex grow>
                <div class="headline">{{ $t('title') }}</div>
            </v-flex>
            <v-flex shrink text-xs-right>
                <TemplateAdder />
            </v-flex>
        </v-layout>

        <v-layout row wrap v-if="items.length > 0" justify-space-around>
            <v-flex xs12 sm6 lg4 v-for="(item, index) in getItems" :key="index">
                <v-card>
                    <v-img v-if="item.imgUrl" :lazy-src="item.imgLazy" :src="item.imgUrl" height="150px" />
                    <v-img v-else :lazy-src="require('@/assets/img/loadingFood.jpg')" :src="require('@/assets/img/defaultFood.jpg')" height="150px" />
                    <v-card-text>
                        <v-layout row wrap class="text-truncate justify-space-between fill-height">
                            <v-flex xs12>
                                <div class="title">{{item.title}}</div>
                            </v-flex>
                            <v-flex shrink>
                                <div class="caption">{{ $t('amount') }}</div>
                                {{item.amount}}
                            </v-flex>
                            <v-flex shrink>
                                <div class="caption">{{ $t('calories') }}</div>
                                {{item.caloriesPer100}}
                            </v-flex>
                            <v-flex shrink>
                                <div class="caption">{{ $t('total') }}</div>
                                {{ Math.round(item.amount/100*item.caloriesPer100) }}
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <TemplateAdder :item="item">
                            <template v-slot:default="trigger">
                                <v-btn icon v-on="trigger.on">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </template>
                        </TemplateAdder>
                        <v-spacer />
                        <v-btn icon @click="toDelete = item, sure = true">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row wrap v-else-if="!$store.state.app.loading">
            <v-flex xs12>
                {{ $t('noneyet') }}
            </v-flex>
        </v-layout>

        <YouSure :show="sure" :affected="toDelete ? toDelete.title : ''" @accept="sure = false, delItem(toDelete)" @decline="toDelete = null, sure = false" />

    </v-container>
</template>

<script>
import YouSure from '@/components/YouSure'
import TemplateAdder from '@/components/adder/Template'

export default {
    name: 'Own',

    components: {
        TemplateAdder, YouSure
    },

    data () {
        return {
            sure: false,
            toDelete: null,
            items: []
        }
    },

    computed: {

        getItems () {
            return this.items
        }

    },

    mounted () {
        this.getData()
    },

    methods: {

        delItem (item) {
            var vm = this
            var index = vm.items.indexOf(item)

            vm.sending = true
            vm.$http.post('user/food/delete/', { id: item.id }).then(function (r) {
                if (index > -1) vm.items.splice(index, 1)
            }).catch(function (e) {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.save') })
            }).finally(function () {
                vm.sending = false
            })
        },

        getData () {
            var vm = this

            vm.$store.commit('loading', true)
            vm.$http.post('user/food/read/').then(function (r) {
                vm.$store.state.data.food = r.data.food || []
                vm.items = vm.$store.state.data.food
            }).catch(function (e) {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.load') })
            }).finally(function () {
                vm.$store.commit('loading', false)
            })
        }

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
