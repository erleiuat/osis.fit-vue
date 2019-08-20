<template>
    <vcontainer fluid>
        <transition appear v-if="$vuetify.breakpoint.smAndDown" name="fade" mode="out-in">

            <MobileMenu v-if="$route.name === 'settings'" />
            <router-view v-else />

        </transition>

        <DesktopMenu v-if="!$vuetify.breakpoint.smAndDown" />

    </vcontainer>
</template>

<script>
import MobileMenu from '@/views/app/Settings/Layout/MobileMenu'
import DesktopMenu from '@/views/app/Settings/Layout/DesktopMenu'

export default {
    name: 'Settings',

    components: {
        MobileMenu, DesktopMenu
    }

}
</script>
