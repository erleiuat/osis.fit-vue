<template>
    <v-card outlined>
        <v-data-table :headers="tbl.headers" :items="items" :options.sync="tbl.options" :class="tbl.class" :sort-by.sync="tbl.sortBy" :sort-desc.sync="tbl.desc" :dense="$vuetify.breakpoint.xsOnly">

            <template v-slot:item.action="{ item }">
                <v-btn fab small text @click="deleteItem(item)">
                    <v-icon>delete</v-icon>
                </v-btn>
            </template>

        </v-data-table>
    </v-card>
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
                class: 'elevation-0',
                sortBy: 'time',
                desc: true,
                options: {
                    itemsPerPage: -1
                },
                headers: [
                    { value: 'title', text: this.$t('title') },
                    { value: 'time', text: this.$t('time') },
                    { value: 'calories', text: this.$t('calories') },
                    { value: 'action', sortable: false, align: 'end', width: 10 }
                ]
            }
        }
    },

    mounted () {
        this.$store.dispatch('calories/load', this.date)
    },

    computed: {

        items () {
            return this.$store.getters['calories/byDate'](this.date)
        }

    },

    methods: {

        deleteItem (item) {
            this.$store.dispatch('calories/delete', item)
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Title',
                time: 'Time',
                calories: 'Calories'
            },
            de: {
                time: 'Zeit',
                title: 'Titel',
                calories: 'Kalorien'
            }
        }
    }

}
</script>
