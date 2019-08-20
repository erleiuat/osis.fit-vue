<template>
    <vcontainer align="center" style="min-height: 400px;">
        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
            <v-row justify="center" dense>
                <v-col cols="12" sm="8" md="6">
                    <v-text-field v-model="fd.weight" :label="$t('weight')" :rules="rule.require" type="number" filled />
                </v-col>
            </v-row>
            <v-row justify="center" dense>
                <v-col cols="12" sm="8" md="6">
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="fd.date" :label="$t('ft.date')" :rules="rule.require" type="date" v-on="on" @focus="menu = true" readonly append-icon="event" filled />
                        </template>
                        <v-date-picker v-model="fd.date" @input="menu = false" :locale="$store.getters['locale']" no-title />
                    </v-menu>
                </v-col>
            </v-row>
            <v-row justify="center" dense>
                <v-col cols="12" sm="4">
                    <v-btn @click="save()" :loading="sending" color="primary" type="submit" block depressed>
                        {{ $t('btn.save') }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </vcontainer>
</template>

<script>
import user from '@/store/modules/user'

export default {
    name: 'EditAims',

    modules: {
        user
    },

    mounted () {
        this.$store.dispatch('user/load')
    },

    data () {
        return {
            menu: false,
            sending: false,
            rule: {
                valid: false,
                require: [
                    v => !!v || this.$t('alert.v.require')
                ]
            }
        }
    },

    computed: {
        fd () {
            return {
                weight: this.$store.state.user.aims.weight,
                date: this.$store.state.user.aims.date
            }
        }
    },

    methods: {

        save () {
            if (!this.$refs.form.validate()) return false

            this.sending = true
            this.$store.dispatch('user/edit', { aims: this.fd }).then(r => {
                this.edit = false
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save'), text: r })
            }).finally(() => {
                this.sending = false
            })
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Aims',
                weight: 'Weight',
                date: 'Date'
            },
            de: {
                title: 'Ziele',
                weight: 'Gewicht',
                date: 'Datum'
            }
        }
    }

}
</script>