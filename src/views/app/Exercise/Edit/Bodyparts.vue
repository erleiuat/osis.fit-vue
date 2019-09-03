<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header class="body-1">
                {{ $t('bodyparts') }} {{ bodyparts.length || '' }}
            </v-expansion-panel-header>
            <v-expansion-panel-content eager>
                <v-checkbox v-model="bodyparts" v-for="(i, key) in list" :label="label(i.translationKey)" :value="i.id" :key="key" />
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
            return [
                { id: 1, translationKey: 'chest' },
                { id: 2, translationKey: 'chest' },
                { id: 3, translationKey: 'chest' },
                { id: 4, translationKey: 'chest' },
                { id: 5, translationKey: 'chest' }
            ]
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
