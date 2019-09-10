<template>
    <vcontainer align="space-evenly">

        <v-row v-if="item && loaded" align="center" justify="center" dense>
            <v-col cols="12" md="10">
                <v-sheet class="pa-2 text-left">
                    <div class="title">{{ item.title }}</div>
                    <div class="caption">{{ item.description }}</div>
                </v-sheet>
            </v-col>
        </v-row>

        <v-row v-if="item && loaded" justify="center" dense>
            <v-col cols="12" md="10">
                <div class="ql-editor quillEditorContent">
                    <div v-html="item.content">
                    </div>
                </div>
                <!--
                <div class="quillEditorContent" v-html="item.content" />
                -->
            </v-col>
        </v-row>

        <v-row v-if="item && loaded" align="center" justify="center" class="text-sm-center" dense>

            <v-col cols="6" md="2">
                <v-sheet class="pa-2">
                    <div class="caption">{{ $t('type') }}</div>
                    {{ $t('pnt.types.'+item.type) }}
                </v-sheet>
            </v-col>

            <v-col cols="6" md="2">
                <v-sheet class="pa-2">
                    <div class="caption">{{ $t('public') }}</div>
                    {{ item.public ? $t('pTrue'):$t('pFalse') }}
                </v-sheet>
            </v-col>

            <v-col cols="12" md="6">
                <v-sheet class="pa-2 text-left">
                    <v-row no-gutters justify="space-between">
                        <v-col cols="12" md="12" class="caption text-center">
                            <b>{{ $t('perDo') }}</b>
                        </v-col>
                        <v-col cols="6" md="auto" class="caption">
                            {{ $t('calsPerDo') }}
                        </v-col>
                        <v-col cols="6" md="3" class="body-2 text-right text-md-left">
                            {{ item.calories }}
                            <span class="font-italic font-weight-light">Kcal</span>
                        </v-col>
                        <v-col cols="6" md="auto" class="caption">
                            {{ $t('repetsPerDo') }}
                        </v-col>
                        <v-col cols="6" md="auto" class="body-2 text-right text-md-left">
                            {{ item.repetitions }}
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>

            <v-col cols="12" md="10" class="body-2" v-if="item.bodyparts.length">
                <v-sheet class="pa-2">
                    <div class="caption">{{ $t('bodyparts') }}</div>
                    <v-chip v-for="(bp, key) in item.bodyparts" :key="key" class="ml-1 mr-1 mb-1">
                        {{ $t('pnt.parts.'+bp) }}
                    </v-chip>
                </v-sheet>
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
        }).catch(r => {
            this.$notify({ type: 'error', title: this.$t('alert.error.load'), text: r })
        }).finally(() => {
            this.loaded = true
        })
    },

    i18n: {
        messages: {
            en: {
                title: 'Exercise',
                public: 'Public',
                perDo: 'Per Execution',
                calsPerDo: 'Calories burned',
                repetsPerDo: 'Repetitions',
                bodyparts: 'Affected body parts',
                type: 'Type',
                pFalse: 'No',
                pTrue: 'Yes'
            },
            de: {
                title: 'Übung',
                public: 'Öffentlich',
                perDo: 'Pro Ausführung',
                calsPerDo: 'Kalorienverbrauch',
                repetsPerDo: 'Wiederholungen',
                bodyparts: 'Betroffene Körperteile',
                type: 'Typ',
                pFalse: 'Nein',
                pTrue: 'Ja'
            }
        }
    }

}
</script>

<style>
.quillEditorContent img {
    max-width: 100%;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
}
@import '~quill/dist/quill.core.css';
</style>