<template>
    <v-container fluid pa-0>
        <v-flex xs12 v-if="canEdit">
            <Nav />
        </v-flex>
        <transition appear name="fade" mode="out-in">
            <router-view>
            </router-view>
        </transition>
    </v-container>
</template>

<script>
const Nav = () => import('@/views/general/Blog/Editor/Nav')

export default {
    name: 'Blog',

    components: {
        Nav
    },

    computed: {
        canEdit () {
            if (!this.$store.state.auth.login) return false
            else if (
                this.$store.state.auth.user.level === 'admin' ||
                this.$store.state.auth.user.level === 'moderator'
            ) return true
            else return false
        }
    }

}
</script>
