<template>
    <transition v-if="$vuetify.breakpoint.smAndDown" name="fade" mode="out-in">
        <MobileMenu v-if="$route.name === 'settings'" />
        <router-view v-else class="pt-2" />
    </transition>
    <DesktopMenu v-else />
</template>

<script>
import MobileMenu from '@/views/app/Settings/Layout/MobileMenu'
import DesktopMenu from '@/views/app/Settings/Layout/DesktopMenu'

export default {
    name: 'Settings',

    components: {
        MobileMenu, DesktopMenu
    },

    mounted () {
        this.$store.dispatch('user/load')
    }

}
</script>
