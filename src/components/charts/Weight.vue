<template>
    <v-card v-if="values" class="elevation-0 text-center" dark>
        <v-card-text class="display-1">
            {{ $t('title') }}
        </v-card-text>
        <v-card-text>
            <v-sparkline :value="values" color="white" padding="10" stroke-linecap="round" smooth auto-draw>
                <template v-slot:label="item">
                    {{ item.value }} KG
                </template>
            </v-sparkline>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'WeightChart',

    computed: {
        values () {
            var arr = this.$store.getters.sortedWeights.map(obj => {
                return obj.weight
            })
            if (arr.length > 1) return arr
            return false
        }
    },

    i18n: {
        messages: {
            en: {
                title: 'Process'
            },
            de: {
                title: 'Verlauf'
            }
        }
    }

}
</script>
