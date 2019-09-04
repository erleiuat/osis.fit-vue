<template>
    <vcontainer :align="item ? '' : 'space-evenly'">

        <v-row align="center" justify="center" v-if="item && loaded">
            <v-col cols="12" class="title">
                {{ item.title }}
            </v-col>
            <v-col cols="12">
                <div class="caption">{{ $t('description') }}</div>
                <div class="body-1">{{ item.description }}</div>
            </v-col>
            <v-col cols="12" md="3" class="body-2">
                <div class="caption">{{ $t('public') }}</div>
                {{ item.public ? $t('pTrue'):$t('pFalse') }}
            </v-col>
            <v-col cols="12" md="3" class="body-2">
                <div class="caption">{{ $t('type') }}</div>
                {{ $t('pnt.types.'+item.type) }}
            </v-col>
            <v-col cols="12" md="3" class="body-2">
                <div class="caption">{{ $t('calsPerDo') }}</div>
                {{ item.calories }}
            </v-col>
            <v-col cols="12" md="3" class="body-2">
                <div class="caption">{{ $t('repetsPerDo') }}</div>
                {{ item.repetitions }}
            </v-col>

            <v-col cols="12" class="body-2">
                <div class="caption">{{ $t('bodyparts') }}</div>
                <v-chip v-for="(bp, key) in item.bodyparts" :key="key" class="ml-1 mr-1 mb-1">
                    {{ $t('pnt.parts.'+bp) }}
                </v-chip>
            </v-col>
        </v-row>

        <v-row align="center" justify="center" v-else-if="!loaded">
            <v-progress-linear indeterminate />
        </v-row>

        <v-row align="center" v-else>
            <notFound />
        </v-row>

    </vcontainer>
</template>

<script>
import exercise from '@/store/modules/exercise'
const notFound = () => import('@/views/error/NotFound')

export default {
    name: 'Exercise',
    components: {
        notFound
    },
    modules: {
        exercise
    },

    data () {
        return {
            iData: false,
            loaded: false
        }
    },

    computed: {
        item () {
            if (this.iData) {
                return this.iData
            }
            return false
        }
    },

    mounted () {
        this.$store.dispatch('exercise/get', this.$route.params.id).then(res => {
            this.iData = res
        }).finally(() => {
            this.loaded = true
        })
    },

    i18n: {
        messages: {
            en: {
                title: 'Exercise',
                public: 'Public',
                calsPerDo: 'Calories burned per execution',
                repetsPerDo: 'Repetitions per execution',
                bodyparts: 'Affected body parts',
                type: 'Type'
            },
            de: {
                title: 'Übung',
                public: 'Öffentlich',
                calsPerDo: 'Kalorienverbrauch pro Ausführung',
                repetsPerDo: 'Wiederholungen pro Ausführung',
                bodyparts: 'Betroffene Körperteile',
                type: 'Typ'
            }
        }
    }

}
</script>
