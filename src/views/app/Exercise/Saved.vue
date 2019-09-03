<template>
    <vcontainer>
        <v-row align="center">
            <v-col cols="12" class="title pt-1">
                {{ $t('title') }}
            </v-col>
        </v-row>

        <v-row align="center" dense>
            <v-col cols="12" v-for="(item, key) in items" :key="key">
                <v-card link outlined>
                    <v-card-text class="pt-1 pb-1">
                        <v-row align="center" no-gutters>
                            <v-col cols="12" md="2" @click="$router.push({name: 'exercise', params: {type: 'own', id: item.id}})">
                                <div class="title">
                                    {{ item.title }}
                                </div>
                            </v-col>
                            <v-col cols="12" md="9" @click="$router.push({name: 'exercise', params: {type: 'own', id: item.id}})">
                                {{ item.description }}
                            </v-col>
                            <v-col cols="12" md="auto" class="text-right">
                                <v-btn icon :to="{name: 'exercise.edit', params: {id: item.id}}">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="12" md="auto" class="text-right">
                                <v-btn icon disabled>
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </vcontainer>
</template>

<script>
import exercise from '@/store/modules/exercise'

export default {
    name: 'Saved',

    modules: {
        exercise
    },

    computed: {
        items () {
            var items = this.$store.getters['exercise/all']
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
        this.$store.dispatch('exercise/load')
        this.$store.dispatch('exercise/loadBodyparts')
    },

    i18n: {
        messages: {
            en: {
                title: 'Saved Exercises'
            },
            de: {
                title: 'Deine Übungen'
            }
        }
    }

}
</script>
