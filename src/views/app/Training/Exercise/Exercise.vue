<template>
    <vcontainer>
        <v-row align="center" v-if="item">

            <v-col cols="12" class="title">
                {{ item.title }}
            </v-col>

            <v-col cols="12" class="body-2">
                Beschreibung: <br />
                {{ item.description }}
            </v-col>

            <v-col cols="12" md="3" class="body-2">
                Öffentlich: <br />
                {{ item.public }}
            </v-col>
            <v-col cols="12" md="3" class="body-2">
                Typ: <br />
                {{ item.type }}
            </v-col>
            <v-col cols="12" md="3" class="body-2">
                Kalorienverbrauch pro Durchführung<br />
                {{ item.calories }}
            </v-col>
            <v-col cols="12" md="3" class="body-2">
                Wiederholungen pro Durchführung<br />
                {{ item.repetitions }}
            </v-col>

            <v-col cols="12" class="body-2">
                Beanspruchte Körperteile<br />
                {{ item.bodyparts }}
            </v-col>

        </v-row>
        <v-row align="center" v-else>
            <v-progress-linear indeterminate />
        </v-row>
    </vcontainer>
</template>

<script>
import exercise from '@/store/modules/exercise'

export default {
    name: 'Exercise',
    modules: {
        exercise
    },

    data () {
        return {
            iData: false
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
            console.log(res.title)
            this.iData = res
        })
    },

    i18n: {
        messages: {
            en: {
                title: 'Exercise'
            },
            de: {
                title: 'Übung'
            }
        }
    }

}
</script>
