<template>
    <vcontainer>
        <v-row dense justify="center">
            <v-col cols="12" class="text-center">
                <v-icon x-large class="pb-3 pt-3">developer_board</v-icon>
                <div class="body-2">
                    {{ $t('coming') }}
                </div>
            </v-col>
        </v-row>
    </vcontainer>
</template>

<script>
import account from '@/store/modules/account'

export default {
    name: 'Download',

    modules: {
        account
    },

    i18n: {
        messages: {
            en: {
                coming: 'This feature is currently under development and will be available soon.'
            },
            de: {
                coming: 'Diese Funktion ist gerade in Entwicklung und demnächst für dich verfügbar.'
            }
        }
    }

}
</script>
