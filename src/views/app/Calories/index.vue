<template>
    <v-container grid-list-xl>

        <v-layout row wrap justify-center>

            <v-flex xs12 sm4 class="text-center" v-if="!$vuetify.breakpoint.xs">
                <CalorieAdder>
                    <template v-slot:default="trigger">
                        <v-btn block color="primary" depressed large v-on="trigger.on">
                            <v-icon left>add</v-icon>
                            {{ $t('addCalories') }}
                        </v-btn>
                    </template>
                </CalorieAdder>
            </v-flex>

            <v-flex xs12 sm4>
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent full-width width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field solo flat v-model="date" append-icon="event" readonly v-on="on" type="date" hide-details />
                    </template>
                    <v-date-picker v-model="date" scrollable>
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
                <v-btn :to="{name: 'templates'}" depressed large block color="primary">
                    <v-icon left>open_in_new</v-icon>
                    {{ $t('templates') }}
                </v-btn>
            </v-flex>

        </v-layout>

        <v-layout wrap>
            <v-flex xs12>
                <CaloriesTable :date="date" />
            </v-flex>
        </v-layout>

        <BottomNav v-if="$vuetify.breakpoint.xs" />

    </v-container>
</template>

<script>
const CalorieAdder = () => import('@/components/adder/Calories')
const BottomNav = () => import('@/views/app/Calories/BottomNav')
const CaloriesTable = () => import('@/views/app/Calories/Table')

export default {
    name: 'Calories',

    components: {
        BottomNav, CalorieAdder, CaloriesTable
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
                if (!this.dateSelected) {
                    var now = new Date()
                    var str = (new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString()).substr(0, 10)
                    this.$store.dispatch('calories/load', str)
                    this.dateSelected = str
                }
                return this.dateSelected
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
