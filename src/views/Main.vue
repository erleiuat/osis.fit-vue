
<template>

    <v-container class="fill-height" flex-column>

        <v-row align="center" justify="center">
            <v-col v-for="n in 3" :key="n">
                <v-card class="pa-2" outlined tile>
                    1. One of three columns
                </v-card>
            </v-col>
        </v-row>

        <v-row align="start" justify="start">
            <v-col v-for="n in 3" :key="n">
                <v-card class="pa-2" outlined tile>
                    2. One of three columns
                </v-card>
            </v-col>
        </v-row>

    </v-container>

</template>

<script>
export default {
    name: 'Main'
}
</script>