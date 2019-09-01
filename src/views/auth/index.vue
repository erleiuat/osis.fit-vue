<template>
    <vcontainer>

        <transition appear name="fade" mode="out-in">
            <router-view>
            </router-view>
        </transition>

        <v-row justify="space-between">
            <v-col cols="auto">
                <v-btn text :to="{ name: 'terms' }">
                    {{ $t('view.terms.title') }}
                </v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn text :to="{ name: 'help' }">
                    {{ $t('view.help.title') }}
                </v-btn>
            </v-col>
        </v-row>

    </vcontainer>
</template>

<script>
export default {
    name: 'Auth',

    methods: {

        check () {
            if (this.$store.getters['auth/details'] === 'authorized') {
                if (this.$route.query.target) this.$router.push({ name: this.$route.query.target.name })
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
