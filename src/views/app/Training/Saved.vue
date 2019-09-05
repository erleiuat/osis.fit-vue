<template>
    <vcontainer>
        <v-row align="center" dense>
            <v-col cols="12" v-for="(item, key) in items" :key="key">
                <v-card :to="{name: 'training', params: {type: 'own', id: item.id}}" link outlined hover>
                    <v-card-text class="pt-1 pb-1">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        {{ item.description }}
                    </v-card-text>
                    <v-card-actions class="pt-0 pb-1">
                        <v-btn icon :to="{name: 'training.edit', params: {id: item.id}}">
                            <v-icon>edit</v-icon>
                        </v-btn><v-spacer />
                        <v-btn icon disabled>
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </vcontainer>
</template>

<script>
import training from '@/store/modules/training'

export default {
    name: 'Saved',

    modules: {
        training
    },

    computed: {
        items () {
            var items = this.$store.getters['training/all']
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
        this.$store.dispatch('training/load')
    },

    i18n: {
        messages: {
            en: {
                title: 'Saved Trainings'
            },
            de: {
                title: 'Deine Pläne'
            }
        }
    }

}
</script>
