<template>
    <v-bottom-nav app fixed value="true" class="elevation-0 borders">
        <CalorieAdder>
            <template v-slot:default="trigger">
                <v-btn flat v-on="trigger.on">
                    <span>{{ $t('calories') }}</span>
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </CalorieAdder>
        <ActivityAdder>
            <template v-slot:default="trigger">
                <v-btn flat v-on="trigger.on">
                    <span>{{ $t('activity') }}</span>
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </ActivityAdder>
        <WeightAdder>
            <template v-slot:default="trigger">
                <v-btn flat v-on="trigger.on">
                    <span>{{ $t('weight') }}</span>
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </WeightAdder>
    </v-bottom-nav>
</template>

<script>
const CalorieAdder = () => import('@/components/adders/Calorie')
const ActivityAdder = () => import('@/components/adders/Activity')
const WeightAdder = () => import('@/components/adders/Weight')

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
