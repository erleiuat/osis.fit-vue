<template>
    <notifications position="bottom center" width="100%" :speed="500">
        <template slot="body" slot-scope="props">
            <v-layout row wrap :class="$vuetify.breakpoint.mdAndUp ? 'justify-end pr-5':'justify-center'">
                <v-flex xs11 sm8 md6 lg3 @click="props.close">
                    <v-alert :type="props.item.type" class="mb-1">
                        {{ props.item.text }}
                    </v-alert>
                </v-flex>
            </v-layout>
        </template>
    </notifications>
</template>

<script>
export default {
    name: 'Alerts'
}
</script>
