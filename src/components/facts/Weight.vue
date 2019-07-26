<template>
    <v-flex xs12 md4 v-if="weight">
        <v-card class="fill-height" :color="state.color" :dark="state.dark">
            <v-card-title class="display-1">
                {{ $t('title') }}
            </v-card-title>
            <v-card-text class="pt-1" v-if="weight">
                <v-layout row wrap align-end justify-space-around fill-height>
                    <v-flex xs7 class="display-2">
                        {{ weight }}
                    </v-flex>
                    <v-flex xs5 class="text-xs-right caption" v-if="target">
                        {{ $t('target') }}: {{ target }}<br/>
                        {{ $t('difference') }}: {{ diff }}
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    name: 'WeightFacts',

    computed: {

        state () {
            if (!this.weight || !this.target)
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

        weight () {
            var weight = this.$store.getters.latestWeight || false
            return Math.round(weight.weight * 100) / 100
        },

        target () {
            return this.$store.state.user.aims.weight || false
        },

        diff () {
            var weight = this.$store.getters.latestWeight || { weight: 90 }
            return Math.round(
                (this.target - weight.weight) * 100
            ) / 100
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
