<template>
    <v-container :class="$vuetify.breakpoint.xs ? 'pa-0': 'grid-list-xl'">

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
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field solo flat v-model="date" append-icon="event" readonly v-on="on" type="date" hide-details/>
                    </template>
                    <v-date-picker v-model="date" scrollable :locale="getLocale">
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

        <v-layout row wrap>
            <v-flex xs12>
                <CaloriesTable :showDate="date" />
            </v-flex>
        </v-layout>

        <BottomNav v-if="$vuetify.breakpoint.xs" />

    </v-container>
</template>

<script>
import CaloriesTable from '@/views/app/Calories/Table'

const CalorieAdder = () => import('@/components/adders/Calorie')
const BottomNav = () => import('@/views/app/Calories/BottomNav')

export default {
    name: 'Calories',

    components: {
        CaloriesTable, BottomNav, CalorieAdder
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

    computed: {

        getLocale () {
            var vm = this
            if (vm.$cookies.get('client_language')) return vm.$cookies.get('client_language')
            return navigator.language || navigator.userLanguage
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
