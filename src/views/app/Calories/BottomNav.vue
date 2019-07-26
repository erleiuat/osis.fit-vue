<template>
    <v-bottom-nav app fixed value="true" class="elevation-0 borders">
        <CalorieAdder>
            <template v-slot:default="trigger">
                <v-btn flat v-on="trigger.on">
                    <span>{{ $t('addCalories') }}</span>
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </CalorieAdder>
        <v-btn flat :to="{name: 'templates'}">
            <span>{{ $t('templates') }}</span>
            <v-icon>open_in_new</v-icon>
        </v-btn>
    </v-bottom-nav>
</template>

<script>
import CalorieAdder from '@/components/adders/Calorie'

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
