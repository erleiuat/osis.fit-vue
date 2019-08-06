<template>
    <div>

        <v-dialog v-model="show" width="500">
            <v-card>
                <v-card-title>
                    Error Details
                    <v-spacer />
                    <v-btn icon small @click="show = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text>
                    <div class="headline">{{ title }}</div>
                    <div class="body-2">{{ text }}</div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <notifications position="bottom center" width="100%" :speed="500">
            <template slot="body" slot-scope="props">
                <v-layout row wrap :class="$vuetify.breakpoint.mdAndUp ? 'justify-end pr-5 pb-2':'justify-center'">
                    <v-flex xs11 md6 lg5>
                        <v-alert :type="props.item.type" class="mb-1">

                            <v-layout wrap align-center>
                                <v-flex grow @click="props.close">
                                    {{ props.item.title }}
                                </v-flex>
                                <v-flex shrink v-if="props.item.text">
                                    <v-btn icon small @click="showDetail(props.item)">
                                        <v-icon>info</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>

                        </v-alert>
                    </v-flex>
                </v-layout>
            </template>
        </notifications>

    </div>
</template>

<script>
export default {
    name: 'Alerts',
    data () {
        return {
            show: false,
            title: null,
            text: null
        }
    },
    methods: {

        showDetail (content) {
            this.title = content.title
            this.text = content.text
            this.show = true
        }

    }
}
</script>
