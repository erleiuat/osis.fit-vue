<template>
    <transition appear name="fade" mode="out-in">
        <router-view>
        </router-view>
    </transition>
</template>

<script>
export default {
    name: 'Premium',

    methods: {

        check () {
            if (this.$route.query.notify)
                this.$notify({ type: 'info', title: this.$t('alert.premiumOnly') })

            if (this.$route.name === 'premium') {
                var sub = this.$store.getters['auth/billing']
                if (sub.subscription) this.$router.push({ name: 'premium.settings' })
                else this.$router.push({ name: 'premium.new' })
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
