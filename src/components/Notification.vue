<template>
    <div>

        <v-dialog v-model="show" width="500">
            <v-card>

                <v-card-title class="title">
                    Error Details
                    <v-spacer />
                    <v-btn icon @click="show = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <div class="headline">{{ title }}</div>
                </v-card-text>
                <v-card-text>
                    <div class="body-2">{{ text }}</div>
                </v-card-text>

            </v-card>
        </v-dialog>

        <notifications position="bottom center" width="100%" :speed="500" :duration="50000">
            <template slot="body" slot-scope="props">
                <v-container fluid class="pb-0 pt-0" @click="props.close">
                    <v-alert :type="props.item.type">
                        <v-row justify="center" no-gutters>
                            <v-col>
                                {{ props.item.title }}
                            </v-col>
                            <v-col align="end" v-if="props.item.text">
                                <v-btn icon small @click="showDetail(props.item)">
                                    <v-icon>mdi-information-outline</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-alert>
                </v-container>
            </template>
        </notifications>

    </div>
</template>

<script>
export default {
    name: 'Notification',

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
