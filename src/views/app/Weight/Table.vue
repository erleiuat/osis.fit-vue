<template>
    <v-data-table :headers="tbl.headers" :items="items" :options.sync="tbl.options" :class="tbl.class" :sort-by.sync="tbl.sortBy" :sort-desc.sync="tbl.desc">

        <template v-slot:item.action="{ item }">
            <v-btn fab small text @click="deleteItem(item)">
                <v-icon>delete</v-icon>
            </v-btn>
        </template>

    </v-data-table>
</template>

<script>
export default {
    name: 'WeightTable',

    data () {
        return {
            tbl: {
                class: '',
                sortBy: 'date',
                desc: true,
                options: {
                    descending: true,
                    itemsPerPage: -1
                },
                headers: [
                    { value: 'date', text: this.$t('date') },
                    { value: 'time', text: this.$t('time') },
                    { value: 'weight', text: this.$t('weight') },
                    { value: 'action', sortable: false, align: 'end', width: 10 }
                ]
            }
        }
    },

    computed: {

        items () {
            return this.$store.getters['weight/getAll']
        }

    },

    methods: {

        deleteItem (item) {
            this.$store.dispatch('weight/delete', item)
        }

    },

    i18n: {
        messages: {
            en: {
                date: 'Date',
                time: 'Time',
                weight: 'Weight'
            },
            de: {
                date: 'Datum',
                time: 'Zeit',
                weight: 'Gewicht'
            }
        }
    }

}
</script>
