<template>
    <v-bottom-navigation app fixed grow class="elevation-0">

        <ActivityAdder>
            <template v-slot:default="trigger">
                <v-btn flat v-on="trigger.on">
                    <span>{{ $t('addActivity') }}</span>
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </ActivityAdder>
        <Trainings>
            <template v-slot:default="trigger">
                <v-btn flat v-on="trigger.on">
                    <span>{{ $t('trainings') }}</span>
                    <v-icon>open_in_new</v-icon>
                </v-btn>
            </template>
        </Trainings>
        
    </v-bottom-navigation>
</template>

<script>
import ActivityAdder from '@/components/adder/Activity'
import Trainings from '@/components/trainings/'

export default {
    name: 'BottomNav',

    components: {
        ActivityAdder, Trainings
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
