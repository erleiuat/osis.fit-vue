<template>
    <Default>

        <v-app-bar-nav-icon @click.stop="drawer()" />

        <v-spacer />

        <v-dialog ref="dialog" v-model="dialog" full-width width="290px">
            <template v-slot:activator="{ on }">
                <v-btn large text v-on="on">
                    {{ $dateFormat(date) }} <v-icon right>event</v-icon>
                </v-btn>
            </template>
            <v-date-picker v-model="date" scrollable :locale="$store.getters['locale']">
                <v-btn block text @click="dialog = false">
                    <v-icon>check</v-icon>
                </v-btn>
            </v-date-picker>
        </v-dialog>

        <CalorieAdder v-if="$vuetify.breakpoint.mdAndUp">
            <template v-slot:default="trigger">
                <v-btn large text v-on="trigger.on">
                    <v-icon left>add</v-icon> {{ $t('btn.add') }}
                </v-btn>
            </template>
        </CalorieAdder>

    </Default>
</template>

<script>
import CalorieAdder from '@/components/adder/Calories'
import Default from '@/components/nav/toolbar/Default'

export default {
    name: 'Toolbar',

    data () {
        return {
            dialog: false
        }
    },

    components: {
        Default, CalorieAdder
    },

    methods: {
        drawer () {
            this.$store.dispatch('drawer')
        }
    },

    computed: {
        date: {
            get () {
                return this.$route.params.date
            },
            set (val) {
                this.$router.replace({ params: { date: val } })
            }
        }
    }

}
</script>
