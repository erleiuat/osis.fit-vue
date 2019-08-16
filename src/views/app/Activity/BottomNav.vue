<template>
    <v-bottom-navigation app fixed grow>

        <ActivityAdder>
            <template v-slot:default="trigger">
                <v-btn text v-on="trigger.on">
                    <span>{{ $t('addActivity') }}</span>
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </ActivityAdder>
        <v-btn text disabled>
            <span>{{ $t('trainings') }}</span>
            <v-icon>open_in_new</v-icon>
        </v-btn>

    </v-bottom-navigation>
</template>

<script>
import ActivityAdder from '@/components/adder/Activity'

export default {
    name: 'BottomNav',

    components: {
        ActivityAdder
    },

    i18n: {
        messages: {
            en: {
                addActivity: 'Activity',
                trainings: 'Trainings'
            },
            de: {
                addActivity: 'Aktivität',
                trainings: 'Übungen'
            }
        }
    }

}
</script>
