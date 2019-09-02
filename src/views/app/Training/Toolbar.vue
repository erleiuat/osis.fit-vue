<template>
    <Default>
        <v-spacer />
        <transition name="fade" mode="out-in">
            <v-text-field v-if="search" v-model="query" ref="search" @blur="search = false" autofocus clearable hide-details single-line />                
            <v-btn v-else-if="query" @click="search = true" text large>
                <v-icon left>search</v-icon> <strong>{{ query }}</strong>
            </v-btn>
            <v-btn v-else @click="search = true" icon>
                <v-icon>search</v-icon>
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
