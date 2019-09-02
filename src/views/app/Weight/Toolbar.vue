<template>
    <Default>

        <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
        <WeightAdder v-if="$vuetify.breakpoint.mdAndUp">
            <template v-slot:default="trigger">
                <v-btn v-on="trigger.on" outlined text>
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

    components: {
        Default, WeightAdder
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
