<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header class="body-1">
                {{ $t('caloriesCalc') }}{{ exampleCals ? ': '+exampleCals+" "+$t('perHour') : '' }}
            </v-expansion-panel-header>
            <v-expansion-panel-content eager>
                <v-row no-gutters>
                    <v-col cols="12" md="6">
                        <v-text-field :label="$t('calsPerDo')" v-model="calories" type="number" filled suffix="Kcal/h/Kg" />
                    </v-col>

                    <v-col cols="auto" md="6" class="pb-5 text-center">
                        <b>{{ $t('calsByYou') }}: </b><br />
                        {{ exampleCals ? exampleCals : '...' }} <i> {{ $t('perHour') }}</i>
                    </v-col>
                </v-row>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
    name: 'Calories',

    props: [
        'value'
    ],

    computed: {
        calories: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        },
        exampleCals () {
            if (!this.calories) return false
            if (!this.$store.getters['weight/latest']) return false
            var weight = this.$store.getters['weight/latest'].weight
            var result = this.calories * 1 * weight
            return result
        }
    },

    i18n: {
        messages: {
            en: {
                caloriesCalc: 'Calories burned',
                calsPerDo: 'Calories burned per hour per Kg bodyweight',
                calsByYou: '= Calories burned with your weight',
                perHour: '/ Hour'
            },
            de: {
                caloriesCalc: 'Kalorienverbrauch',
                calsPerDo: 'Kalorienverbrauch pro Stunde pro Kg Körpergewicht',
                calsByYou: '= Kalorienverbrauch mit deinem Gewicht',
                perHour: '/ Stunde'
            }
        }
    }

}
</script>
