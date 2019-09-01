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
    name: 'NoPermission',
    i18n: {
        messages: {
            en: {
                title1: '403',
                title2: 'Wait a minute...',
                text: "It looks like the page you were trying to reach wasn't meant for you",
                back: 'Get me somewhere'
            },
            de: {
                title1: '403',
                title2: 'Halt Stop',
                text: 'Es schaut aus als wäre die Seite, welche du versucht hast zu erreichen, nicht für dich gedacht',
                back: 'Bring mich irgendwohin'
            }
        }
    }
}
</script>
