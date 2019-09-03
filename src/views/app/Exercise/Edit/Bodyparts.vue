<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header class="body-1">
                {{ $t('bodyparts') }} {{ bodyparts.length || '' }}
            </v-expansion-panel-header>
            <v-expansion-panel-content eager>
                <v-row no-gutters>
                    <v-col cols="12" sm="6" md="3" v-for="(i, key) in list" :key="key">
                        <v-checkbox v-model="bodyparts" hide-details :label="label(i.translationKey)" :value="i.id" />
                    </v-col>
                </v-row>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
    name: 'Bodyparts',

    props: [
        'value'
    ],

    computed: {
        bodyparts: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        },
        list () {
            return this.$store.getters['exercise/bodyparts']
        }
    },

    methods: {
        label (key) {
            return this.$t('bodypart.' + key)
        }
    },

    i18n: {
        messages: {
            en: {

            },
            de: {

            }
        }
    }

}
</script>
