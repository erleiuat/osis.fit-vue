<template>
    <notifications position="bottom center" width="100%" :speed="500">
        <template slot="body" slot-scope="props">
            <v-layout row wrap :class="$vuetify.breakpoint.mdAndUp ? 'justify-end pr-5 pb-2':'justify-center'">
                <v-flex xs11 sm8 md6 lg4 @click="props.close">
                    <v-alert :type="props.item.type" class="mb-1">
                        <v-layout wrap align-center>
                            <v-flex grow>
                                {{ props.item.text }}
                            </v-flex>
                            <v-flex shrink>
                                <v-tooltip top v-if="props.item.detail">
                                    <template v-slot:activator="{ on }">
                                        <v-chip outlined v-on="on">
                                            <v-icon>info</v-icon>
                                        </v-chip>
                                    </template>
                                    <span>{{ props.item.detail }}</span>
                                </v-tooltip>
                            </v-flex>
                        </v-layout>
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
