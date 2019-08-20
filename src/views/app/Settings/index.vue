<template>
    <vcontainer fluid>

        <MobileMenu v-if="$vuetify.breakpoint.smAndDown && $route.name === 'settings'" />
        <router-view v-if="$vuetify.breakpoint.smAndDown && $route.name !== 'settings'">
        </router-view>

        <DesktopMenu v-if="!$vuetify.breakpoint.smAndDown" />
        
    </vcontainer>
</template>

<script>
import MobileMenu from '@/views/app/Settings/MobileMenu'
import DesktopMenu from '@/views/app/Settings/DesktopMenu'

export default {
    name: 'Settings',

    components: {
        MobileMenu, DesktopMenu
    }

}
</script>
