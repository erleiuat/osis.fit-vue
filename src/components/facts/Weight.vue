<template>
    <v-card :color="state.color" :dark="state.dark">

        <v-card-title class="display-1">
            {{ $t('title') }}
        </v-card-title>

        <v-card-text>
            <v-layout wrap align-end>

                <v-flex xs6>
                    <div class="display-2">{{ cVals.weight }}</div>
                    <div class="caption" v-if="cVals.aimWeight">{{ $t('target') }}: {{ cVals.aimWeight }}</div>
                </v-flex>

                <v-flex xs6 text-right class="caption" v-if="cVals.aimWeight">
                    {{ diff }} Kg {{ $t('difference') }}
                </v-flex>

            </v-layout>
        </v-card-text>

    </v-card>
</template>

<script>
export default {
    name: 'WeightFacts',

    props: {
        cVals: {
            weight: Number,
            aimWeight: Number
        }
    },

    computed: {

        state () {
            if (!this.cVals.weight || !this.cVals.aimWeight)
                return { dark: false, color: '' }
            if (this.diff > 10)
                return { dark: true, color: 'error' }
            if (this.diff > 5)
                return { dark: true, color: 'warning' }
            if (this.diff > -5)
                return { dark: true, color: 'success' }
            if (this.diff > -10)
                return { dark: true, color: 'warning' }

            return { dark: true, color: 'error' }
        },

        diff () {
            return Math.round((this.cVals.weight - this.cVals.aimWeight) * 100) / 100
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Weight',
                target: 'Aim',
                difference: 'Difference'
            },
            de: {
                title: 'Gewicht',
                target: 'Ziel',
                difference: 'Unterschied'
            }
        }
    }

}
</script>
