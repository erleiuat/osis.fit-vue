<template>
    <div>
        <MobileMenu v-if="$vuetify.breakpoint.xsOnly" />
        <indexOLD v-else />
    </div>
</template>

<script>
import MobileMenu from '@/views/app/Settings/MobileMenu'
import indexOLD from '@/views/app/Settings/indexOLD'

export default {
    name: 'Settings',

    components: {
        MobileMenu, indexOLD
    }

}
</script>
