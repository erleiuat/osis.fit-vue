<template>
    <vcontainer>
        <v-row align="center">
            <v-col cols="12" class="title">
                {{ $t('title') }}
            </v-col>
        </v-row>
    </vcontainer>
</template>

<script>
import exercise from '@/store/modules/exercise'

export default {
    name: 'Save',

    modules: {
        exercise
    },

    i18n: {
        messages: {
            en: {
                title: 'Save Exercise'
            },
            de: {
                title: 'Übung speichern'
            }
        }
    }

}
</script>
