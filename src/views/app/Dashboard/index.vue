<template>
    <vcontainer>

        <v-row dense v-if="infoState">
            <v-col cols="12" class="pt-0">
                <v-btn @click="showInfo" depressed class="warning pt-0" block small>
                    {{ $t('newComingBtn') }}
                    <v-icon right>announcement</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <v-row dense v-else>
            <v-col cols="12">
                <v-alert color="accent" elevation="0" class="mb-2" dismissible>
                    <div v-html="$t('newComing')" />
                </v-alert>
            </v-col>
        </v-row>

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

    data () {
        return {
            infoState: true
        }
    },

    methods: {
        showInfo () {
            window.scrollTo(0, document.body.scrollHeight)
            this.infoState = false
        }
    },

    i18n: {
        messages: {
            en: {
                newComing: `
                    <b>We are working on a completely new version of Osis.Fit!</b><br/><br/>
                    You can still use this version, but we will move it to another address after the introduction of 
                    the new version. Your data will remain in the old version, but not in the new one. <br/><br/>
                    Premium subscriptions in the old version will also be deactivated. If you have a premium 
                    subscription with a voucher, we will send you a voucher for the new version per mail.
                `,
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
                newComing: `
                    <b>Wir arbeiten an einer komplett neuen Version von Osis.Fit!</b><br/><br/>
                    Du kannst weiterhin diese Version nutzen, jedoch werden wir sie nach Einführung der neuen Version 
                    an eine andere Adresse verschieben. Deine Daten bleiben in der alten Version enthalten, jedoch 
                    nicht in die neue übernommen. <br/><br/>
                    Premium-Abonnements in der alten Version werden ebenfalls deaktiviert. Falls du ein Premium-Abonnement mit
                    einem Gutschein hast, werden wir dir einen entsprechenden Gutschein für die neue Version per Mail zustellen.
                `,
                newComingBtn: 'NEUE VERSION IN ARBEIT',
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
