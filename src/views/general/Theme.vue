<template>
    <v-container grid-list-xl>

        <v-layout wrap justify-center align-center>
            <v-flex xs3>
                <v-switch v-model="mode" label="Switch Mode"></v-switch>
            </v-flex>
            <v-flex xs2 v-for="opt in alerts" :key="opt">
                <v-btn outlined :color="opt" @click="$notify({ type: opt, text: 'Test Notification' })">
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
            text: 'Osis.fit',
            alerts: [
                'success',
                'error',
                'warning',
                'info',
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

    computed: {

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
