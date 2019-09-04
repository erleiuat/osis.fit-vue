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
                    <v-divider></v-divider>
                    <v-expansion-panel-content class="pt-2">
                        <div class="">{{ $t('ft.description') }}</div>
                        <div class="caption"> {{ item.description }}</div><br />
                        <div class="">{{ $t('bodyparts') }}</div>
                        <v-chip v-for="(bp, key) in item.bodyparts" :key="key" class="caption ml-1 mr-1 mb-1">
                            {{ $t('pnt.parts.'+bp) }}
                        </v-chip>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content class="pa-0">
                        <v-btn :to="{name: 'exercise', params: {type: 'public', id: item.id}}">
                            asdf
                        </v-btn>
                    </v-expansion-panel-content>

                </v-expansion-panel>

            </v-expansion-panels>
            <!--
            <v-col cols="12">
                <v-list three-line>
                    <v-list-item v-for="(item, key) in items" :key="key" :to="{name: 'exercise', params: {type: 'public', id: item.id}}">

                        <v-list-item-avatar v-if="item.image">
                            <v-img :src="item.image.path.small" />
                        </v-list-item-avatar>
                        <v-list-item-avatar v-else>
                            <v-img :src="require('@/assets/img/user.png')" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>
                                <v-list-item-title v-text="item.title"></v-list-item-title>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ item.description }}
                            </v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>

                        </v-list-item-action>

                    </v-list-item>
                </v-list>
            </v-col>
            -->
            <!--
            <v-col cols="12" v-for="(item, key) in items" :key="key">
                <v-card :to="{name: 'exercise', params: {type: 'public', id: item.id}}" link outlined hover>
                    <v-card-text class="pt-1 pb-1">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        {{ item.description }}
                    </v-card-text>
                </v-card>
            </v-col>
            -->
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
                bodyparts: 'Affected body parts'
            },
            de: {
                title: 'Vorlagen durchsuchen',
                bodyparts: 'Betroffene Körperteile'
            }
        }
    }

}
</script>
