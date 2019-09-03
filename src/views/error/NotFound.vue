<template>
    <v-col cols="auto" class="text-center">

        <div class="display-3 pt-2 pb-2">
            {{ $t('title1') }}
        </div>

        <div class="headline pt-2 pb-2">
            {{ $t('title2') }}
        </div>

        <div class="pt-2 pb-2">
            {{ $t('text') }}
        </div>

        <v-btn :to="{name: 'dashboard'}" class="primary pt-2 pb-2" large block depressed>
            {{ $t('back') }}
        </v-btn>

    </v-col>
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
