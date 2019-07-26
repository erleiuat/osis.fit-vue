<template>
    <v-card flat>
        <v-card-text>
            <div class="display-3">
                FAQ
            </div>
            <div class="">
                {{ $t('text') }}
            </div>
            <!--
            <v-btn depressed class="primary" :to="{name: 'help', query: {s: 'contact'}}">
                {{ $t('doYou') }}
            </v-btn>
            -->
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'FAQ',

    data () {
        return {

        }
    },

    i18n: {
        messages: {
            en: {
                text: 'No one has asked us a question yet.',
                doYou: 'Would you like to?'
            },
            de: {
                text: 'Uns hat bisher noch niemand eine Frage gestellt.',
                doYou: 'Möchtest du?'
            }
        }
    }

}
</script>
