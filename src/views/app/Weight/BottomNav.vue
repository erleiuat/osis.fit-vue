<template>
    <v-fab-transition v-if="$vuetify.breakpoint.smAndDown">
        <WeightAdder>
            <template v-slot:default="trigger">
                <v-btn v-on="trigger.on" fab fixed bottom right color="primary">
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </WeightAdder>
    </v-fab-transition>

    <!--
    <v-bottom-navigation app fixed grow v-if="$vuetify.breakpoint.smAndDown">

        <WeightAdder>
            <template v-slot:default="trigger">
                <v-btn text v-on="trigger.on">
                    <span>{{ $t('addWeight') }}</span>
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </WeightAdder>

    </v-bottom-navigation>
    -->

</template>

<script>
import WeightAdder from '@/components/adder/Weight'

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
