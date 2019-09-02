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

        <ActivityAdder v-if="$vuetify.breakpoint.mdAndUp">
            <template v-slot:default="trigger">
                <v-btn v-on="trigger.on" color="accent" large depressed>
                    <v-icon left>add</v-icon> {{ $t('btn.add') }}
                </v-btn>
            </template>
        </ActivityAdder>

    </Default>
</template>

<script>
import ActivityAdder from '@/components/adder/Activity'
import Default from '@/components/nav/toolbar/Default'

export default {
    name: 'Toolbar',

    data () {
        return {
            dialog: false
        }
    },

    components: {
        Default, ActivityAdder
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
