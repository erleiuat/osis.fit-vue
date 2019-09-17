<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header class="body-1">
                {{ $t('type') }}{{ type ? ': '+$t('pnt.types.'+type) : '' }}
            </v-expansion-panel-header>
            <v-expansion-panel-content eager>
                <v-row no-gutters justify="center">
                    <v-radio-group v-model="type" :mandatory="false" row :rules="rules">
                        <v-col cols="auto" v-for="(i, key) in list" :key="key" class="pa-0">
                            <v-radio :label="$t('pnt.types.'+i)" :value="i" />
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
            return this.$store.getters['exercise/types']
        }
    },

    i18n: {
        messages: {
            en: {
                type: 'Type'
            },
            de: {
                type: 'Typ'
            }
        }
    }

}
</script>
