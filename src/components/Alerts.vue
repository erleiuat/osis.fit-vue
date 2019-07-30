<template>
    <notifications position="top center" width="100%" :speed="500">
        <template slot="body" slot-scope="props">
            <v-alert :type="props.item.type" @click="props.close" class="mt-1 mb-1">
                {{ props.item.text }}
            </v-alert>
        </template>
    </notifications>
</template>

<script>
export default {
    name: 'Alerts',

    computed: {
        correctWidth () {
            if (this.$vuetify.breakpoint.smAndDown) return '100%'
            else if (this.$vuetify.breakpoint.mdAndDown) return '70%'
            else return '50%'
        }
    }

}
</script>
