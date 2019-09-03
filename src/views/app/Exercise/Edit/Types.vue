<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header class="body-1">
                {{ $t('type') }} {{ type ? ': '+type : '' }}
            </v-expansion-panel-header>
            <v-expansion-panel-content eager>
                <v-row no-gutters justify="center">
                    <v-radio-group v-model="type" :mandatory="false" row :rules="rules">
                        <v-col cols="12" sm="6" md="4" v-for="(i, key) in list" :key="key">
                            <v-radio :label="i.title" :value="i.value" />
                        </v-col>
                    </v-radio-group>
                </v-row>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
    name: 'Types',

    props: [
        'value', 'rules'
    ],

    computed: {
        type: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        },
        list () {
            return [
                { value: 'strength', title: this.$t('types.strength') },
                { value: 'stamina', title: this.$t('types.stamina') },
                { value: 'fitness', title: this.$t('types.fitness') },
                { value: 'flexibility', title: this.$t('types.flexibility') },
                { value: 'coordination', title: this.$t('types.coordination') }
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
