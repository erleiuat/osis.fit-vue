<template>
    <v-bottom-nav app fixed value="true" class="elevation-0 borders">
        <WeightAdder>
            <template v-slot:default="trigger">
                <v-btn flat v-on="trigger.on">
                    <span>{{ $t('addWeight') }}</span>
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </WeightAdder>
    </v-bottom-nav>
</template>

<script>
import WeightAdder from '@/components/adders/Weight'

export default {
    name: 'BottomNav',

    components: {
        WeightAdder
    },

    i18n: {
        messages: {
            en: {
                addWeight: 'Weight'
            },
            de: {
                addWeight: 'Gewicht'
            }
        }
    }

}
</script>
