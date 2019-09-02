<template>
    <v-container grid-list-sm fill-height>
        <v-layout wrap>
            <v-flex xs12 class="subheading">
                {{ $t('title') }}
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Saved',

    i18n: {
        messages: {
            en: {
                title: 'Saved Exercises'
            },
            de: {
                title: 'Deine Übungen'
            }
        }
    }

}
</script>
