<template>
    <vcontainer>
        <v-row>
            <v-col cols="10" class="subheading">
                {{ $t('title') }}
            </v-col>
            <v-col cols="2">
                <v-btn fab>
                    <v-icon>add</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </vcontainer>
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
