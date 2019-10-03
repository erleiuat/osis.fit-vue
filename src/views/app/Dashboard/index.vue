<template>
    <vcontainer>

        <v-row dense justify="center" v-if="$vuetify.breakpoint.xs">
            <v-col md="6" align="center">
                <v-btn :to="{name: 'training.saved'}" color="primary" block large outlined>
                    {{ $t('trainings') }}
                    <v-icon right small>open_in_new</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <v-row dense>
            <v-col cols="12">
                <Start />
            </v-col>
        </v-row>

        <v-row v-if="!$vuetify.breakpoint.xs">
            <v-col cols="12">
                <v-divider />
            </v-col>
            <v-col cols="3" align="center">
                <div class="headline pb-3">{{ $t('calories') }}</div>
                <CalorieAdder />
            </v-col>
            <v-col cols="3" align="center">
                <div class="headline pb-3">{{ $t('activity') }}</div>
                <ActivityAdder />
            </v-col>
            <v-col cols="3" align="center">
                <div class="headline pb-3">{{ $t('weight') }}</div>
                <WeightAdder />
            </v-col>
            <v-col cols="3" align="center">
                <div class="headline pb-3">{{ $t('trainings') }}</div>
                <v-btn fab depressed large color="primary" :to="{name: 'training.saved'}">
                    <v-icon>open_in_new</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="12">
                <v-divider />
            </v-col>
        </v-row>

        <v-row dense>
            <v-col cols="12">
                <WeightChart />
            </v-col>
        </v-row>

    </vcontainer>
</template>

<script>
const Start = () => import('@/views/app/Dashboard/Start')

const CalorieAdder = () => import('@/components/adder/Calories/')
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

    i18n: {
        messages: {
            en: {
                calories: 'Calories',
                activity: 'Activity',
                weight: 'Weight',
                trainings: 'Trainings',
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
                trainings: 'Trainings',
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
