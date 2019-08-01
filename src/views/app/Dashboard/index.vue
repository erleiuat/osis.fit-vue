<template>
    <v-container grid-list-xl>
        <v-layout wrap>

            <v-flex xs12>
                <Welcome />
            </v-flex>

            <v-flex xs12>
                <Facts />
            </v-flex>

            <v-layout wrap text-center v-if="!$vuetify.breakpoint.xs">
                <v-flex xs12>
                    <v-divider />
                </v-flex>
                <v-flex sm4>
                    <div class="headline pb-3">{{ $t('calories') }}</div>
                    <CalorieAdder />
                </v-flex>
                <v-flex sm4>
                    <div class="headline pb-3">{{ $t('activity') }}</div>
                    <ActivityAdder />
                </v-flex>
                <v-flex sm4>
                    <div class="headline pb-3">{{ $t('weight') }}</div>
                    <WeightAdder />
                </v-flex>
                <v-flex xs12>
                    <v-divider />
                </v-flex>
            </v-layout>

            <v-flex xs12>
                <WeightChart />
            </v-flex>

            <v-flex xs12 class="text-center">
                <div class="headline pb-3">{{ $t('trainings') }}</div>
                <v-btn large disabled><i>{{ $t('soon') }}</i></v-btn>
            </v-flex>

        </v-layout>

        <BottomNav v-if="$vuetify.breakpoint.xs" />

    </v-container>
</template>

<script>
const Welcome = () => import('@/views/app/Dashboard/Welcome')
const Facts = () => import('@/views/app/Dashboard/Facts')

const CalorieAdder = () => import('@/components/adder/Calories')
const ActivityAdder = () => import('@/components/adder/Activity')
const WeightAdder = () => import('@/components/adder/Weight')

const WeightChart = () => import('@/components/charts/Weight')
const BottomNav = () => import('@/views/app/Dashboard/BottomNav')

export default {
    name: 'Dashboard',

    components: {
        Facts,
        Welcome,
        CalorieAdder,
        ActivityAdder,
        WeightAdder,
        WeightChart,
        BottomNav
    },

    mounted () {
        
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
