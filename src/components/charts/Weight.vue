<template>
    <v-card v-if="values" class="elevation-0" pa-1>
        <v-card-text class="headline pb-0">
            {{ $t('title') }}
        </v-card-text>
        <v-sparkline :value="values" :stroke-linecap="set.strokeLinecap" :fill="set.fill" :color="set.color" :gradient="set.gradient" :line-width="set.lineWidth" :padding="set.padding" :smooth="set.smooth" :auto-draw="set.autoDraw">
            <template v-slot:label="item">
                {{ item.value }}
            </template>
        </v-sparkline>
    </v-card>
</template>

<script>
import storeModule from "@/store/modules/weight"

export default {
    name: 'WeightChart',

    computed: {

        created () {
            this.$store.useModule(storeModule)
        },

        set () {
            var color1 = this.$vuetify.theme.themes.light.secondary
            var color2 = this.$vuetify.theme.themes.light.primary
            var font = (this.$vuetify.theme.isDark ? '#FFFFFF' : 'rgba(0, 0, 0, 0.87)')
            var gradient = ['#' + color1, '#' + color2]

            return {
                fill: false,
                color: font,
                gradient: gradient,
                strokeLinecap: 'round',
                lineWidth: 5,
                padding: 10,
                smooth: 3,
                autoDraw: true
            }
        },

        values () {
            var arr = this.$store.getters['weight/all']
            if (arr.length <= 1) return false

            arr.sort(function (a, b) {
                return (
                    new Date(a.date + 'T' + a.time) -
                    new Date(b.date + 'T' + b.time)
                )
            })

            return arr.map(obj => {
                return obj.weight
            })
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
