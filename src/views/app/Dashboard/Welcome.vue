<template>
    <v-row justify="center" align="center">

        <v-col cols="12" md="8">
            <div class="display-1" v-html="$t('title')"></div>
            <div class="title font-weight-light" v-html="$t('text')"></div>
        </v-col>

        <v-col cols="auto" md="4" class="text-center">
            <v-btn depressed large color="primary" :to="{name: 'settings'}">
                {{ $t('settings') }} <v-icon right>open_in_new</v-icon>
            </v-btn>
        </v-col>

    </v-row>
</template>

<script>
export default {
    name: 'Welcome',

    i18n: {
        messages: {
            en: {
                settings: 'Open Settings',
                title: 'Welcome!',
                text: `
                    You almost made it:
                    To calculate your caloric balance and other interesting facts you need to 
                    determine more info about you in the <b>Settings</b>. This includes your <b>height</b>, 
                    your <b>aims</b>, your <b>gender</b> and your current <b>weight</b>.
                `
            },
            de: {
                settings: 'Einstellungen öffnen',
                title: 'Willkommen!',
                text: `
                    Du hast es schon fast geschafft: 
                    Für deine Kalorienbilanz und weitere Berechnungen werden
                    noch weitere Infos von dir benötigt, welche du in den <b>Einstellungen</b> bestimmen kannst.
                    Dazu gehört deine <b>Körpergrösse</b>, deine <b>Ziele</b>, dein <b>Geschlecht</b> und dein aktuelles <b>Gewicht</b>.
                `
            }
        }
    }

}
</script>
