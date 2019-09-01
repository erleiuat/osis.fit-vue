<template>
    <vcontainer>

        <v-row>
            <v-col cols="12">
                <Start />
            </v-col>
        </v-row>

        <v-row v-if="!$vuetify.breakpoint.xs">
            <v-col cols="12">
                <v-divider />
            </v-col>
            <v-col cols="4" align="center">
                <div class="headline pb-3">{{ $t('calories') }}</div>
                <CalorieAdder />
            </v-col>
            <v-col cols="4" align="center">
                <div class="headline pb-3">{{ $t('activity') }}</div>
                <ActivityAdder />
            </v-col>
            <v-col cols="4" align="center">
                <div class="headline pb-3">{{ $t('weight') }}</div>
                <WeightAdder />
            </v-col>
            <v-col cols="12">
                <v-divider />
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <WeightChart />
            </v-col>
        </v-row>

        <v-row>
            <v-col align="center">
                <div class="headline pb-3">{{ $t('trainings') }}</div>
                <v-btn large disabled><i>{{ $t('soon') }}</i></v-btn>
            </v-col>
        </v-row>

    </vcontainer>
</template>

<script>
import weight from '@/store/modules/weight'
import calories from '@/store/modules/calories'
import activity from '@/store/modules/activity'

const Start = () => import('@/views/app/Dashboard/Start')

const CalorieAdder = () => import('@/components/adder/Calories')
const ActivityAdder = () => import('@/components/adder/Activity')
const WeightAdder = () => import('@/components/adder/Weight')

const WeightChart = () => import('@/components/charts/Weight')

export default {
    name: 'Dashboard',

    components: {
        Start,
        CalorieAdder,
        ActivityAdder,
        WeightAdder,
        WeightChart
    },

    modules: {
        weight, calories, activity
    },

    i18n: {
        messages: {
            en: {
                calories: 'Calories',
                activity: 'Activity',
                weight: 'Weight',
                trainings: 'Trainings',
                soon: 'Coming soon',
                m: {
                    title: 'Welcome to Osis.fit!',
                    text: `
                        To calculate your caloric balance and other interesting facts you need to 
                        determine more info about you in the <b>Settings</b>. This includes your <b>height</b>, 
                        your <b>aims</b>, your <b>gender</b> and your current <b>weight</b>.
                    `
                }
            },
            de: {
                calories: 'Kalorien',
                activity: 'Aktivität',
                weight: 'Gewicht',
                trainings: 'Übungen',
                soon: 'Demnächst verfügbar',
                m: {
                    title: 'Willkommen bei Osis.fit!',
                    text: `
                        Für deine Kalorienbilanz und weitere Berechnungen werden
                        noch weitere Infos von dir benötigt, welche du in den <b>Einstellungen</b> bestimmen kannst.
                        Dazu gehört deine <b>Körpergrösse</b>, deine <b>Ziele</b>, dein <b>Geschlecht</b> und dein aktuelles <b>Gewicht</b>.
                    `
                }
            }
        }
    }

}
</script>
