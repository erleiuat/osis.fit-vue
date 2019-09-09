<template>
    <vcontainer>
        <v-row justify="center" align="center">

            <v-col cols="6">
                <v-img :src="require('@/assets/img/icon.png')" height="200" contain />
            </v-col>
            <v-col cols="6">
                <v-img :src="require('@/assets/img/osis_io.png')" height="200" contain />
            </v-col>

            <v-col cols="6" md="6" class="headline text-center">
                Osis.Fit
            </v-col>

            <v-col cols="6" md="6" class="headline text-center">
                By Osis.io
            </v-col>

            <v-col cols="12">
                <v-divider />
            </v-col>

            <v-col cols="12">
                Version: <i>Beta 1.2</i>
            </v-col>

            <v-col cols="12">
                <v-divider />
            </v-col>

            <v-col cols="12" class="title">
                {{ $t('title') }}
            </v-col>

            <v-col cols="12" sm="5">
                <v-btn block outlined :to="{name: 'about.imprint'}">
                    {{ $t('imprint') }}
                </v-btn>
            </v-col>
            <v-col cols="12" sm="5">
                <v-btn block outlined :to="{name: 'about.terms'}">
                    {{ $t('general') }}
                </v-btn>
            </v-col>
            <v-col cols="12" sm="5">
                <v-btn block outlined :to="{name: 'about.cookie'}">
                    {{ $t('cookie') }}
                </v-btn>
            </v-col>
            <v-col cols="12" sm="5">
                <v-btn block outlined :to="{name: 'about.data'}">
                    {{ $t('data') }}
                </v-btn>
            </v-col>

            <v-col cols="12">
                <v-divider />
            </v-col>

            <v-col cols="12">
                <div class="title">
                    {{ $t('title2') }}
                </div>
                <div class="body-1">
                    {{ $t('subText') }}
                </div>
            </v-col>

            <v-col cols="12" md="6">
                <v-btn outlined block :to="{name: 'help.contact'}">
                    {{ $t('contactBtn') }}
                </v-btn>
            </v-col>
            <v-col cols="12" md="6">
                <v-btn outlined block href="mailto:mail@osis.io" target="_blank">
                    {{ $t('mailBtn') }}
                </v-btn>
            </v-col>

        </v-row>
    </vcontainer>
</template>

<script>
export default {
    name: 'About',

    i18n: {
        messages: {
            en: {
                contactBtn: 'Contact-Form',
                mailBtn: 'E-Mail',
                title: 'Imprint and Legal Notice',
                title2: 'Support and Assistance',
                subText: `
                We offer our users support in the operation of the application and 
                are dependent on constructive criticism in order to constantly improve our offer.
                Also our app is not 100% error free, which is why we are always thankful when
                Users should inform us of any errors. For these concerns and all others one can
                contact us via the contact form or by mail.
                `,
                imprint: 'Imprint',
                cookie: 'Cookie-Policy',
                general: 'Terms and conditions',
                data: 'Privacy-Policy'
            },
            de: {
                contactBtn: 'Kontaktformular',
                mailBtn: 'E-Mail',
                title: 'Impressum und rechtliche Hinweise',
                title2: 'Support und Unterstützung',
                subText: `
                Wir bieten unseren Nutzern Unterstützung bei der Bedienung der Anwendung und 
                sind abhängig von konstruktiver Kritik, um unser Angebot stetig zu verbessern.
                Auch ist unsere App nicht zu 100% Fehlerfrei, weshalb wir immer dankbar sind, wenn
                Nutzer uns auf Fehler aufmerksam machen. Für diese Anliegen und alle anderen kann man
                uns über das Kontaktformular oder per Mail erreichen.
                `,
                imprint: 'Impressum',
                cookie: 'Cookie-Richtlinien',
                general: 'Allgemeine Geschäftsbedingungen',
                data: 'Datenschutzerklärung'
            }
        }
    }

}
</script>
