<template>
    <vcontainer>
        <v-row justify="center" align="center">

            <v-col cols="7" sm="6" class="display-1 text-center">
                Osis.Fit
            </v-col>

            <v-col cols="5" sm="4" class="caption text-center">
                By Osis
            </v-col>

            <v-col cols="7" sm="6">
                <v-img :src="require('@/assets/img/icon.png')" height="200" contain />
            </v-col>

            <v-col cols="5" sm="4">
                <v-img :src="require('@/assets/img/osis_io.png')" height="80" contain />
            </v-col>

            <v-col cols="12">
                <v-divider />
            </v-col>

            <v-col cols="12">
                Version: <i>Beta 1.2</i>
            </v-col>

        </v-row>
    </vcontainer>
</template>

<script>
export default {
    name: 'About'
}
</script>
