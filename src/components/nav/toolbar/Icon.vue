<template>
    <v-img :src="require('@/assets/img/icon_dark.png')" v-if="$store.getters['app'].dark" :max-height="imgSize" :max-width="imgSize" />
    <v-img :src="require('@/assets/img/icon.png')" v-else :max-height="imgSize" :max-width="imgSize" />
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
