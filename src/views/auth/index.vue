<template>
    <v-container grid-list-xl fill-height>
        <v-layout wrap justify-center align-center>
            <v-flex xs12 sm8>
                <transition appear name="fade" mode="out-in">
                    <router-view>
                    </router-view>
                </transition>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Auth',

    methods: {

        check () {
            if (this.$route.name === 'auth.logout') return
            else if (this.$route.name === 'auth.verify') return
            else if (this.$route.name === 'auth.register') return
            else if (this.$route.name === 'auth.forgotten') return
            else {
                var target = (this.$route.query.target || { name: 'dashboard' })
                this.$router.push({ name: 'auth.login', query: { target: target } })
            }
        }

    },

    updated () {
        this.check()
    },

    beforeMount () {
        this.check()
    }

}
</script>
