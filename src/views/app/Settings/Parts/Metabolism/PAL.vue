<template>
    <vcontainer align="center" class="pt-0">

        <v-row justify="center" align="center" dense>
            <v-col cols="12" md="9" class="text-center">
                <div class="title">{{ value }}</div>
                <v-slider v-model="slider" class="align-center" :min="95" :max="240" hide-details />
            </v-col>
        </v-row>

        <v-row justify="center" dense v-if="$vuetify.breakpoint.mdAndUp">
            <v-col cols="2" v-for="(el, key) in pals" :key="key">
                <v-card :elevation="el.active ? '5': '0'">
                    <div class="title text-center pa-2">
                        {{ $t('pals.'+key+'.title') }}
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center" v-else>
            <v-col cols="12" v-for="(el, key) in pals" :key="key" v-show="el.active">
                <v-card outlined>
                    <div class="title text-center pa-2">
                        {{ $t('pals.'+key+'.title') }}
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center" dense>
            <v-col cols="12" v-for="(el, key) in pals" :key="key" v-show="el.active">
                <v-card outlined>
                    <v-card-title class="caption pb-0">
                        {{ $t('description') }}
                    </v-card-title>
                    <v-card-text class="pb-0">
                        {{ $t('pals.'+key+'.text') }}
                    </v-card-text>
                    <v-card-title class="caption pb-0">
                        {{ $t('examples') }}
                    </v-card-title>
                    <v-card-text>
                        {{ $t('pals.'+key+'.examples') }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

    </vcontainer>
</template>

<script>
export default {
    name: 'PAL',

    props: [
        'value'
    ],

    computed: {

        slider: {
            get () {
                return this.value * 100
            },
            set (val) {
                this.$emit('input', val / 100)
            }
        },

        pals () {
            var sl = this.slider
            return {
                a: {
                    active: sl >= 0 && sl <= 99
                },
                b: {
                    active: sl >= 100 && sl <= 139
                },
                c: {
                    active: sl >= 140 && sl <= 159
                },
                d: {
                    active: sl >= 160 && sl <= 179
                },
                e: {
                    active: sl >= 180 && sl <= 199
                },
                f: {
                    active: sl >= 200 && sl <= 250
                }
            }
        }

    },

    i18n: {
        messages: {
            en: {
                description: 'Description',
                examples: 'Examples',
                pals: {
                    a: {
                        title: 'Zero',
                        text: 'No or extremely little daily activity.',
                        examples: 'Sleeping'
                    },
                    b: {
                        title: 'Low',
                        text: 'Sitting and lying activities only',
                        examples: 'Frail people'
                    },
                    c: {
                        title: 'Simple',
                        text: 'Mostly sitting, little physical activity.',
                        examples: 'Office work at the desk'
                    },
                    d: {
                        title: 'Medium',
                        text: 'Mainly sitting, partly walking and standing',
                        examples: 'Students, pupils, taxi drivers'
                    },
                    e: {
                        title: 'Heavy',
                        text: 'Mainly walking and standing.',
                        examples: 'Seller, waiter'
                    },
                    f: {
                        title: 'Extreme',
                        text: 'Physically strenuous work.',
                        examples: 'Farmers, construction workers'
                    }

                }
            },
            de: {
                description: 'Beschreibung',
                examples: 'Beispiele',
                pals: {
                    a: {
                        title: 'Null',
                        text: 'Keine oder nur extrem wenig tägliche Aktivität.',
                        examples: 'Schlafen'
                    },
                    b: {
                        title: 'Niedrig',
                        text: 'Nur sitzende und liegende Aktivitäten.',
                        examples: 'Gebrechliche Menschen'
                    },
                    c: {
                        title: 'Einfach',
                        text: 'Meist sitzend, wenig körperliche Aktivität.',
                        examples: 'Büroarbeiten am Schreibtisch'
                    },
                    d: {
                        title: 'Mittel',
                        text: 'Überwiegend sitzend, teilweise gehend und stehend.',
                        examples: 'Studenten, Schüler, Taxifahrer'
                    },
                    e: {
                        title: 'Schwer',
                        text: 'Hauptsächlich gehend und stehend.',
                        examples: 'Verkäufer, Kellner'
                    },
                    f: {
                        title: 'Extrem',
                        text: 'Körperlich anstrengende Arbeiten.',
                        examples: 'Landwirte, Bauarbeiter'
                    }
                }
            }
        }
    }

}
</script>
