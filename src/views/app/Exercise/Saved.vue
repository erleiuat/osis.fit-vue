<template>
    <vcontainer>
        <v-row align="center" dense v-if="items.length">
            <v-col cols="12" v-for="(item, key) in items" :key="key">
                <v-card :to="{name: 'exercise', params: {type: 'own', id: item.id}}" link outlined hover>
                    <v-card-text class="pt-1 pb-1">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        {{ $getByLang($store.getters['app'].locale, item.description) }}
                    </v-card-text>
                    <v-card-actions class="pt-0 pb-1">
                        <v-spacer />
                        <v-btn icon :to="{name: 'exercise.edit', params: {id: item.id}}">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
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
                title: 'Saved Exercises',
                noneYet: 'You have no exercises yet',
                noneFound: 'No search results'
            },
            de: {
                title: 'Deine Übungen',
                noneYet: 'Du hast noch keine eigenen Übungen',
                noneFound: 'Keine Suchergebnisse'
            }
        }
    }

}
</script>
