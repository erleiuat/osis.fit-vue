<template>
    <vcontainer align="center" style="min-height: 400px;">
        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>

            <v-row justify="center" dense>
                <v-col cols="12" md="3">
                    <v-text-field :label="$t('height')" v-model="fd.height" :rules="rule.require" type="number" filled />
                </v-col>
                <v-col cols="12" md="3">
                    <v-select :label="$t('gender')" v-model="fd.gender" :items="genders" :rules="rule.require" filled />
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="fd.birthdate" :label="$t('birthdate')" type="date" append-icon="event" filled />
                    <!--
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="fd.birthdate" :label="$t('birthdate')" v-on="on" @focus="menu = true" readonly type="date" append-icon="event" filled />
                        </template>
                        <v-date-picker v-model="fd.birthdate" ref="picker" @change="$refs.menu.save(fd.birthdate)" :locale="$store.getters['app'].locale" />
                    </v-menu>
                    -->
                </v-col>

                <v-col cols="12" md="9" class="text-center">
                    PAL
                    <v-slider v-model="slider" class="align-center" :min="95" :max="240" hide-details />
                    <!--
                    <v-dialog v-model="dialog" width="500">
                        <template v-slot:activator="{ on }">
                            <v-text-field :label="$t('pal')" v-model="fd.pal" :rules="rule.require" v-on="on" type="number" filled />
                        </template>

                        <v-card>
                            <v-card-title class="headline" primary-title>
                                Choose PAL
                            </v-card-title>

                            <v-card-text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <div class="flex-grow-1"></div>
                                <v-btn color="primary" text @click="dialog = false">
                                    I accept
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    -->
                    {{ slider / 100 }}
                </v-col>

            </v-row>

            <v-row justify="center" v-if="$vuetify.breakpoint.mdAndUp">
                <v-col cols="2" v-for="(el, key) in pals" :key="key">
                    <v-card :elevation="el.active ? '5': '0'">
                        <v-card-text>
                            {{ $t('pals.'+key+'.title') }}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-row justify="center" v-else>
                <v-col cols="12" v-for="(el, key) in pals" :key="key" v-show="el.active">
                    <v-card outlined>
                        <v-card-text>
                            {{ $t('pals.'+key+'.title') }}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-row justify="center" dense>
                <v-col cols="12" sm="4">
                    <v-btn @click="save()" :loading="sending" color="primary" type="submit" block depressed>
                        {{ $t('btn.save') }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </vcontainer>
</template>

<script>
export default {
    name: 'EditMetabolism',

    mounted () {
        this.$store.dispatch('user/load')
    },

    data () {
        return {
            menu: false,
            dialog: false,
            sending: false,
            slider: 95,
            fd: {
                height: null,
                gender: null,
                birthdate: null,
                pal: null
            },
            rule: {
                valid: false,
                require: [
                    v => !!v || this.$t('alert.v.require')
                ]
            }
        }
    },

    mounted () {
        var data = this.$store.getters['user/metabolism']
        this.fd.height = data.height
        this.fd.gender = data.gender
        this.fd.birthdate = data.birthdate
        this.fd.pal = data.pal
        this.slider = data.pal * 100
    },

    computed: {

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
                    active: sl >= 200 && sl <= 249
                }
            }
        },

        genders () {
            return [
                { text: this.$t('g.male'), value: 'male' },
                { text: this.$t('g.female'), value: 'female' }
            ]
        }

    },

    watch: {
        menu (val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        }
    },

    methods: {

        save () {
            this.fd.pal = this.slider / 100
            if (!this.$refs.form.validate()) return false

            this.sending = true
            this.$store.dispatch('user/editMetabolism', this.fd).then(r => {
                this.edit = false
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save') })
            }).finally(() => {
                this.sending = false
            })
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Profile',
                firstname: 'Firstname',
                lastname: 'Lastname',
                birthdate: 'Birthdate',
                gender: 'Gender',
                height: 'Height (cm)',
                mail: 'Mail',
                g: {
                    null: '-',
                    male: 'Male',
                    female: 'Female'
                },
                pals: {

                }
            },
            de: {
                title: 'Profil',
                firstname: 'Vorname',
                lastname: 'Nachname',
                birthdate: 'Geburtsdatum',
                gender: 'Geschlecht',
                height: 'Grösse (cm)',
                mail: 'Mail',
                g: {
                    null: '-',
                    male: 'Männlich',
                    female: 'Weiblich'
                },
                pals: {

                }
            }
        }
    }

}
</script>
