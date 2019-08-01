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
    name: 'CaloriesTable',

    props: {
        date: String
    },

    data () {
        return {
            tbl: {
                class: '',
                sortBy: 'time',
                desc: true,
                options: {
                    descending: true,
                    itemsPerPage: -1
                },
                headers: [
                    { value: 'title', text: this.$t('title') },
                    { value: 'time', text: this.$t('time') },
                    { value: 'duration', text: this.$t('duration') },
                    { value: 'calories', text: this.$t('calories') },
                    { value: 'action', sortable: false, align: 'end', width: 10 },
                ]
            }
        }
    },

    computed: {

        items () {
            return this.$store.getters['activity/getByDate'](this.date)
        }

    },

    methods: {

        deleteItem (item) {
            this.$store.dispatch('activity/delete', item)
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Title',
                time: 'Time',
                duration: 'Duration',
                calories: 'Calories'
            },
            de: {
                time: 'Zeit',
                title: 'Titel',
                duration: 'Dauer',
                calories: 'Kalorien'
            }
        }
    }

}
</script>
