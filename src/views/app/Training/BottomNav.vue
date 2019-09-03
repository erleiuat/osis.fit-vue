<template>
    <v-bottom-navigation app fixed grow v-if="addNew || savePublic || editOwn">

        <v-menu>
            <template v-slot:activator="{ on }">
                <v-btn v-if="addNew" v-on="on" text>
                    <span>{{ addNew.text }}</span>
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

        <v-btn v-if="savePublic" text @click="$router.push(savePublic.to)">
            <span>{{ savePublic.text }}</span>
            <v-icon>{{ savePublic.icon }}</v-icon>
        </v-btn>

        <v-btn v-if="editOwn" text @click="$router.push(editOwn.to)">
            <span>{{ editOwn.text }}</span>
            <v-icon>{{ editOwn.icon }}</v-icon>
        </v-btn>

    </v-bottom-navigation>
</template>

<script>
export default {
    name: 'BottomNav',

    computed: {
        addNew () {
            if (this.$vuetify.breakpoint.mdAndUp) return false
            else if (this.$route.name !== 'training.exercise.saved') return false
            else {
                return {
                    to: { name: 'training.exercise.new' },
                    toBrowse: { name: 'training.exercise.browse' },
                    text: this.$t('btn.add'),
                    icon: 'add'
                }
            }
        },
        editOwn () {
            if (this.$vuetify.breakpoint.mdAndUp) return false
            else if (this.$route.name !== 'training.exercise') return false
            else if (this.$route.params.type !== 'own') return false
            else {
                return {
                    to: { name: 'training.exercise.edit', params: { id: this.$route.params.id } },
                    text: this.$t('btn.edit'),
                    icon: 'edit'
                }
            }
        },
        savePublic () {
            if (this.$vuetify.breakpoint.mdAndUp) return false
            else if (this.$route.name !== 'training.exercise') return false
            else if (this.$route.params.type !== 'public') return false
            else {
                return {
                    to: { name: 'training.exercise.save', params: { id: this.$route.params.id } },
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
