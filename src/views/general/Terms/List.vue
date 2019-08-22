<template>
     <vcontainer align="center">
        <v-row justify="center">
            <v-col cols="12" sm="10">
                {{ $t('text') }}
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" sm="10">
                <v-btn block disabled outlined :to="{name: 'terms.cookie'}">
                    {{ $t('general') }} ({{ $t('soon') }})
                </v-btn>
            </v-col>
            <v-col cols="12" sm="10">
                <v-btn block outlined :to="{name: 'terms.cookie'}">
                    {{ $t('cookie') }}
                </v-btn>
            </v-col>
            <v-col cols="12" sm="10">
                <v-btn block disabled outlined :to="{name: 'terms.cookie'}">
                    {{ $t('data') }} ({{ $t('soon') }})
                </v-btn>
            </v-col>
        </v-row>
    </vcontainer>
</template>

<script>
export default {
    name: 'Overview',

    i18n: {
        messages: {
            en: {
                text: 'The Osis.fit Terms of Use consist of the following parts:',
                soon: 'Coming soon',
                cookie: 'Cookie-Policy',
                general: 'General Terms',
                data: 'Privacy-Policy'
            },
            de: {
                text: 'Die Nutzungsbedingungen von Osis.fit bestehen aus folgenden Punkten:',
                soon: 'Demnächst verfügbar',
                cookie: 'Cookie-Richtlinien',
                general: 'Allgemeine Bedingungen',
                data: 'Datenschutzrichtlinie'
            }
        }
    }
}
</script>
