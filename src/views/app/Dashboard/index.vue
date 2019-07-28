<template>
    <v-container grid-list-xl>

        <Welcome v-if="!$store.getters.latestWeight" />
        <Facts v-else />

        <transition appear name="fade" mode="in-out">
            <v-layout row wrap v-if="!$vuetify.breakpoint.xs" class="text-center">
                <v-flex xs12 class="pt-4">
                    <v-divider />
                </v-flex>
                <v-flex xs12 sm4>
                    <div class="headline">{{ $t('calories') }}</div>
                    <CalorieAdder />
                </v-flex>
                <v-flex xs12 sm4>
                    <div class="headline">{{ $t('activity') }}</div>
                    <ActivityAdder />
                </v-flex>
                <v-flex xs12 sm4>
                    <div class="headline">{{ $t('weight') }}</div>
                    <WeightAdder />
                </v-flex>
            </v-layout>
        </transition>

        <transition appear name="zoom" mode="in-out">
            <v-layout row wrap>
                <v-flex xs12 class="pt-4">
                    <v-divider />
                </v-flex>
                <v-flex xs12>
                    <WeightChart />
                </v-flex>
            </v-layout>
        </transition>

        <v-layout row wrap>
            <v-flex xs12 class="text-center" @click="$store.commit('loading', !$store.state.app.loading)">
                <div class="headline">{{ $t('trainings') }}</div>
                <v-btn large disabled><i>{{ $t('soon') }}</i></v-btn>
            </v-flex>
        </v-layout>

        <transition appear name="slideUp">
            <BottomNav v-if="$vuetify.breakpoint.xs" />
        </transition>

    </v-container>
</template>

<script>
const Facts = () => import('@/views/app/Dashboard/Facts')
const Welcome = () => import('@/views/app/Dashboard/Welcome')

const CalorieAdder = () => import('@/components/adders/Calorie')
const ActivityAdder = () => import('@/components/adders/Activity')
const WeightAdder = () => import('@/components/adders/Weight')

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
        var vm = this
        vm.$store.commit('loading', true)
        vm.$http.get('dashboard/read/').then(function (r) {
            vm.$store.state.user = r.data.user
            vm.$store.state.data.weight_log = r.data.weights
            vm.$store.state.data.calorie_log = r.data.calories
            vm.$store.state.data.activity_log = r.data.activity
        }).catch(function () {
            vm.$notify({ type: 'error', text: vm.$t('alert.error.load') })
        }).finally(function () {
            vm.$store.commit('loading', false)
        })
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
