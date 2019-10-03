<template>
    <Default>
        <v-spacer />

        <CalorieAdder v-if="$vuetify.breakpoint.mdAndUp">
            <template v-slot:default="trigger">
                <v-btn v-on="trigger.on" outlined text>
                    <v-icon left>add</v-icon> {{ $t('btn.add') }}
                </v-btn>
            </template>
        </CalorieAdder>

        <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />

        <v-dialog ref="dialog" v-model="dialog" width="290px">
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" text>
                    {{ $dateFormat(date) }} <v-icon right>event</v-icon>
                </v-btn>
            </template>
            <v-date-picker v-model="date" scrollable :locale="$store.getters['app'].locale">
                <v-btn block text @click="dialog = false">
                    <v-icon>check</v-icon>
                </v-btn>
            </v-date-picker>
        </v-dialog>

    </Default>
</template>

<script>
import CalorieAdder from '@/components/adder/Calories/'
import Default from '@/components/nav/toolbar/Default'

export default {
    name: 'Toolbar',

    components: {
        Default, CalorieAdder
    },

    data () {
        return {
            dialog: false
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
