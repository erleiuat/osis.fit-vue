<template>
    <vcontainer>
        <v-row justify="center">

            <v-col cols="12" sm="10" class="display-1">
                {{ $t('title') }}
            </v-col>

            <v-col cols="12" sm="10" v-html="$t('text')" />

            <v-col cols="12" sm="5">
                <v-btn outlined block :to="{name:'help.contact'}">
                    {{ $t('contact') }}
                </v-btn>
            </v-col>
            <v-col cols="12" sm="5" class="text-sm-right">
                <p class="caption">{{ $t('langNotice') }} <a href="https://www.deepl.com/">Deepl.com</a></p>
            </v-col>

        </v-row>
    </vcontainer>
</template>

<script>
export default {
    name: 'Cookie',

    i18n: {
        messages: {
            en: {
                title: 'Terms and conditions',
                contact: 'Contact',
                langNotice: 'Translated by',
                text: `
                Coming soon
                `
            },
            de: {
                title: 'Allgemeine Geschäftsbedingungen',
                contact: 'Kontakt',
                langNotice: 'Übersetz mit',
                text: `
                Demnächst verfügbar
                `
            }
        }
    }

}
</script>
