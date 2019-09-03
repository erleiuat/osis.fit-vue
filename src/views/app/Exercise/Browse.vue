<template>
    <vcontainer>
        <v-row align="center">
            <v-col cols="12" class="title">
                {{ $t('title') }}
            </v-col>
        </v-row>

        <v-row align="center" dense>
            <v-col cols="12" v-for="(item, key) in 5" :key="key">
                <v-card :to="{name: 'exercise', params: {type: 'public', id: item}}">
                    <v-card-text>
                        <v-row align="center">
                            <v-col cols="12" md="2">
                                <div class="title">
                                    {{ item }}
                                </div>
                            </v-col>
                            <v-col cols="12" md="10">
                                {{ item }}
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </vcontainer>
</template>

<script>
import exercise from '@/store/modules/exercise'

export default {
    name: 'Browse',

    modules: {
        exercise
    },

    i18n: {
        messages: {
            en: {
                title: 'Browse Exercises'
            },
            de: {
                title: 'Übungen durchsuchen'
            }
        }
    }

}
</script>
