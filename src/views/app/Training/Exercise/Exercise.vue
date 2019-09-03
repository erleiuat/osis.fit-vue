<template>
    <vcontainer>
        <v-row>

            <v-col cols="12" class="title">
                Titel der Übung
            </v-col>
            <v-col cols="12" class="body-2">
                Beschreibung: <br />
                Lorem crackalackin hizzle amet, i saw beyonces tizzles and my pizzle went crizzle adipiscing fo shizzle. Nullam mammasay mammasa mamma oo sa velizzle, pizzle volutpizzle, suscipizzle quis, gravida ma nizzle, pot. Pellentesque rizzle tortor. Sed go to hizzle. Go to hizzle izzle fizzle dapibus owned tempizzle bling bling. Maurizzle ghetto nibh da bomb sheezy. Yippiyo go to hizzle tortor. Pellentesque fo shizzle rhoncizzle fizzle. In hizzle habitasse shit dictumst. Fizzle dapibizzle. Rizzle i'm in the shizzle urna, pretizzle that's the shizzle, mattis funky fresh, eleifend gizzle, nunc. Daahng dawg suscipit. Fo shizzle velit sed purus.
            </v-col>

            <v-col cols="12" md="3" class="body-2">
                Öffentlich: <br/>
                Ja/Nein
            </v-col>
            <v-col cols="12" md="3" class="body-2">
                Typ: <br/>
                'strength','stamina','fitness',<br/>'flexibility','coordination'
            </v-col>
            <v-col cols="12" md="3" class="body-2">
                Kalorienverbrauch pro Durchführung<br/>
                12345
            </v-col>
            <v-col cols="12" md="3" class="body-2">
                Wiederholungen pro Durchführung<br/>
                12345
            </v-col>

             <v-col cols="12" class="body-2">
                Beanspruchte Körperteile<br/>
                - Titel: Lorem crackalackin, Typ: 'muscle','tissue','other'<br/>
                - Titel: Lorem crackalackin, Typ: 'muscle','tissue','other'<br/>
                - Titel: Lorem crackalackin, Typ: 'muscle','tissue','other'<br/>
                - Titel: Lorem crackalackin, Typ: 'muscle','tissue','other'<br/>
                - Titel: Lorem crackalackin, Typ: 'muscle','tissue','other'<br/>
            </v-col>

        </v-row>
    </vcontainer>
</template>

<script>
export default {
    name: 'Exercise',

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
