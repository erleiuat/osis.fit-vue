<template>
    <v-row justify="center" align="center" dense>

        <v-col cols="12" md="5">
            <WeightAdder>
                <template v-slot:default="trigger">
                    <div>
                        <p class="caption mb-0">{{ $t('curWeight') }}</p>
                        <v-btn v-on="trigger.on" depressed block>
                            {{ $store.getters['weight/latest'] ? $store.getters['weight/latest'].weight+' Kg' : '' }}
                            <v-icon small right>edit</v-icon>
                        </v-btn>
                    </div>
                </template>
            </WeightAdder>
        </v-col>

        <v-col cols="12" md="5">
            <v-text-field :label="$t('height')" v-model="fd.height" :rules="rule.require" type="number" suffix="cm" filled />
        </v-col>
        <v-col cols="12" md="5" class="pt-md-3">
            <v-select :label="$t('gender')" v-model="fd.gender" :items="genders" :rules="rule.require" filled />
        </v-col>

        <v-col cols="12" md="5">
            <p class="caption mb-0">{{ $t('birthdate') }}</p>
            <v-row>
                <v-col cols="3" class="pt-0 pr-0">
                    <v-text-field v-model="fbdDay" :rules="rule.dDay" placeholder="DD" type="number" minlength="2" maxlength="2" min="1" max="31" filled single-line />
                </v-col>
                <v-col cols="3" class="pt-0 pr-0">
                    <v-text-field v-model="fbdMonth" :rules="rule.dMonth" placeholder="MM" type="number" minlength="2" maxlength="2" min="1" max="12" filled single-line />
                </v-col>
                <v-col cols="6" class="pt-0">
                    <v-text-field v-model="fbdYear" :rules="rule.dYear" placeholder="YYYY" type="number" minlength="4" maxlength="4" min="1990" :max="curYear" filled single-line />
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="text-center">
            {{ bmr }}
        </v-col>

    </v-row>
</template>

<script>
import WeightAdder from '@/components/adder/Weight'

export default {
    name: 'EditMetabolism',

    components: {
        WeightAdder
    },

    props: [
        'fd', 'rule', 'value'
    ],

    computed: {

        curYear () {
            var nDate = this.$store.getters['today'].date.split('-')
            return nDate[0]
        },

        fbdDay: {
            get () {
                if (this.fd.birthdate) {
                    var nDate = this.fd.birthdate.split('-')
                    if (parseInt(nDate[2]) > 0) return nDate[2]
                }
                return null
            },
            set (val) {
                val = parseInt(val) || 0
                if (val <= 0) val = null
                else if (val <= 9) val = '0' + val
                else if (val > 31) val = 31
                var nDate = this.fd.birthdate.split('-')
                this.fd.birthdate = nDate[0] + '-' + nDate[1] + '-' + val
            }
        },

        fbdMonth: {
            get () {
                if (this.fd.birthdate) {
                    var nDate = this.fd.birthdate.split('-')
                    if (parseInt(nDate[1]) > 0) return nDate[1]
                }
                return null
            },
            set (val) {
                val = parseInt(val) || 0
                if (val <= 9) val = '0' + val
                else if (val > 12) val = 12
                var nDate = this.fd.birthdate.split('-')
                this.fd.birthdate = nDate[0] + '-' + val + '-' + nDate[2]
            }
        },

        fbdYear: {
            get () {
                if (this.fd.birthdate) {
                    var nDate = this.fd.birthdate.split('-')
                    if (parseInt(nDate[0]) > 0) return nDate[0]
                }
                return null
            },
            set (val) {
                val = parseInt(val) || 0
                if (val <= 0) val = '0000'
                else if (val <= 9) val = '000' + val
                else if (val <= 99) val = '00' + val
                else if (val <= 999) val = '0' + val
                else if (val > this.curYear) val = this.curYear
                var nDate = this.fd.birthdate.split('-')
                this.fd.birthdate = val + '-' + nDate[1] + '-' + nDate[2]
            }
        },

        bmr () {
            var rtn = this.$t('bmr') + ': '
            if (!this.$store.getters['weight/latest']) {
                rtn += this.$t('missing')
            } else {
                var tmp = this.$store.getters['user/bmr'](
                    this.$store.getters['weight/latest'].weight,
                    this.fd.height, this.fd.gender, this.fd.birthdate
                )
                if (!tmp) rtn += this.$t('missing')
                else {
                    this.$emit('input', tmp)
                    rtn += tmp + ' ' + this.$t('calday')
                }
            }
            return rtn
        },

        genders () {
            return [
                { text: this.$t('g.male'), value: 'male' },
                { text: this.$t('g.female'), value: 'female' }
            ]
        }

    },

    i18n: {
        messages: {
            en: {
                firstname: 'Firstname',
                lastname: 'Lastname',
                birthdate: 'Birthdate',
                gender: 'Gender',
                height: 'Height',
                curWeight: 'Current weight',
                bmr: 'Basal Metabolic Rate',
                missing: 'Fill in all fields',
                calday: 'Calories / Day',
                g: {
                    null: '-',
                    male: 'Male',
                    female: 'Female'
                }
            },
            de: {
                firstname: 'Vorname',
                lastname: 'Nachname',
                birthdate: 'Geburtsdatum',
                gender: 'Geschlecht',
                height: 'Grösse',
                curWeight: 'Aktuelles Gewicht',
                bmr: 'Grundumsatz',
                missing: 'Fülle alle Felder aus',
                calday: 'Kalorien / Tag',
                g: {
                    null: '-',
                    male: 'Männlich',
                    female: 'Weiblich'
                }
            }
        }
    }

}
</script>
