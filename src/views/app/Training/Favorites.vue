<template>
    <vcontainer>
        <v-row align="center" dense v-if="items.length">
            <v-expansion-panels>
                <v-expansion-panel v-for="(item, key) in items" :key="key">

                    <v-expansion-panel-header class="pt-0 pb-0 pl-0">
                        <v-list-item>
                            <v-list-item-content style="width: 200px">
                                <v-list-item-title>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ item.description }}
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
                        <div class="caption"> {{ item.description }}</div><br />
                    </v-expansion-panel-content>

                    <v-expansion-panel-content class="pa-0" eager>
                        <vcontainer class="pa-0">
                            <v-row dense>
                                <v-col cols="6">
                                    <v-btn small block depressed :to="{name: 'training', params: {type: 'public',id: item.id}}">
                                        {{ $t('btn.view') }}
                                        <v-icon right small>open_in_new</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="6">
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

    computed: {
        items () {
            var items = this.$store.getters['training/favorites']
            var query = this.$route.query.s || ''
            if (!items) return false

            var filtered = items.filter(el =>
                el.title.toUpperCase().includes(query.toUpperCase())
            )

            if (filtered.length <= 0) return false
            else return filtered
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
        }

    },

    mounted () {
        this.$store.dispatch('training/loadFavorites')
    },

    i18n: {
        messages: {
            en: {
                title: 'Browse Templates',
                bodyparts: 'Affected body parts',
                byUser: 'Created by',
                addFav: 'Add Favorite',
                removeFav: 'Remove Favorite',
                noneYet: 'You have no Favorites yet',
                noneFound: 'No search results'
            },
            de: {
                title: 'Vorlagen durchsuchen',
                bodyparts: 'Betroffene Körperteile',
                byUser: 'Erstellt von',
                addFav: 'Favorit hinzufügen',
                removeFav: 'Favorit entfernen',
                noneYet: 'Du hast noch keine Favoriten',
                noneFound: 'Keine Suchergebnisse'
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
