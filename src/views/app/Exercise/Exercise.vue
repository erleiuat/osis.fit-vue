<template>
    <vcontainer align="space-evenly" :class="$vuetify.breakpoint.xsOnly ? 'pa-2': ''">

        <v-row v-if="item && loaded" align="center" justify="center" dense>
            <v-col cols="12" md="10" class="title">
                {{ item.title }}
            </v-col>
            <v-col cols="12" md="10" class="body-2">
                <v-sheet class="pa-2 text-left">
                    {{ getByLang($store.getters['app'].locale, item.description) }}
                </v-sheet>
            </v-col>
        </v-row>

        <v-row v-if="item && loaded" align="center" justify="center" dense>
            <v-col cols="12" v-if="path">
                <v-img :lazy-src="path.lazy" :src="path.image" :max-height="300" contain />
            </v-col>
        </v-row>

        <v-row v-if="item && loaded" justify="center" dense>
            <v-col cols="12" md="10">
                <div class="ql-editor quillEditorContent">
                    <div v-html="getByLang($store.getters['app'].locale, item.content)" />
                </div>
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
                        <v-col cols="12" class="text-center">
                            <div class="caption">{{ $t('caloriesCalc') }} (<i>{{ $t('withYour') }}</i>)</div>
                            {{ exampleCals ? exampleCals : '...' }} <i> {{ $t('perHour') }}</i>
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

    methods: {
        getByLang (lang, string) {
            lang = lang.toUpperCase()
            if (string.includes("[" + lang + "]")) {
                return string.substring(
                    string.lastIndexOf("[" + lang + "]") + 4,
                    string.lastIndexOf("[/" + lang + "]")
                )
            } else if (string.includes("[EN]")) {
                return string.substring(
                    string.lastIndexOf("[EN]") + 4,
                    string.lastIndexOf("[/EN]")
                )
            } else {
                return string
            }
        }
    },

    computed: {
        item () {
            if (this.iData) {
                return this.iData
            }
            return false
        },
        path () {
            if (!this.item.image) return false
            else if (!this.item.image.path) {
                return {
                    image: this.item.image,
                    lazy: this.item.image
                }
            }

            var img = this.item.image.path.small
            var lazy = this.item.image.path.lazy

            return {
                image: img,
                lazy: lazy
            }
        },
        exampleCals () {
            if (!this.item.calories) return false
            if (!this.$store.getters['weight/latest']) return false
            var weight = this.$store.getters['weight/latest'].weight
            var result = this.item.calories * 1 * weight
            return result
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
                caloriesCalc: 'Calories burned',
                withYour: 'with your weight',
                perHour: 'Kcal per Hour',
                bodyparts: 'Affected body parts',
                type: 'Type',
                pFalse: 'No',
                pTrue: 'Yes'
            },
            de: {
                title: 'Übung',
                public: 'Öffentlich',
                caloriesCalc: 'Kalorienverbrauch',
                withYour: 'mit deinem Gewicht',
                perHour: 'Kcal pro Stunde',
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
.quillEditorContent {
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
}
.quillEditorContent img {
    max-width: 100%;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
}
@import '~quill/dist/quill.core.css';
</style>
