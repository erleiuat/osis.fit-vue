<template>
    <vcontainer>
        <v-row align="center" dense v-if="items.length">
            <v-expansion-panels>
                <v-expansion-panel v-for="(item, key) in items" :key="key">

                    <v-expansion-panel-header class="pt-0 pb-0 pl-0">
                        <v-list-item>
                            <v-list-item-avatar v-if="item.image">
                                <v-img :src="item.image.path.small" />
                            </v-list-item-avatar>
                            <v-list-item-avatar v-else>
                                <v-img :src="require('@/assets/img/user.png')" />
                            </v-list-item-avatar>
                            <v-list-item-content style="width: 200px">
                                <v-list-item-title>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ getByLang($store.getters['app'].locale, item.description) }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon v-if="isFav(item.id)" large color="amber">star</v-icon>
                                <v-icon v-else large>star_outline</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content class="pa-0" eager>
                        <div class="caption text-right">{{ $t('byUser') }} {{ item.user }}</div>
                        <div class="caption"> {{ getByLang($store.getters['app'].locale, item.description) }}</div><br />
                    </v-expansion-panel-content>

                    <v-expansion-panel-content class="pa-0" eager>
                        <vcontainer class="pa-0">
                            <v-row dense>
                                <v-col cols="12" md="6">
                                    <v-btn small block depressed :to="{name: 'training', params: {type: 'public',id: item.id}}">
                                        {{ $t('btn.view') }}
                                        <v-icon right small>open_in_new</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-btn v-if="isFav(item.id)" small block depressed @click="toggleFav(item)">
                                        {{ $t('removeFav') }}
                                        <v-icon right small>star_outline</v-icon>
                                    </v-btn>
                                    <v-btn v-else small block depressed @click="toggleFav(item)">
                                        {{ $t('addFav') }}
                                        <v-icon right small>star</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </vcontainer>
                    </v-expansion-panel-content>

                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>

        <v-row justify="center" dense v-else-if="!$store.getters['loading']">
            <v-col cols="auto" v-if="$route.query.s">
                {{ $t('noneFound') }}
            </v-col>
            <v-col cols="auto" v-else>
                {{ $t('noneYet') }}
            </v-col>
        </v-row>

        <v-row justify="center" dense v-else>
            <v-col cols="auto">
                <v-progress-circular indeterminate />
            </v-col>
        </v-row>

    </vcontainer>
</template>

<script>
import training from '@/store/modules/training'

export default {
    name: 'Favorites',

    modules: {
        training
    },

    data () {
        return {
            items: []
        }
    },

    methods: {

        toggleFav (item) {
            if (this.isFav(item.id)) this.$store.dispatch('training/removeFavorite', item.id)
            else this.$store.dispatch('training/addFavorite', item.id)
        },

        isFav (itemID) {
            if (this.$store.getters['training/isFavorite'](itemID)) return true
            else return false
        },

        changeIn () {
            clearTimeout(this.typerTimer)
            this.typerTimer = setTimeout(() => {
                this.doSearch()
            }, 800)
        },

        doSearch () {
            var fd = {
                public: true,
                query: null
            }
            if (this.$route.query.s && this.$route.query.s.length > 3) fd.query = this.$route.query.s
            this.$store.dispatch('training/search', fd).then(res => {
                this.items = res || []
            }).catch(err => {
                this.$notify({ type: 'error', title: this.$t('alert.error.default'), text: err })
            })
        },

        getByLang (lang, string) {
            lang = lang.toUpperCase()
            if (string.includes('[' + lang + ']')) {
                return string.substring(
                    string.lastIndexOf('[' + lang + ']') + 4,
                    string.lastIndexOf('[/' + lang + ']')
                )
            } else if (string.includes('[EN]')) {
                return string.substring(
                    string.lastIndexOf('[EN]') + 4,
                    string.lastIndexOf('[/EN]')
                )
            } else {
                return string
            }
        }

    },

    watch: {
        '$route' (to, from) {
            this.changeIn()
        }
    },

    mounted () {
        var fd = {
            public: true,
            query: null
        }
        if (this.$route.query.s) fd.query = this.$route.query.s
        this.$store.dispatch('training/search', fd).then(res => {
            this.items = res || []
        })
    },

    i18n: {
        messages: {
            en: {
                title: 'Browse Templates',
                bodyparts: 'Affected body parts',
                byUser: 'Created by',
                addFav: 'Add Favorite',
                removeFav: 'Remove Favorite',
                noneYet: 'There are no trainings yet'
            },
            de: {
                title: 'Vorlagen durchsuchen',
                bodyparts: 'Betroffene Körperteile',
                byUser: 'Erstellt von',
                addFav: 'Favorit hinzufügen',
                removeFav: 'Favorit entfernen',
                noneYet: 'Es gibt noch keine Trainings'
            }
        }
    }

}
</script>

<style scoped>
.v-expansion-panel-content__wrap {
    padding: 0 10px 10px !important;
}
</style>
