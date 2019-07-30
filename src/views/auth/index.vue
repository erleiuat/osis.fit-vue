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
            this.$store.dispatch('auth/check').then(r => {
                if (this.$route.name === 'auth.logout') return
                this.$router.push(this.$route.query.target || { name: 'dashboard' })
            }).catch(r => {
                if (this.$route.name === 'auth.verify') return
                if (this.$route.name === 'auth.register') return
                if (this.$route.name === 'auth.login') return
                if (this.$route.name === 'auth.forgotten') return
                this.$router.push({ name: 'auth.login' })
            })
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
