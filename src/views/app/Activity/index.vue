<template>
    <v-container grid-list-xl>

        <v-layout wrap>
            <v-flex xs12 sm4 class="text-center" v-if="!$vuetify.breakpoint.xs">
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
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent full-width width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field solo v-model="date" append-icon="event" readonly v-on="on" type="date" hide-details />
                    </template>
                    <v-date-picker v-model="date" scrollable :locale="$store.state.app.lang">
                        <v-btn icon @click="modal = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="$refs.dialog.save(date)">
                            <v-icon>check</v-icon>
                        </v-btn>
                    </v-date-picker>
                </v-dialog>
            </v-flex>
            <v-flex xs12 sm4 class="text-center" v-if="!$vuetify.breakpoint.xs">
                <v-btn disabled large block color="primary">
                    <v-icon left>open_in_new</v-icon>
                    {{ $t('trainings') }}
                </v-btn>
            </v-flex>

            <v-flex xs12>
                <ActivityTable :date="date" />
            </v-flex>

        </v-layout>

        <BottomNav v-if="$vuetify.breakpoint.xs" />

    </v-container>
</template>

<script>
import activity from '@/store/modules/activity'

const ActivityAdder = () => import('@/components/adder/Activity')
const BottomNav = () => import('@/views/app/Activity/BottomNav')
const ActivityTable = () => import('@/views/app/Activity/Table')

export default {
    name: 'Activity',

    components: {
        ActivityAdder, ActivityTable, BottomNav
    },

    modules: {
        activity
    },

    data () {
        return {
            modal: false,
            dateSelected: null
        }
    },

    computed: {

        date: {
            set (val) {
                this.dateSelected = val
                this.$store.dispatch('activity/load', val)
            },
            get () {
                if (this.dateSelected) return this.dateSelected
                var today = this.$store.getters['today'].date
                this.$store.dispatch('activity/load', today)
                return today
            }
        }

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
