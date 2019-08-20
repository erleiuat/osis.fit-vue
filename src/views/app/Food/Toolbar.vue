<template>
    <Default>

        <v-app-bar-nav-icon @click.stop="drawer()" />

        <v-spacer />

        <transition name="fade" mode="out-in">
            <v-text-field v-if="search" v-model="query" ref="search" @blur="search = false" autofocus clearable hide-details single-line>
                asdfasdf
            </v-text-field>
            <v-btn v-else-if="query" @click="search = true" text large>
                <v-icon left>search</v-icon> <strong>{{ query }}</strong>
            </v-btn>
            <v-btn v-else @click="search = true" icon>
                <v-icon>search</v-icon>
            </v-btn>
        </transition>

        <v-btn @click="$router.push({name: 'food.add'})" v-if="$vuetify.breakpoint.mdAndUp" large text>
            <v-icon left>add</v-icon> {{ $t('btn.add') }}
        </v-btn>

    </Default>
</template>

<script>
import Default from '@/components/nav/toolbar/Default'

export default {
    name: 'Toolbar',

    data () {
        return {
            search: false
        }
    },

    components: {
        Default
    },

    methods: {
        drawer () {
            this.$store.dispatch('drawer')
        }
    },

    computed: {
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
