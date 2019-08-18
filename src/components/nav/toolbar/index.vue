<template>
    <div>

        <Mobile v-if="$vuetify.breakpoint.xsOnly"></Mobile>
        <Desktop v-else></Desktop>

    </div>
</template>

<script>
const Mobile = () => import('@/components/nav/toolbar/Mobile')
const Desktop = () => import('@/components/nav/toolbar/Desktop')

import toolbar from '@/store/modules/toolbar'

export default {
    name: 'Toolbar',

    components: {
        Mobile, Desktop
    },

    modules: {
        toolbar
    }

}
</script>
