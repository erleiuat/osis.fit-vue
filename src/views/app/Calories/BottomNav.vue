<template>
    <v-bottom-navigation app fixed grow v-if="$vuetify.breakpoint.xs">

        <CalorieAdder>
            <template v-slot:default="trigger">
                <v-btn text v-on="trigger.on">
                    <span>{{ $t('addCalories') }}</span>
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </CalorieAdder>

        <v-btn text :to="{name: 'food.own'}">
            <span>{{ $t('templates') }}</span>
            <v-icon>open_in_new</v-icon>
        </v-btn>

    </v-bottom-navigation>
</template>

<script>
import CalorieAdder from '@/components/adder/Calories'

export default {
    name: 'BottomNav',

    components: {
        CalorieAdder
    },

    i18n: {
        messages: {
            en: {
                addCalories: 'Calories',
                templates: 'Templates'
            },
            de: {
                addCalories: 'Kalorien',
                templates: 'Vorlagen'
            }
        }
    }

}
</script>
