<template>
    <v-container grid-list-xl fill-height>
        <v-layout row wrap justify-space-around align-content-center>
            <v-flex xs12 text-xs-center>
                <div class="display-4">Osis.fit</div>
            </v-flex>
            <v-flex xs12 sm8 md6>
                <v-btn depressed large block color="primary" :to="{name: 'auth.login'}">
                    {{ $t('login') }}
                </v-btn>
                <v-btn depressed large block color="secondary" :to="{name: 'auth.register'}">
                    {{ $t('create') }}
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Welcome',

    i18n: {
        messages: {
            en: {
                login: 'Login',
                create: 'Create Account'
            },
            de: {
                login: 'Anmelden',
                create: 'Konto erstellen'
            }
        }
    }
}
</script>
