<template>
    <v-img :src="require('@/assets/img/icon_svg_dark.svg')" v-if="$store.getters['app'].dark" :max-height="imgSize" :max-width="imgSize" contain />
    <v-img :src="require('@/assets/img/icon_svg.svg')" v-else :max-height="imgSize" :max-width="imgSize" contain />
</template>

<script>

export default {
    name: 'Icon',

    computed: {
        imgSize () {
            if (this.$vuetify.breakpoint.xsOnly) {
                return 30
            } else {
                return 40
            }
        }
    }

}
</script>
