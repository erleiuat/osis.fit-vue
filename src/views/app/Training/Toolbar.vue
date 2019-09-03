<template>
    <Default>

        <v-spacer v-if="btnLink" />
        <v-btn v-if="btnLink" @click="$router.push(btnLink.to)" outlined text>
            <v-icon left>{{ btnLink.icon }}</v-icon> {{ btnLink.text }}
        </v-btn>

        <v-spacer v-if="showSearch" />
        <transition v-if="showSearch" name="fade" mode="out-in">
            <v-text-field v-if="showSearch && search" v-model="query" ref="search" @blur="search = false" autofocus clearable hide-details single-line />
            <v-btn v-else-if="showSearch" @click="search = true" text>
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

        showSearch () {
            var rt = this.$route.name
            if (rt === 'training.exercise.saved') return true
            else return false
        },

        btnLink () {
            var rt = this.$route.name
            if (!this.$vuetify.breakpoint.mdAndUp) return false
            if (rt === 'training.exercise.saved') return {
                to: { name: 'training.exercise.new' },
                text: this.$t('btn.add'),
                icon: 'add'
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
