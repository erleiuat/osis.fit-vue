<template>
    <vcontainer align="center" style="min-height: 400px;">
        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>

            <v-row justify="center" dense>

                <v-col cols="12" sm="10" v-if="!canDo" class="text-center">
                    {{ $t('doMetaFirst') }} <br /><br />
                    <v-btn :to="{name: 'settings.metabolism'}" block color="primary" depressed>
                        {{ $t('goMeta') }} <v-icon right small>open_in_new</v-icon>
                    </v-btn>
                    <v-divider class="mt-5 mb-3" />
                </v-col>

                <v-col cols="12" sm="10" v-if="canDo">
                    <v-alert :type="alertInfo.type">
                        <h3 class="headline">{{ alertInfo.val }} {{ $t('calday') }}</h3>
                        <div class="caption">{{ $t(alertInfo.text) }}</div>
                    </v-alert>
                </v-col>

                <v-col cols="12" sm="5">
                    <v-text-field v-model="fd.weight" :label="$t('weight')" :rules="rule.require" type="number" suffix="Kg" :disabled="!canDo" filled />
                </v-col>
                <v-col cols="12" sm="5">
                    <v-text-field v-model="fd.date" :label="$t('date')" :rules="rule.require" type="date" append-icon="event" :disabled="!canDo" filled />
                </v-col>

            </v-row>

            <v-row justify="center" dense>
                <v-col cols="12" sm="4">
                    <v-btn @click="save()" :loading="sending" :disabled="!rule.valid || !canDo" type="submit" color="primary" block depressed>
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
            fd: {
                weight: null,
                date: null
            },
            rule: {
                valid: false,
                require: [
                    v => !!v || this.$t('alert.v.require')
                ]
            }
        }
    },

    computed: {

        alertInfo () {
            var value = this.dailyRequire + this.dailyTarget
            if (!this.dailyTarget) {
                return {
                    type: 'info',
                    text: 'info.doit',
                    val: '...'
                }
            }
            if (value < 300) {
                return {
                    type: 'error',
                    text: 'info.danger',
                    val: value
                }
            }
            if (value < 900) {
                return {
                    type: 'warning',
                    text: 'info.warn',
                    val: value
                }
            }
            return {
                type: 'success',
                text: 'info.good',
                val: value
            }
        },

        canDo () {
            if (this.lastWeight !== false && this.user !== false) return true
            else return false
        },

        lastWeight () {
            var lWeight = this.$store.getters['weight/latest'] || { weight: 0 }
            if (lWeight.weight <= 0) return false
            return lWeight.weight
        },

        user () {
            var data = this.$store.getters['user/metabolism']
            if (!data.gender || !data.height || !data.birthdate) return false
            return {
                gender: data.gender,
                height: data.height,
                birthdate: data.birthdate,
                pal: data.pal
            }
        },

        dailyTarget () {
            if (!this.fd.date || !this.fd.weight) return false
            var diff = new Date(this.fd.date).getTime() - new Date().getTime()
            var days = Math.round(diff / (1000 * 60 * 60 * 24))
            return Math.round(
                (this.fd.weight - this.lastWeight) /
                days * 7000
            )
        },

        dailyRequire () {
            return this.$store.getters['user/dailyCalorie'](this.user.pal, this.bmr)
        },

        bmr () {
            var dayNeed = this.$store.getters['user/bmr'](
                this.lastWeight,
                this.user.height, this.user.gender, this.user.birthdate
            )
            return Math.round(dayNeed)
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

    mounted () {
        var data = this.$store.getters['user/aims']
        this.fd.weight = data.weight
        this.fd.date = data.date
    },

    i18n: {
        messages: {
            en: {
                title: 'Aims',
                weight: 'How much do you want to weigh?',
                date: 'By when do you want to reach the goal?',
                calday: 'Calories / Day',
                info: {
                    doit: 'Enter your goals and try to generate a good result',
                    good: 'Good target! From 900+ calories/day you should be able to reach your goals with little effort.',
                    warn: 'Critical target! It may require some effort to achieve this goal. Maybe you should give yourself a little more time?',
                    danger: 'Very critical target! We advise you not to lose so much so quickly, as this could also become unhealthy. Give yourself a little more time!'
                }
            },
            de: {
                title: 'Ziele',
                weight: 'Wie viel möchtest du wiegen?',
                date: 'Bis wann möchtest du das Ziel erreichen?',
                calday: 'Kalorien / Tag',
                info: {
                    doit: 'Trage deine Ziele ein und versuche ein gutes Resultat zu generieren',
                    good: 'Gutes Ziel! Ab 900+ Kalorien/Tag solltest du deine Ziele mit wenig Aufwand erreichen können.',
                    warn: 'Kritisches Ziel! Es könnte einiges an Aufwand erfordern, um dieses Ziel zu erreichen. Vielleicht solltest du dir etwas mehr Zeit geben?',
                    danger: 'Sehr kritisches Ziel! Wir raten dir ab so schnell so viel abzunehmen, da dies auch ungesund werden könnte. Gib dir etwas mehr Zeit!'
                },
                doMetaFirst: 'Berechne zuerst deinen Stoffwechsel um gute und gesunde Ziele bestimmen zu können:',
                goMeta: 'Berechnen'
            }
        }
    }

}
</script>
