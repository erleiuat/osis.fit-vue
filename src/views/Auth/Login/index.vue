<template>
    <v-container class="fill-height flex-column">

        <v-row align="end" justify="center">
            <h1 class="display-1">Login</h1>
        </v-row>

        <v-row align="start" justify="center">
            <v-col cols="12" md="9" v-if="$route.query.verified">
                <v-alert outlined dense type="success">
                    {{ $t('verified') }}
                </v-alert>
            </v-col>
            <v-col cols="12" md="4"> <!-- TODO: Fix ugly v-form -->
                <Form />
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import Form from '@/views/Auth/Login/Form'

export default {
    name: 'Login',

    components: {
        Form
    }

}
</script>