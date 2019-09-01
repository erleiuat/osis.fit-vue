<template>
    <v-flex xs12 sm10>
        <h1 class="display-3">{{ $t('title1') }}</h1>
        <div class="headline">{{ $t('title2') }}</div>
        <div class="">{{ $t('text') }}</div>
        <v-btn class="primary mt-3" large :to="{name: 'dashboard'}">
            {{ $t('back') }}
        </v-btn>
    </v-flex>
</template>

<script>
export default {
    name: 'NotFound',
    i18n: {
        messages: {
            en: {
                title1: '404',
                title2: 'How did you get here?',
                text: 'Sorry, the page you were looking for could not be found',
                back: 'Get me somewhere'
            },
            de: {
                title1: '404',
                title2: 'Wie bist du hierher gekommen?',
                text: 'Die gesuchte Seite konnte leider nicht gefunden werden',
                back: 'Bring mich irgendwohin'
            }
        }
    }
}
</script>
