<template>
    <v-container grid-list-xl>

        <!--
        <v-row>
            <v-col cols="12" v-if="scan.scanning">
                <div class="quagga-scanner-container">
                    <v-quagga :onDetected="scanned" :aspectRatio="scan.aspect" :readerSize="scan.size" :readerTypes="scan.types" />
                </div>
            </v-col>
            <v-col cols="12" v-else>
                <v-btn @click="scan.scanning = !scan.scanning" outlined>
                    {{ scan.code || 'Scan' }}
                </v-btn>
            </v-col>
        </v-row>
        -->

        <v-row>
            <v-col cols="12">
                <v-switch v-model="authRefresh" label="Switch Auth Refresh" />
                <v-switch v-model="doUpdating" label="Switch Updating" />
            </v-col>
        </v-row>

        <v-layout wrap justify-center align-center>
            <v-flex xs3>
                <v-switch v-model="mode" label="Switch Mode"></v-switch>
            </v-flex>
            <v-flex xs2 v-for="opt in alerts" :key="opt">
                <v-btn outlined :color="opt" @click="$notify({ type: opt, title: 'Lorizzle ipsum dolor fo shizzle my nizzle mofo, sizzle adipiscing elit. Nullam break yo neck, yall bow wow wow, bling bling volutpizzle, suscipizzle rizzle, crazy vizzle, pot.', text: 'Lorizzle ipsum dolor fo shizzle my nizzle mofo, sizzle adipiscing elit. Nullam break yo neck, yall bow wow wow, bling bling volutpizzle, suscipizzle rizzle, crazy vizzle, pot. Lorizzle ipsum dolor fo shizzle my nizzle mofo, sizzle adipiscing elit. Nullam break yo neck, yall bow wow wow, bling bling volutpizzle, suscipizzle rizzle, crazy vizzle, pot.' })">
                    {{ opt }}
                </v-btn>
            </v-flex>
        </v-layout>

        <v-layout wrap align-center>
            <v-flex xs6 v-for="opt in textStyles" :key="opt">
                <v-layout wrap text-center justify-center align-center>
                    <v-flex xs4>
                        <v-chip outlined>{{ opt }}</v-chip>
                    </v-flex>
                    <v-flex xs8>
                        <div :class="opt">{{ text }}</div>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>

        <v-layout wrap>
            <v-flex xs12>
                <v-divider />
            </v-flex>
            <v-flex xs6 v-for="opt in colors" :key="opt">
                <v-card :color="opt">
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex xs6 class="headline">
                                {{ text }}
                            </v-flex>
                            <v-flex xs6 text-right>
                                <v-chip>{{ opt }}</v-chip>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout wrap>
            <v-flex xs12>
                <v-divider />
            </v-flex>
            <v-flex xs3 v-for="opt in colors" :key="opt">
                <v-btn block :color="opt">
                    <div class="body-2">{{ opt || text }}</div>
                </v-btn>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import VueCookies from 'vue-cookies'

export default {
    name: 'Theme',

    data () {
        return {
            scan: {
                code: null,
                size: {
                    width: 100,
                    height: 100
                },
                aspect: {
                    min: 1,
                    max: 1
                },
                detecteds: [],
                types: ['ean_reader'],
                scanning: true
            },
            text: 'Osis.fit',
            alerts: [
                'success',
                'error',
                'warning',
                'info'
            ],
            textStyles: [
                'display-4',
                'display-3',
                'display-2',
                'display-1',
                'headline',
                'title',
                'subheading',
                'body-2',
                'body-1',
                'caption'
            ],
            colors: [
                '',
                'primary',
                'secondary',
                'accent',
                'success',
                'error',
                'warning',
                'info'
            ]
        }
    },

    methods: {
        scanned (data) {
            this.scan.scanning = !this.scan.scanning
            this.scan.code = data.codeResult.code
        }
    },

    computed: {

        authRefresh: {
            get () {
                return this.$store.getters['refreshing']
            },
            set (val) {
                this.$store.dispatch('refreshing', val)
            }
        },

        doUpdating: {
            get () {
                return this.$store.getters['updating']
            },
            set (val) {
                this.$store.dispatch('updating', val)
            }
        },

        mode: {
            get () {
                return VueCookies.get('themeDark')
            },
            set (val) {
                this.$vuetify.theme.dark = val
                if (val) VueCookies.set('themeDark', val)
                else VueCookies.remove('themeDark')
            }
        }

    }

}
</script>

<style>
.quagga-scanner-container {
    height: 400px;
    width: 100%;
    overflow: hidden;
    border: solid 1px gray;
}
.quagga-scanner-container video {
    height: 400px !important;
    width: 100% !important;
}
</style>
