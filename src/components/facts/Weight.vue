<template>
    <v-card :color="state.color" :dark="state.dark">

        <v-card-title class="display-1">
            {{ $t('title') }}
        </v-card-title>

        <v-card-text>
            <v-row no-gutters align="end" justify="space-between" style="height: 95px">

                <v-col cols="auto">
                    <div class="display-2">{{ cVals.weight }}</div>
                    <div class="caption" v-if="cVals.aimWeight">{{ $t('target') }}: {{ cVals.aimWeight }}</div>
                </v-col>

                <v-col cols="auto" class="caption text-right" v-if="cVals.aimWeight">
                    {{ diff }} Kg {{ $t('difference') }}
                </v-col>

                <!-- TODO
                <v-col cols="12">
                    <v-progress-linear :value="progress" :color="state.dark?'white':'black'" />
                </v-col>
                -->

            </v-row>
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

        /* TODO
        progress () {
            var val = this.cVals.aimWeight / this.cVals.weight
            console.log(100 - val * 100)
            return 100 - val * 100
        },
        */

        state () {
            if (!this.cVals.weight || !this.cVals.aimWeight) return { dark: false, color: '' }
            if (this.diff > 10) return { dark: true, color: 'error' }
            if (this.diff > 5) return { dark: true, color: 'warning' }
            if (this.diff > -5) return { dark: true, color: 'success' }
            if (this.diff > -10) return { dark: true, color: 'warning' }
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
