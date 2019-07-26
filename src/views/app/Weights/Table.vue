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
            <td type="date">{{ p.item.date }}</td>
            <td>{{ p.item.time }}</td>
            <td>{{ p.item.weight }}</td>
        </template>

    </v-data-table>
</template>

<script>
export default {
    name: 'WeightsTable',

    data () {
        return {
            sending: false,
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
                    { value: 'date', text: this.$t('date') },
                    { value: 'time', text: this.$t('time') },
                    { value: 'weight', text: this.$t('amount') }
                ]
            }
        }
    },

    computed: {

        getItems () {
            this.tbl.data = this.$store.state.data.weight_log
            return this.tbl.data
        }

    },

    mounted () {
        this.getData()
    },

    methods: {

        delItem (item) {
            var vm = this
            var index = vm.tbl.data.indexOf(item)
            vm.sending = true

            vm.$http.post('log/weight/delete/', { id: item.id }).then(function (r) {
                if (index > -1) vm.tbl.data.splice(index, 1)
            }).catch(function (e) {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.save') })
            }).finally(function () {
                vm.sending = false
            })
        },

        getData () {
            var vm = this
            vm.tbl.loading = true

            vm.$http.post('log/weight/read/').then(function (r) {
                vm.$store.state.data.weight_log = r.data.weights || []
            }).catch(function (e) {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.load') })
            }).finally(function () {
                vm.tbl.data = vm.$store.state.data.weight_log
                vm.tbl.loading = false
            })
        }
    },

    i18n: {
        messages: {
            en: {
                date: 'Date',
                time: 'Time',
                amount: 'Weight'
            },
            de: {
                date: 'Datum',
                time: 'Zeit',
                amount: 'Gewicht'
            }
        }
    }

}
</script>
