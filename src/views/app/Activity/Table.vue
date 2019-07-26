<template>
    <v-data-table :headers="tbl.headers" :items="getItems" :loading="tbl.loading" :pagination.sync="tbl.settings" :class="tbl.class">

        <v-progress-linear v-slot:progress indeterminate />
        <template v-slot:items="p">
            <td class="pa-0">
                <v-btn @click="delItem(p.item)" flat icon :disabled="sending" :loading="sending">
                    <v-icon>delete</v-icon>
                    <span slot="loader" class="spinning-loader">
                        <v-icon light>cached</v-icon>
                    </span>
                </v-btn>
            </td>
            <td>{{ p.item.time }}</td>
            <td>{{ p.item.duration }}</td>
            <td>{{ p.item.calories }}</td>
        </template>

    </v-data-table>
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
                loading: true,
                class: '',
                settings: {
                    descending: true,
                    rowsPerPage: -1
                },
                headers: [
                    { sortable: false, class: 'pa-0' },
                    { value: 'time', text: this.$t('time') },
                    { value: 'duration', text: this.$t('duration') },
                    { value: 'calories', text: this.$t('calories') }
                ]
            }
        }
    },

    computed: {

        getItems () {
            if (this.showDate === this.dates.today)
                this.tbl.data = this.$store.state.data.activity_log

            if (this.showDate !== this.dates.current) this.getData(this.showDate)
            return this.tbl.data
        }

    },

    methods: {

        getData (dSelect) {
            var vm = this
            vm.dates.current = dSelect
            if (!dSelect) return

            vm.tbl.loading = true
            vm.$http.post('/log/activity/read/', { from: dSelect }).then(function (r) {
                if (dSelect === vm.dates.today) {
                    vm.$store.state.data.activity_log = r.data.activity || []
                    vm.tbl.data = vm.$store.state.data.activity_log
                } else vm.tbl.data = r.data.activity
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

            vm.$http.post('log/activity/delete/', { id: item.id }).then(function (r) {
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
                duration: 'Duration',
                calories: 'Calories Lost'
            },
            de: {
                time: 'Zeit',
                duration: 'Dauer',
                calories: 'Verbrauchte Kalorien'
            }
        }
    }

}
</script>
