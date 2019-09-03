<template>
    <Default>

        <template v-slot:toggler v-if="showBack">
            <v-btn icon @click="$router.go(-1)">
                <v-icon>
                    navigate_before
                </v-icon>
            </v-btn>
        </template>

        <v-spacer v-if="savePublic" />
        <v-btn v-if="savePublic" @click="$router.push(savePublic.to)" outlined text>
            <v-icon left>{{ savePublic.icon }}</v-icon> {{ savePublic.text }}
        </v-btn>

        <v-spacer v-if="editOwn" />
        <v-btn v-if="editOwn" @click="$router.push(editOwn.to)" outlined text>
            <v-icon left>{{ editOwn.icon }}</v-icon> {{ editOwn.text }}
        </v-btn>

        <v-spacer v-if="addNew" />
        <v-menu>
            <template v-slot:activator="{ on }">
                <v-btn v-if="addNew" v-on="on" outlined text>
                    <v-icon left>{{ addNew.icon }}</v-icon> {{ addNew.text }}
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

        <v-spacer v-if="showSearch" />
        <transition v-if="showSearch" name="fade" mode="out-in">
            <v-text-field v-if="search" v-model="query" ref="search" @blur="search = false" autofocus clearable hide-details single-line />
            <v-btn v-else @click="search = true" text>
                <strong>{{ query || $t('btn.search') }}</strong>
                <v-icon right>search</v-icon>
            </v-btn>
        </transition>

    </Default>
</template>

<script>
import Default from '@/components/nav/toolbar/Default'

export default {
    name: 'Toolbar',

    components: {
        Default
    },

    data () {
        return {
            search: false
        }
    },

    computed: {

        showBack () {
            if (!this.$vuetify.breakpoint.smAndDown) return false
            else if (this.$route.name === 'exercise.saved') return false
            else return true
        },

        showSearch () {
            if (this.$route.name === 'exercise.saved') return true
            else if (this.$route.name === 'exercise.browse') return true
            else return false
        },

        savePublic () {
            if (!this.$vuetify.breakpoint.mdAndUp) return false
            else if (this.$route.name !== 'exercise') return false
            else if (this.$route.params.type !== 'public') return false
            else {
                return {
                    to: { name: 'exercise.save' },
                    text: this.$t('btn.save'),
                    icon: 'save'
                }
            }
        },

        editOwn () {
            if (!this.$vuetify.breakpoint.mdAndUp) return false
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

        addNew () {
            if (!this.$vuetify.breakpoint.mdAndUp) return false
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

        query: {
            get () {
                return this.$route.query.s
            },
            set (val) {
                this.$router.replace({ query: { s: val } })
            }
        }

    }

}
</script>
