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
        <v-col cols="12" md="5">
            <v-select :label="$t('gender')" v-model="fd.gender" :items="genders" :rules="rule.require" filled />
        </v-col>
        <v-col cols="12" md="5">
            <v-text-field v-model="fd.birthdate" :label="$t('birthdate')" type="date" append-icon="event" filled />
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
