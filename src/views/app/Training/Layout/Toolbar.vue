<template>
    <Default>

        <template v-slot:toggler v-if="showBack">
            <v-btn icon @click="$router.go(-1)">
                <v-icon>arrow_back</v-icon>
            </v-btn>
        </template>

        <v-spacer v-if="editOwn" />
        <v-btn v-if="editOwn" @click="$router.push(editOwn.to)" outlined text>
            <v-icon left>{{ editOwn.icon }}</v-icon> {{ editOwn.text }}
        </v-btn>

        <v-spacer v-if="addNew" />
        <v-btn v-if="addNew" @click="$router.push(addNew.to)" outlined text>
            <v-icon left>{{ addNew.icon }}</v-icon> {{ addNew.text }}
        </v-btn>

        <v-spacer v-if="showSearch" />
        <transition v-if="showSearch" name="fade" mode="out-in">
            <v-text-field v-if="search" v-model="query" ref="search" @blur="search = false" autofocus clearable hide-details single-line />
            <v-btn v-else @click="search = true" text>
                <strong>{{ query || $t('btn.search') }}</strong>
                <v-icon right>search</v-icon>
            </v-btn>
        </transition>

        <v-spacer v-if="showTitle" />
        <v-toolbar-title v-if="showTitle">
            {{ showTitle }}
        </v-toolbar-title>

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

        showTitle () {
            var doShow = false
            if (this.$route.name === 'training.new') doShow = true
            else if (this.$route.name === 'training.edit') doShow = true
            else if (this.$vuetify.breakpoint.smAndDown) {
                if (this.$route.name === 'training') doShow = true
                else if (this.$route.name === 'training.edit') doShow = true
            }
            if (doShow) return this.$t('view.' + this.$route.name + '.title')
            else return false
        },

        showBack () {
            if (!this.$vuetify.breakpoint.smAndDown) return false
            else if (this.$route.name === 'training.saved') return false
            else return true
        },

        showSearch () {
            if (this.$route.name === 'training.saved') return true
            else if (this.$route.name === 'training.browse') return true
            else if (this.$route.name === 'training.favorites') return true
            else return false
        },

        editOwn () {
            if (!this.$vuetify.breakpoint.mdAndUp) return false
            else if (this.$route.name !== 'training') return false
            else if (this.$route.params.type !== 'own') return false
            else {
                return {
                    to: { name: 'training.edit', params: { id: this.$route.params.id } },
                    text: this.$t('btn.edit'),
                    icon: 'edit'
                }
            }
        },

        addNew () {
            if (!this.$vuetify.breakpoint.mdAndUp) return false
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
