<template>

    <v-container class="fill-height flex-column fluid">

        <v-row align="end" justify="start">
            <v-col cols="12">
                <div class="display-4">Osis.Fit</div>
            </v-col>
        </v-row>

        <v-row align="start" justify="start">
            <v-col cols="12" sm="6">
                <v-btn :to="{ name: 'auth.login' }" depressed block large color="primary">
                    Login
                </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
                <v-btn depressed large block color="secondary">
                    Register
                </v-btn>
            </v-col>
        </v-row>

    </v-container>

</template>

<script>
export default {
    name: 'Main'
}
</script>