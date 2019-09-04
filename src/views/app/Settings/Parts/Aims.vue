<template>
    <vcontainer align="center" style="min-height: 400px;">
        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
            <v-row justify="center" dense>
                <v-col cols="12" sm="8" md="6">
                    <v-text-field v-model="fd.weight" :label="$t('weight')" :rules="rule.require" type="number" suffix="Kg" filled />
                </v-col>
            </v-row>
            <v-row justify="center" dense>
                <v-col cols="12" sm="8" md="6">
                    <v-text-field v-model="fd.date" :label="$t('ft.date')" :rules="rule.require" type="date" append-icon="event" filled />
                </v-col>
            </v-row>
            <v-row justify="center" dense>
                <v-col cols="12" sm="4">
                    <v-btn @click="save()" :loading="sending" :disabled="!rule.valid" type="submit" color="primary" block depressed>
                        {{ $t('btn.save') }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </vcontainer>
</template>

<script>
export default {
    name: 'EditAims',

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
            var data = this.$store.getters['user/aims']
            return {
                weight: data.weight,
                date: data.date
            }
        }
    },

    methods: {

        save () {
            if (!this.$refs.form.validate()) return false

            this.sending = true
            this.$store.dispatch('user/editAims', this.fd).then(r => {
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
                if (this.$vuetify.breakpoint.smAndDown) this.$router.push({ name: 'settings' })
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
