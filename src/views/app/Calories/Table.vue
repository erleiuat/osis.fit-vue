<template>
    
</template>

<script>
export default {
    name: 'CaloriesTable',

    props: {
        showDate: String
    },

    data () {
        return {
            sending: false,
            dates: {
                today: new Date().toISOString().substr(0, 10),
                current: null
            },
            tbl: {
                data: [],
                class: '',
                settings: {
                    descending: true,
                    rowsPerPage: -1
                },
                headers: [
                    { sortable: false, class: 'pa-0' },
                    { value: 'time', text: this.$t('time') },
                    { value: 'title', text: this.$t('title') },
                    { value: 'calories', text: this.$t('calorie_total') }
                ]
            }
        }
    },

    computed: {

        items () {
            var items = this.$store.getters['calories/get'];
            return items
        }

    },

    methods: {

        getData (dSelect) {
            var vm = this
            vm.dates.current = dSelect
            if (!dSelect) return

            vm.tbl.loading = true
            vm.$http.post('log/calorie/read/', { from: dSelect }).then(function (r) {
                if (dSelect === vm.dates.today) {
                    vm.$store.state.data.calorie_log = r.data.calories || []
                    vm.tbl.data = vm.$store.state.data.calorie_log
                } else vm.tbl.data = r.data.calories
            }).catch(function (e) {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.load') })
            }).finally(function () {
                vm.tbl.loading = false
            })
        },

        delItem (item) {
            var vm = this
            var index = vm.tbl.data.indexOf(item)
            vm.sending = true

            vm.$http.post('log/calorie/delete/', { id: item.id }).then(function (r) {
                if (index > -1) vm.tbl.data.splice(index, 1)
            }).catch(function (e) {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.save') })
            }).finally(function () {
                vm.sending = false
            })
        }

    },

    i18n: {
        messages: {
            en: {
                time: 'Time',
                title: 'Title',
                amount: 'Amount',
                calorie_per_100: 'Calories per 100',
                calorie_total: 'Total Calories'
            },
            de: {
                time: 'Zeit',
                title: 'Titel',
                amount: 'Menge',
                calorie_per_100: 'Kalorien pro 100',
                calorie_total: 'Kalorien total'
            }
        }
    }

}
</script>
