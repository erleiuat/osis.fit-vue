<template>
    <div>

        <v-fab-transition v-if="$vuetify.breakpoint.smAndDown">
            <CalorieAdder>
                <template v-slot:default="trigger">
                    <v-btn v-on="trigger.on" fab fixed bottom right color="primary" class="mb-12">
                        <v-icon>add</v-icon>
                    </v-btn>
                </template>
            </CalorieAdder>
        </v-fab-transition>

        <v-bottom-navigation app fixed grow v-if="$vuetify.breakpoint.smAndDown">
            <v-btn text :to="{name: 'food'}">
                <span>{{ $t('templates') }}</span>
                <v-icon>open_in_new</v-icon>
            </v-btn>
        </v-bottom-navigation>

    </div>
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
