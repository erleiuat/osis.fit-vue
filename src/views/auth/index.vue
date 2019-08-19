<template>
    <transition appear name="fade" mode="out-in">
        <router-view>
        </router-view>
    </transition>
</template>

<script>
export default {
    name: 'Auth',

    methods: {

        check () {
            if (this.$store.getters['authDetail'] === 'authorized')
                if (this.$route.query.target) this.$router.push({ name: this.$route.query.target.name })
                else this.$router.push({ name: 'dashboard' })
            else if (this.$route.name === 'auth')
                this.$router.push({ name: 'auth.login' })
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
