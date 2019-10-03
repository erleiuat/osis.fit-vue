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
                                    {{ $getByLang($store.getters['app'].locale, item.description) }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content class="pa-0" eager>
                        <div class="caption text-right">{{ $t('byUser') }} {{ item.user }}</div>
                        <div class="">{{ $t('ft.description') }}</div>
                        <div class="caption"> {{ $getByLang($store.getters['app'].locale, item.description) }}</div><br />
                        <div class="">{{ $t('bodyparts') }}</div>
                        <v-chip v-for="(bp, key) in item.bodyparts" :key="key" class="caption ml-1 mr-1 mb-1">
                            {{ $t('pnt.parts.'+bp) }}
                        </v-chip>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content class="pa-0" eager>
                        <vcontainer class="pa-0">
                            <v-row dense>
                                <v-col cols="6">
                                    <v-btn small block depressed :to="{name: 'exercise', params: {type: 'public',id: item.id}}">
                                        {{ $t('btn.view') }}
                                        <v-icon right small>open_in_new</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn small block depressed :to="{name: 'exercise.copy', params: {id: item.id}}">
                                        {{ $t('btn.copy') }}
                                        <v-icon right small>save</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </vcontainer>
                    </v-expansion-panel-content>

                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
    </vcontainer>
</template>

<script>
import exercise from '@/store/modules/exercise'

export default {
    name: 'Browse',

    modules: {
        exercise
    },

    data () {
        return {
            items: [],
            fd: {
                public: true,
                query: null,
                bodyparts: []
            }
        }
    },

    mounted () {
        this.$store.dispatch('exercise/search', this.fd).then(res => {
            this.items = res
        })
    },

    i18n: {
        messages: {
            en: {
                title: 'Browse Templates',
                bodyparts: 'Affected body parts',
                byUser: 'Created by'
            },
            de: {
                title: 'Vorlagen durchsuchen',
                bodyparts: 'Betroffene Körperteile',
                byUser: 'Erstellt von'
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
