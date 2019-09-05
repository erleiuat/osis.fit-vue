<template>
    <vcontainer>
        <v-row align="center">
            <v-col cols="12" class="title">
                {{ $t('title') }}
            </v-col>
        </v-row>

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
                                    {{ item.description }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content class="pa-0" eager>
                        <div class="caption text-right">{{ $t('byUser') }} {{ item.user }}</div>
                        <div class="">{{ $t('ft.description') }}</div>
                        <div class="caption"> {{ item.description }}</div><br />
                    </v-expansion-panel-content>

                    <v-expansion-panel-content class="pa-0" eager>
                        <vcontainer class="pa-0">
                            <v-row dense>
                                <v-col cols="6">
                                    <v-btn small block depressed :to="{name: 'training', params: {type: 'public',id: item.id}}">
                                        {{ $t('btn.open') }}
                                        <v-icon right small>open_in_new</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn small block depressed>
                                        {{ $t('btn.save') }}
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
import training from '@/store/modules/training'

export default {
    name: 'Browse',

    modules: {
        training
    },

    data () {
        return {
            items: [],
            fd: {
                public: true,
                query: null
            }
        }
    },

    mounted () {
        this.$store.dispatch('training/search', this.fd).then(res => {
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
