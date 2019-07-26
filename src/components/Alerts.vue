<template>
    <notifications position="bottom center" :width="correctWidth" :speed="500">
        <template slot="body" slot-scope="props">
            <v-alert :value="true" :type="props.item.type" @click="props.close" class="elevation-5 mb-0">
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
