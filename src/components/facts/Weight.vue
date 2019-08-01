<template>
    <v-card v-if="weight" :color="state.color" :dark="state.dark">

        <v-card-title class="display-1">
            {{ $t('title') }}
        </v-card-title>

        <v-card-text>
            <v-layout wrap align-end>

                <v-flex xs7>
                    <div class="display-2">{{ weight }}</div>
                    <div class="caption">{{ $t('target') }}: {{ target }}</div>
                </v-flex>

                <v-flex xs5 text-right class="caption">
                    {{ diff }} {{ $t('difference') }}
                </v-flex>

            </v-layout>
        </v-card-text>

    </v-card>
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
            return this.$store.getters['weight/getLatest'].weight
        },

        target () {
            return this.$store.state.user.aims.weight
        },

        diff () {
            return Math.round((this.target - this.weight) * 100) / 100
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
