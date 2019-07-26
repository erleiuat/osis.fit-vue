<template>
    <v-dialog v-model="show" persistent width="500" transition="dialog-bottom-transition">
        <v-card>
            <v-card-title class="title warning white--text">
                {{ $t('m.title') }}
            </v-card-title>
            <v-container grid-list-xl>
                <v-card-text class="text-xs-center" v-if="affected">
                    <div class="title">{{ affected }}</div>
                </v-card-text>
                <v-card-text>
                    <div v-html="$t('m.text')"></div>
                </v-card-text>
                <v-card-actions>
                    <v-layout row wrap>
                        <v-flex xs6>
                            <v-btn @click="$emit('decline')" depressed block color="error">
                                {{ $t('decline') }}
                            </v-btn>
                        </v-flex>
                        <v-flex xs6>
                            <v-btn @click="$emit('accept')" depressed block color="success">
                                {{ $t('accept') }}
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'YouSure',

    props: {
        show: Boolean,
        affected: String
    },

    i18n: {
        messages: {
            en: {
                decline: 'Abort',
                accept: 'Proceed',
                m: {
                    title: 'Are you sure?',
                    text: `
                        The deletion of this element cannot be undone.
                        Are you sure you want to remove it?
                    `
                }
            },
            de: {
                decline: 'Abbrechen',
                accept: 'Fortfahren',
                m: {
                    title: 'Bist du dir sicher?',
                    text: `
                        Das löschen von diesem Element kann nicht rückgängig gemacht werden.
                        Bist du dir sicher, dass du es entfernen möchtest?
                    `
                }
            }
        }
    }

}
</script>
