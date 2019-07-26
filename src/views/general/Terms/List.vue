<template>
    <v-card flat>
        <v-card-text>
            <v-container grid-list-xl>
                <v-layout row wrap>

                    <v-flex xs12>
                        {{ $t('text') }}
                    </v-flex>

                    <v-flex xs12 md6>
                        <v-btn :to="{name: 'terms.cookie'}" block class="primary">
                            {{ $t('cookie') }}
                        </v-btn>
                    </v-flex>

                    <v-flex xs12>
                        <i>{{ $t('soon') }}:</i>
                    </v-flex>

                    <v-flex xs12 md6>
                        <v-btn disabled block class="primary">
                            {{ $t('general') }}
                        </v-btn>
                    </v-flex>

                    <v-flex xs12 md6>
                        <v-btn disabled block class="primary">
                            {{ $t('data') }}
                        </v-btn>
                    </v-flex>

                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>
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
