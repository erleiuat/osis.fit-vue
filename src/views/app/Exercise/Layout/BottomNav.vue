<template>
    <v-fab-transition v-if="!$vuetify.breakpoint.mdAndUp">

        <v-menu v-if="addNew">
            <template v-slot:activator="{ on }">
                <v-btn v-if="addNew" v-on="on" fab fixed bottom right color="primary">
                    <v-icon>{{ addNew.icon }}</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item @click="$router.push(addNew.to)">
                    <v-list-item-title>
                        Neue erstellen
                    </v-list-item-title>
                </v-list-item>
                <v-list-item @click="$router.push(addNew.toBrowse)">
                    <v-list-item-title>
                        Vorlagen durchsuchen
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-btn v-if="savePublic" @click="$router.push(savePublic.to)" fab fixed bottom right color="primary">
            <v-icon>{{ savePublic.icon }}</v-icon>
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
            else if (this.$route.name !== 'exercise.saved') return false
            else {
                return {
                    to: { name: 'exercise.new' },
                    toBrowse: { name: 'exercise.browse' },
                    text: this.$t('btn.add'),
                    icon: 'add'
                }
            }
        },
        editOwn () {
            if (this.$vuetify.breakpoint.mdAndUp) return false
            else if (this.$route.name !== 'exercise') return false
            else if (this.$route.params.type !== 'own') return false
            else {
                return {
                    to: { name: 'exercise.edit', params: { id: this.$route.params.id } },
                    text: this.$t('btn.edit'),
                    icon: 'edit'
                }
            }
        },
        savePublic () {
            if (this.$vuetify.breakpoint.mdAndUp) return false
            else if (this.$route.name !== 'exercise') return false
            else if (this.$route.params.type !== 'public') return false
            else {
                return {
                    to: { name: 'exercise.copy', params: { id: this.$route.params.id } },
                    text: this.$t('btn.save'),
                    icon: 'save'
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
