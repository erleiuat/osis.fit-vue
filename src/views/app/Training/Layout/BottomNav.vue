<template>
    <v-fab-transition v-if="!$vuetify.breakpoint.mdAndUp">

        <v-btn v-if="addNew" @click="$router.push(addNew.to)" fab fixed bottom right color="primary">
            <v-icon>{{ addNew.icon }}</v-icon>
        </v-btn>

        <v-btn v-if="editOwn" @click="$router.push(editOwn.to)" fab fixed bottom right color="primary">
            <v-icon>{{ editOwn.icon }}</v-icon>
        </v-btn>

    </v-fab-transition>
</template>

<script>
export default {
    name: 'BottomNav',

    computed: {
        addNew () {
            if (this.$vuetify.breakpoint.mdAndUp) return false
            else if (this.$route.name !== 'training.saved') return false
            else {
                return {
                    to: { name: 'training.new' },
                    toBrowse: { name: 'training.browse' },
                    text: this.$t('btn.add'),
                    icon: 'add'
                }
            }
        },
        editOwn () {
            if (this.$vuetify.breakpoint.mdAndUp) return false
            else if (this.$route.name !== 'training') return false
            else if (this.$route.params.type !== 'own') return false
            else {
                return {
                    to: { name: 'training.edit', params: { id: this.$route.params.id } },
                    text: this.$t('btn.edit'),
                    icon: 'edit'
                }
            }
        }
    },

    i18n: {
        messages: {
            en: {
                calories: 'Calories',
                activity: 'Activity',
                weight: 'Weight'
            },
            de: {
                calories: 'Kalorien',
                activity: 'Aktivität',
                weight: 'Gewicht'
            }
        }
    }

}
</script>
