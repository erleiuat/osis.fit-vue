<template>
    <v-overlay :value="$store.getters['updating']" opacity="0.9" style="z-index: 10">
        <transition appear name="zoom" mode="out-in">
            <vcontainer class="pa-2">
                <v-row no-gutters>
                    <v-col cols="12" class="text-center">
                        <div class="title"> {{ $t('title') }} </div>
                        <div class="caption"> {{ $t('text') }} </div>
                    </v-col>
                    <v-col cols="12" class="pt-2">
                        <v-progress-linear :indeterminate="loader.inter" :color="loader.color" value="100" height="10" dark />
                    </v-col>
                </v-row>
            </vcontainer>
        </transition>
    </v-overlay>
</template>

<script>
export default {
    name: 'Update',

    computed: {
        loader () {
            var state = this.$store.getters['updating']
            if (state === 'loading') {
                return {
                    color: 'primary',
                    inter: true
                }
            } else if (state === 'loaded') {
                return {
                    color: 'success',
                    inter: false
                }
            } else {
                return {
                    color: 'info',
                    inter: false
                }
            }
        }
    },

    i18n: {
        messages: {
            en: {
                title: 'Update found',
                text: 'The app is currently being updated. You will then be redirected to the new version.'
            },
            de: {
                title: 'Update gefunden',
                text: 'Die App wird gerade aktualisiert. Du wirst anschliessend direkt zur neuen Version weitergeleitet.'
            }
        }
    }

}
</script>
