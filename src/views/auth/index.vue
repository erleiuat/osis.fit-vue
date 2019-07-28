<template>
    <v-container fluid fill-height>
        <v-layout row fill-height align-content-center>
            <v-flex xs12>
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

        doLogin (tkn, target) {
            var token = tkn || this.$store.state.auth.token
            this.$store.commit('login', token)
            if (token) this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
            else this.$http.defaults.headers.common['Authorization'] = ''
            this.$router.push(target)
        },

        checkStates () {
            var to = this.$route.name
            var loggedin = this.$store.state.auth.login || false
            var cookie = this.$cookies.get('app_token') || false
            var target = this.$route.query.target || { name: 'dashboard' }

            if (loggedin && to === 'auth.logout') return
            if (!loggedin && !cookie && to === 'auth.verify') return
            if (!loggedin && !cookie && to === 'auth.register') return
            if (!loggedin && !cookie && to === 'auth.login') return

            if (loggedin && cookie) this.$router.push(target)
            else if (!loggedin && cookie) this.doLogin(cookie, target)
            else this.$router.push({ name: 'auth.login' })
        }

    },

    updated () {
        this.checkStates()
    },

    beforeMount () {
        this.checkStates()
    }

}
</script>
