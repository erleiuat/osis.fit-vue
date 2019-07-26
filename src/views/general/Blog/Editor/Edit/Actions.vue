<template>
    <v-container fluid grid-list-xl>
        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
            <v-layout row wrap justify-space-around>

                <v-flex xs12 md8>
                    <v-layout column wrap justify-space-around>
                        <v-flex xs12 md8>
                            <v-text-field :label="$t('ft.title')" v-model="fd.title" :rules="rule.require" type="text" />
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs12 md4>
                    <v-layout column wrap justify-space-around>
                        <v-flex xs12 md4>
                            <v-btn block depressed color="primary">
                                Speichern
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>

            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: 'Edit',

    data () {
        return {
            sending: false,
            fd: {
                id: '',
                title: '',
                image: '',
                preview: '',
                content: '',
                url: '',
                language: '',
                creation_date: '',
                creation_time: '',
                design_color: '',
                design_dark: ''
            },
            rule: {
                valid: false,
                require: [
                    v => !!v || this.$t('alert.v.require')
                ]
            }
        }
    }

}
</script>
