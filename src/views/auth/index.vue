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
            if (this.$store.getters['auth/check'] === 'authorized') {
                if (this.$route.name === 'auth.logout') return 
                else if (this.$route.query.target) this.$router.push({ name: target })
                else this.$router.push({ name: 'dashboard' })
            } else if (this.$route.name === 'auth') {
                this.$router.push({ name: 'auth.login' })
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
