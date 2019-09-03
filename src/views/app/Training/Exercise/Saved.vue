<template>
    <vcontainer>
        <v-row align="center">
            <v-col cols="10" class="subheading">
                {{ $t('title') }}
            </v-col>
            <v-col cols="2">
                <v-btn fab>
                    <v-icon>add</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <v-row align="center" dense>
            <v-col cols="12" v-for="(item, key) in items" :key="key">
                <v-card :to="{name: 'training.exercise', params: {id: item.id}}">
                    <v-card-text>
                        <v-row align="center">
                            <v-col cols="12" md="2">
                                <div class="title">
                                    {{ item.title }}
                                </div>
                            </v-col>
                            <v-col cols="12" md="10">
                                {{ item.description }}
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
