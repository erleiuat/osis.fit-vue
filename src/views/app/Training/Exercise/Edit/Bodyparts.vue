<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header class="body-1">
                {{ $t('bodyparts') }} {{ bodyparts.length || '' }}
            </v-expansion-panel-header>
            <v-expansion-panel-content eager>
                <v-checkbox v-model="bodyparts" v-for="(i, key) in list" :label="i.title" :value="i.value" :key="key" />
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
            get(){
                return this.value
            },
            set(val){
                this.$emit('input', val)
            }
        },
        list () {
            return [
                { value: '1', title: this.$t('bodypart.1') },
                { value: '2', title: this.$t('bodypart.2') },
                { value: '3', title: this.$t('bodypart.3') },
                { value: '4', title: this.$t('bodypart.4') },
                { value: '5', title: this.$t('bodypart.5') }
            ]
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
