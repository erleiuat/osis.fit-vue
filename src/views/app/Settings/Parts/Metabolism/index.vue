<template>
    <vcontainer align="center" class="pb-0">
        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>

            <v-expansion-panels v-model="openPanel" multiple>

                <v-expansion-panel>
                    <v-expansion-panel-header class="caption">
                        {{ $t('calculation') }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="pt-0 body-2">
                        {{ $t('calcInfo') }}
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
                    <v-expansion-panel-content eager>
                        <PAL v-model="fd.pal" />
                    </v-expansion-panel-content>
                </v-expansion-panel>

            </v-expansion-panels>

            <v-row justify="center" dense>
                <v-col cols="12" class="pt-3 pb-2 text-center">
                    <div class="caption">{{ $t('calNeed') }}</div>
                    <div class="title">{{ totalNeed || $t('missing') }}</div>
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
import BMR from '@/views/app/Settings/Parts/Metabolism/BMR'
import PAL from '@/views/app/Settings/Parts/Metabolism/PAL'

export default {
    name: 'EditMetabolism',

    components: {
        BMR, PAL
    },

    data () {
        return {
            openPanel: [],
            cBMR: null,
            sending: false,
            fd: {
                height: null,
                gender: null,
                birthdate: '0000-00-00',
                pal: null
            },
            rule: {
                valid: false,
                require: [
                    v => !!v || this.$t('alert.v.require')
                ],
                dDay: [
                    v => !!v || this.$t('alert.v.require'),
                    v => v >= 1 || this.$t('alert.v.invalid'),
                    v => v <= 31 || this.$t('alert.v.invalid')
                ],
                dMonth: [
                    v => !!v || this.$t('alert.v.require'),
                    v => v >= 1 || this.$t('alert.v.invalid'),
                    v => v <= 12 || this.$t('alert.v.invalid')
                ],
                dYear: [
                    v => !!v || this.$t('alert.v.require'),
                    v => v >= 1900 || this.$t('alert.v.invalid'),
                    v => v <= this.curYear || this.$t('alert.v.invalid')
                ]
            }
        }
    },

    computed: {
        curYear () {
            var nDate = this.$store.getters['today'].date.split('-')
            return nDate[0]
        },
        totalNeed () {
            return this.$store.getters['user/dailyCalorie'](this.fd.pal, this.cBMR)
        }
    },

    mounted () {
        var data = this.$store.getters['user/metabolism']
        this.fd.height = data.height
        this.fd.gender = data.gender
        this.fd.birthdate = data.birthdate || '0000-00-00'
        this.fd.pal = data.pal
        if (!this.fd.height && !this.fd.pal) {
            this.openPanel = [0, 1]
        }
    },

    methods: {

        save () {
            if (!this.$refs.form.validate()) {
                if (!this.cBMR || !this.fd.pal) {
                    var panels = []
                    if (!this.cBMR) panels.push(1)
                    if (!this.fd.pal) panels.push(2)
                    this.openPanel = panels
                    return
                } else this.$t('alert.error.save')
                return
            }

            this.sending = true
            this.$store.dispatch('user/editMetabolism', this.fd).then(r => {
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
                calculation: 'Calculation Info',
                bmr: 'Basal Metabolic Rate',
                pal: 'Physical Activity Level (PAL)',
                calNeed: 'Daily calorie requirement',
                missing: 'Fill in all fields',
                calday: 'Calories / Day',
                calcInfo: `
                    The daily calorie requirement is made up of the basal metabolic rate and the performance metabolic rate 
                    (physical activity). The specification for physical activity (PAL) describes how active you are in everyday 
                    life, whereby additional training units are not included. Instead, you can enter these as "activity" to calculate 
                    your correct calorie balance. Once you have completed both of the steps below (and set your aims), you can find your calorie balance 
                    on the dashboard.
                `
            },
            de: {
                calculation: 'Infos zur Berechnung',
                bmr: 'Grundumsatz',
                pal: 'Körperliche Aktivität (PAL)',
                calNeed: 'Täglicher Kalorienbedarf',
                missing: 'Fülle alle Felder aus',
                calday: 'Kalorien / Tag',
                calcInfo: `
                    Der Tägliche Kalorienbedarf setzt sich aus dem Grundumsatz sowie dem Leistungsumsatz (körperliche Aktivität) zusammen.
                    Die Angabe zur körperlichen Aktivität (PAL) beschreibt wie aktiv man im Alltag ist, wobei zusätzliche Trainingseinheiten nicht
                    mitgerechnet werden. Diese kannst du stattdessen als "Aktivität" eintragen, um deine richtige Kalorienbilanz zu berechnen.
                    Wenn du beide der untenstehenden Angaben erledigt hast (und Ziele definiert), kannst du deine Kalorienbilanz auf dem Dashboard finden.
                `
            }
        }
    }

}
</script>
