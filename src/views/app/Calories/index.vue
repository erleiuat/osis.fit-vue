<template>
    <vcontainer>

        <v-row>
            <v-col cols="4" v-if="!$vuetify.breakpoint.xs">
                <CalorieAdder>
                    <template v-slot:default="trigger">
                        <v-btn block color="primary" depressed large v-on="trigger.on">
                            <v-icon left>add</v-icon>
                            {{ $t('addCalories') }}
                        </v-btn>
                    </template>
                </CalorieAdder>
            </v-col>
            <v-col cols="12" sm="4">
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
            </v-col>
            <v-col cols="4" v-if="!$vuetify.breakpoint.xs">
                <v-btn :to="{name: 'food.own'}" depressed large block color="primary">
                    <v-icon left>open_in_new</v-icon>
                    {{ $t('templates') }}
                </v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <CaloriesTable :date="date" />
            </v-col>
        </v-row>

    </vcontainer>
</template>

<script>
import calories from '@/store/modules/calories'

const CalorieAdder = () => import('@/components/adder/Calories')
const CaloriesTable = () => import('@/views/app/Calories/Table')

export default {
    name: 'Calories',

    components: {
        CalorieAdder, CaloriesTable
    },

    modules: {
        calories
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
                this.$store.dispatch('calories/load', val)
            },
            get () {
                if (this.dateSelected) return this.dateSelected
                var today = this.$store.getters['today'].date
                this.$store.dispatch('calories/load', today)
                return today
            }
        }

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
