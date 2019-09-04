<template>
    <vcontainer align="center">
        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>

            <v-expansion-panels v-model="openPanel" accordion>

                <v-expansion-panel>
                    <v-expansion-panel-header class="caption">
                        {{ $t('calculation') }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        Lorem Déner
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header class="subheader" v-if="cBMR?true:false" disable-icon-rotate>
                        1. {{ $t('bmr') }}: {{ cBMR || $t('missing') }}
                        <template v-slot:actions>
                            <v-icon color="success">check</v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-header class="subheader" v-else disable-icon-rotate>
                        1. {{ $t('bmr') }}
                        <template v-slot:actions>
                            <v-icon color="error">error_outline</v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-divider />
                    <v-expansion-panel-content eager>
                        <BMR v-model="cBMR" :fd="fd" :rule="rule" />
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header class="subheader" v-if="fd.pal?true:false" disable-icon-rotate>
                        2. {{ $t('pal') }}: {{ fd.pal }}
                        <template v-slot:actions>
                            <v-icon color="success">check</v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-header class="subheader" v-else disable-icon-rotate>
                        2. {{ $t('pal') }}
                        <template v-slot:actions>
                            <v-icon color="error">error_outline</v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-divider />
                    <v-expansion-panel-content eager>
                        <PAL v-model="fd.pal" />
                    </v-expansion-panel-content>
                </v-expansion-panel>

            </v-expansion-panels>

            <v-row justify="center">
                <v-col cols="12" class="pt-7 pb-5 text-center">
                    <div class="caption">{{ $t('calNeed') }}</div>
                    <div class="title">{{ Math.round(cBMR * fd.pal) || $t('missing') }}</div>
                </v-col>
            </v-row>

            <v-row justify="center">
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
import BMR from '@/views/app/Settings/Parts/Metabolism/BMR'
import PAL from '@/views/app/Settings/Parts/Metabolism/PAL'

export default {
    name: 'EditMetabolism',

    components: {
        BMR, PAL
    },

    data () {
        return {
            openPanel: null,
            cBMR: null,
            sending: false,
            fd: {
                height: null,
                gender: null,
                birthdate: null,
                pal: null
            },
            rule: {
                valid: false,
                require: [
                    v => !!v || this.$t('alert.v.require')
                ]
            }
        }
    },

    mounted () {
        var data = this.$store.getters['user/metabolism']
        this.fd.height = data.height
        this.fd.gender = data.gender
        this.fd.birthdate = data.birthdate
        this.fd.pal = data.pal
        if (!this.fd.height && !this.fd.pal) {
            this.openPanel = 0
        }
    },

    methods: {

        save () {
            if (!this.$refs.form.validate()) {
                if (!this.cBMR) this.openPanel = 1
                else if (!this.fd.pal) this.openPanel = 2
                else this.$t('alert.error.save')
                return false
            }

            this.sending = true
            this.$store.dispatch('user/editMetabolism', this.fd).then(r => {
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
                calculation: 'Calculation Info',
                bmr: 'Basal Metabolic Rate',
                pal: 'Physical Activity Level (PAL)',
                calNeed: 'Daily calorie requirement',
                missing: 'Fill in all fields',
                calday: 'Calories / Day'
            },
            de: {
                calculation: 'Infos zur Berechnung',
                bmr: 'Grundumsatz',
                pal: 'Körperliche Aktivität (PAL)',
                calNeed: 'Täglicher Kalorienbedarf',
                missing: 'Fülle alle Felder aus',
                calday: 'Kalorien / Tag'
            }
        }
    }

}
</script>
