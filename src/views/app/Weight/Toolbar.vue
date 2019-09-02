<template>
    <Default>

        <v-app-bar-nav-icon @click.stop="drawer()" />

        <v-spacer />

        <WeightAdder v-if="$vuetify.breakpoint.mdAndUp">
            <template v-slot:default="trigger">
                <v-btn v-on="trigger.on" color="accent" large depressed>
                    <v-icon left>add</v-icon> {{ $t('btn.add') }}
                </v-btn>
            </template>
        </WeightAdder>

    </Default>
</template>

<script>
import WeightAdder from '@/components/adder/Weight'
import Default from '@/components/nav/toolbar/Default'

export default {
    name: 'Toolbar',

    data () {
        return {
            dialog: false
        }
    },

    components: {
        Default, WeightAdder
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
