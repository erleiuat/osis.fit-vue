<template>
    <v-bottom-navigation app fixed grow v-if="$vuetify.breakpoint.xs">

        <CalorieAdder>
            <template v-slot:default="trigger">
                <v-btn text v-on="trigger.on">
                    <span>{{ $t('calories') }}</span>
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </CalorieAdder>

        <ActivityAdder>
            <template v-slot:default="trigger">
                <v-btn text v-on="trigger.on">
                    <span>{{ $t('activity') }}</span>
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </ActivityAdder>

        <WeightAdder>
            <template v-slot:default="trigger">
                <v-btn text v-on="trigger.on">
                    <span>{{ $t('weight') }}</span>
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </WeightAdder>

    </v-bottom-navigation>
</template>

<script>
const CalorieAdder = () => import('@/components/adder/Calories/')
const ActivityAdder = () => import('@/components/adder/Activity')
const WeightAdder = () => import('@/components/adder/Weight')

export default {
    name: 'BottomNav',

    components: {
        CalorieAdder,
        ActivityAdder,
        WeightAdder
    },

    i18n: {
        messages: {
            en: {
                calories: 'Calories',
                activity: 'Activity',
                weight: 'Weight'
            },
            de: {
                calories: 'Kalorien',
                activity: 'Aktivität',
                weight: 'Gewicht'
            }
        }
    }

}
</script>
