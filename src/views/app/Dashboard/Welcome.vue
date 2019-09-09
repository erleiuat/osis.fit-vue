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
                    You've almost made it: For your calorie balance and other calculations we need more information
                    about your, which you can tell us in the <b>Settings</b>. The required information includes your 
                    <b>metabolism</b>, your <b>aims</b> and your current <b>weight</b>.
                `
            },
            de: {
                settings: 'Einstellungen öffnen',
                title: 'Willkommen!',
                text: `
                    Du hast es schon fast geschafft: Für deine Kalorienbilanz und weitere Berechnungen werden
                    noch weitere Infos von dir benötigt, welche du in den <b>Einstellungen</b> bestimmen kannst.
                    Dazu gehört dein <b>Stoffwechsel</b>, deine <b>Ziele</b> und dein aktuelles <b>Gewicht</b>.
                `
            }
        }
    }

}
</script>
