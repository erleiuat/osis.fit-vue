<template>
    <v-overlay :value="$store.getters['refreshing']" opacity="0.9" style="z-index: 10">
        <transition appear name="zoom" mode="out-in">
            <vcontainer class="pa-2">
                <v-row no-gutters>
                    <v-col cols="12" class="text-center">
                        <div class="title"> {{ $t('title') }} </div>
                        <div class="caption"> {{ $t('text') }} </div>
                    </v-col>
                    <v-col cols="12" class="pt-2">
                        <v-progress-linear indeterminate height="10" dark />
                    </v-col>
                </v-row>
            </vcontainer>
        </transition>
    </v-overlay>
</template>

<script>
export default {
    name: 'AuthRefresh',

    computed: {

    },

    i18n: {
        messages: {
            en: {
                title: 'Authentication',
                text: 'Your session is being refreshed'
            },
            de: {
                title: 'Authentifizierung',
                text: 'Deine Sitzung wird aktualisiert'
            }
        }
    }

}
</script>
