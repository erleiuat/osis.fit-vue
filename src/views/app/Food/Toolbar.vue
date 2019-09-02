<template>
    <Default>

        <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
        <v-btn @click="$router.push({name: 'food.add'})" v-if="$vuetify.breakpoint.mdAndUp" outlined text>
            <v-icon left>add</v-icon> {{ $t('btn.add') }}
        </v-btn>

        <v-spacer />
        <transition name="fade" mode="out-in">
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
