<template>
    <vcontainer align="center">

        <v-row justify="center">
            <v-col cols="auto">
                <div class="display-4">Osis.fit</div>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12" sm="6">
                <v-btn depressed block large color="primary" :to="{name: 'auth.login'}">
                    {{ $t('login') }}
                </v-btn>
            </v-col>

        </v-row>
        <v-row justify="center">
            <v-col cols="12" sm="6">
                <v-btn depressed large block color="secondary" :to="{name: 'auth.register'}">
                    {{ $t('create') }}
                </v-btn>
            </v-col>
        </v-row>
    </vcontainer>
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
