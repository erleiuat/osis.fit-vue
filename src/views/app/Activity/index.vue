<template>
    <vcontainer>
        <ActivityTable :date="$route.params.date" />
    </vcontainer>
</template>

<script>
import activity from '@/store/modules/activity'

const ActivityTable = () => import('@/views/app/Activity/Table')

export default {
    name: 'Activity',

    components: {
        ActivityTable
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
