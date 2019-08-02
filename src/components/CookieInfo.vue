<template>
    <v-bottom-sheet v-model="show">
        <v-sheet>
            <v-container grid-list-xl>
                <v-layout wrap>
                    <v-flex xs12>
                        <div class="headline" v-html="$t('m.title')" />
                        <div class="caption" v-html="$t('m.text')" />
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-btn depressed block color="primary" @click="show = false">
                            {{ $t('accept') }}
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-btn depressed block :to="{ name: 'terms', params: {url: 'cookies'} }" @click="show = false">
                            {{ $t('info') }}
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
export default {
    name: 'CookieInfo',

    data () {
        return {
            show: true
        }
    },

    watch: {
        show (val) {
            if (val) return
            this.$cookies.set('cookieAcceptance', true)
            this.show = false
        }
    },

    i18n: {
        messages: {
            en: {
                decline: 'Decline',
                accept: 'Alright',
                info: 'More Info',
                m: {
                    title: 'This page uses cookies',
                    text: `
                        We use cookies to personalize content and advertisements, provide social media features, and to analyze 
                        traffic on our website. In addition, we provide information about your use of our website to our partners for 
                        social media, advertising and analysis. Our partners manage these information may be associated with other data 
                        that you have provided to them or that they may have collected from you as part of your use of the Services. 
                        You give your consent to our cookies when you continue to use our website.
                    `
                }
            },
            de: {
                decline: 'Ablehnen',
                accept: 'Alles klar',
                info: 'Weitere Infos',
                m: {
                    title: 'Diese Seite verwendet Cookies',
                    text: `
                        Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren, Funktionen für soziale Medien anbieten zu 
                        können und die Zugriffe auf unsere Website zu analysieren. Außerdem geben wir Informationen zu Ihrer Verwendung 
                        unserer Website an unsere Partner für soziale Medien, Werbung und Analysen weiter. Unsere Partner führen diese 
                        Informationen möglicherweise mit weiteren Daten zusammen, die Sie ihnen bereitgestellt haben oder die sie 
                        im Rahmen Ihrer Nutzung der Dienste gesammelt haben. Sie geben Einwilligung zu unseren Cookies, wenn Sie 
                        unsere Webseite weiterhin nutzen.
                    `
                }
            }
        }
    }

}
</script>
