<template>
    <v-overlay :value="$store.getters['updating']" opacity="0.9">
        <v-sheet light min-width="300" class="ma-2">
            <vcontainer>
                <v-row no-gutters>
                    <v-col cols="12">
                        <div class="title"> {{ $t('title') }} </div>
                        <div class="caption"> {{ $t('text') }} </div>
                    </v-col>
                    <v-col cols="12" class="pt-2">
                        <v-progress-linear indeterminate height="5" dark />
                    </v-col>
                </v-row>
            </vcontainer>
        </v-sheet>
    </v-overlay>
</template>

<script>
export default {
    name: 'Update',

    i18n: {
        messages: {
            en: {
                title: 'Update found',
                text: 'The app is currently being updated. You will then be redirected to the new version.'
            },
            de: {
                title: 'Update gefunden',
                text: 'Die App wird gerade aktualisiert. Du wirst anschliessend gleich zur neuen Version weitergeleitet.'
            }
        }
    }

}
</script>
