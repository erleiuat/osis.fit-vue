<template>
    <vcontainer>
        <v-row justify="center" align="center">

            <v-col cols="12" md="6">
                <v-img :src="require('@/assets/img/icon.png')" height="200" contain />
            </v-col>
            <v-col cols="12" md="6">
                <v-img :src="require('@/assets/img/osis_io.png')" height="200" contain />
            </v-col>

            <v-col cols="12" md="6" class="display-1 text-center">
                Osis.Fit
            </v-col>

            <v-col cols="12" md="6" class="caption text-center">
                By Osis
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

            <v-col cols="12" sm="10">
                <v-btn block outlined :to="{name: 'about.imprint'}">
                    {{ $t('imprint') }} ({{ $t('soon') }})
                </v-btn>
            </v-col>
            <v-col cols="12" sm="10">
                <v-btn block outlined :to="{name: 'about.terms'}">
                    {{ $t('general') }} ({{ $t('soon') }})
                </v-btn>
            </v-col>
            <v-col cols="12" sm="10">
                <v-btn block outlined :to="{name: 'about.cookie'}">
                    {{ $t('cookie') }}
                </v-btn>
            </v-col>
            <v-col cols="12" sm="10">
                <v-btn block outlined :to="{name: 'about.data'}">
                    {{ $t('data') }} ({{ $t('soon') }})
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
                title: 'Imprint and Legal Notice',
                imprint: 'Imprint',
                soon: 'Coming soon',
                cookie: 'Cookie-Policy',
                general: 'General Terms',
                data: 'Privacy-Policy'
            },
            de: {
                title: 'Impressum und rechtliche Hinweise',
                imprint: 'Impressum',
                soon: 'Demnächst verfügbar',
                cookie: 'Cookie-Richtlinien',
                general: 'Allgemeine Bedingungen',
                data: 'Datenschutzrichtlinie'
            }
        }
    }

}
</script>
