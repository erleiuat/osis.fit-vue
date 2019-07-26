<template>
    <v-container :class="$vuetify.breakpoint.xs ? 'pa-0': 'grid-list-xl'">
        <v-layout row wrap justify-center>
            <v-flex xs12 sm4 class="text-xs-center" v-if="!$vuetify.breakpoint.xs">
                <ActivityAdder>
                    <template v-slot:default="trigger">
                        <v-btn depressed large block color="primary" v-on="trigger.on">
                            <v-icon left>add</v-icon>
                            {{ $t('addActivity') }}
                        </v-btn>
                    </template>
                </ActivityAdder>
            </v-flex>
            <v-flex xs12 sm4>
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" lazy full-width width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field solo flat v-model="date" append-icon="event" readonly v-on="on" type="date" hide-details/>
                    </template>
                    <v-date-picker v-model="date" scrollable :locale="$store.state.app.language">
                        <v-btn icon @click="modal = false"><v-icon>close</v-icon></v-btn>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="$refs.dialog.save(date)"><v-icon>check</v-icon></v-btn>
                    </v-date-picker>
                </v-dialog>
            </v-flex>
            <v-flex xs12 sm4 class="text-xs-center" v-if="!$vuetify.breakpoint.xs">
                <Trainings>
                    <template v-slot:default="trigger">
                        <v-btn depressed large block color="primary" v-on="trigger.on">
                            <v-icon left>open_in_new</v-icon>
                            {{ $t('trainings') }}
                        </v-btn>
                    </template>
                </Trainings>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12>
                <ActivityTable :showDate="date" />
            </v-flex>
        </v-layout>

        <BottomNav v-if="$vuetify.breakpoint.xs" />

    </v-container>
</template>

<script>
import ActivityTable from '@/views/app/Activity/Table'

const Trainings = () => import('@/components/trainings/')
const ActivityAdder = () => import('@/components/adders/Activity')
const BottomNav = () => import('@/views/app/Activity/BottomNav')

export default {
    name: 'Activity',

    components: {
        ActivityAdder, Trainings, ActivityTable, BottomNav
    },

    data () {
        return {
            date: '',
            modal: false
        }
    },

    mounted () {
        var now = new Date()
        var str = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString()
        this.date = str.substr(0, 10)
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
