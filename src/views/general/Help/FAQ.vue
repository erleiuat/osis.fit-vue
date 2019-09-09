<template>
    <vcontainer align="space-evenly">
        <v-row justify="center">
            <v-col cols="12" sm="10">
                <div class="display-1">
                    Support
                </div>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12" sm="10">
                <div class="headline">
                    FAQ
                </div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-expansion-panels>
                    <v-expansion-panel v-for="(item, i) in faqItems" :key="i">
                        <v-expansion-panel-header class="body-1 text-center">
                            {{ item.title }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="body-2" v-html="item.text" />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>

        <v-row dense justify="end">
            <v-col cols="auto" class="text-right">
                {{ $t('stillQuesting') }}<br />
                <v-btn outlined :to="{name: 'help.contact'}">
                    {{ $t('supBtn') }}
                </v-btn>
            </v-col>
        </v-row>

    </vcontainer>
</template>

<script>
export default {
    name: 'FAQ',

    data () {
        return {
            faqItems: [
                { title: this.$t('fqi.a.title'), text: this.$t('fqi.a.text') },
                { title: this.$t('fqi.b.title'), text: this.$t('fqi.b.text') }
            ]
        }
    },

    i18n: {
        messages: {
            en: {
                stillQuesting: "Hasn't your request been resolved yet?",
                supBtn: 'Contact Support',
                fqi: {
                    a: {
                        title: 'How is my basal metabolic rate calculated?',
                        text: `
                        The basal metabolic rate / resting energy demand can be determined using various methods. 
                        The most commonly used method is indirect calorimetry. 
                        In this method, the oxygen and rest energy are measured in the exhaled air. 
                        carbon dioxide concentration. About the quantity of the released 
                        carbon dioxide, the energy conversion can be determined.
                        Because we have no way to get this data from every user, 
                        we use a formula from Harris and Benedict, according to which the 
                        the rest energy demand can also be calculated. The parameters are gender, 
                        body weight, body length and age into the formula.<br/><br/>
                        Further information about the Harris Benedict formula can be found at 
                        <a href="https://en.wikipedia.org/wiki/Basal_metabolic_rate" target="_blank">Wikipedia</a>.
                        `
                    },
                    b: {
                        title: 'How is the daily calorie requirement calculated? What is the PAL value?',
                        text: `
                        Your daily calorie requirement consists of your basal metabolic rate, which is calculated with
                        is multiplied by the so-called PAL value. The PAL value indicates how active you are. 
                        on average daily or how much work your muscles do. 
                        Because the amount of daily muscle work is very different, 
                        in nutritional science, people are divided according to their physical condition and 
                        activity into five groups, which are characterized by so-called PAL factors. 
                        (PAL = "Physical Activity Level"). <br/><br/>
                        The PAL value replaces the need for a step counter, which is some 
                        can ease. Additional physical activities such as a workout in the gym
                        consume more calories than your pedometer can tell you, leading to inaccurate
                        results in your calorie consumption. Such activities can
                        you therefore enter as "activity" in the app.<br/><br/>
                        Further information on the PAL value can be found at 
                        <a href="https://de.wikipedia.org/wiki/Physical_activity_level" target="_blank">Wikipedia</a>.
                        `
                    }
                }
            },
            de: {
                stillQuesting: 'Konnte dein Anliegen noch nicht geklärt werden?',
                supBtn: 'Support kontaktieren',
                fqi: {
                    a: {
                        title: 'Wie wird mein Grundumsatz berechnet?',
                        text: `
                        Der Grundumsatz/Ruheenergiebedarf lässt sich mit verschiedenen Methoden bestimmen. 
                        Die am häufigsten angewandte Methode ist die indirekte Kalorimetrie. 
                        Bei diesem Verfahren wird in der ausgeatmeten Luft die Sauerstoff- und 
                        Kohlenstoffdioxid-Konzentration gemessen. Über die Menge des abgegebenen 
                        Kohlenstoffdioxids lässt sich der Energieumsatz ermitteln.
                        Da wir keine Möglichkeit haben, diese Daten von jedem Nutzer zu erhalten, 
                        nutzen wir eine Formel von Harris und Benedict, nach welcher sich der 
                        Ruheenergiebedarf auch berechnen lässt. Dabei gehen die Parameter Geschlecht, 
                        Körpergewicht, Körperlänge und Alter in die Formel ein.<br/><br/>
                        Weitere Infomationen zur Harris-Benedict-Formel findest du zum Beispiel auf 
                        <a href="https://de.wikipedia.org/wiki/Grundumsatz" target="_blank">Wikipedia</a>.
                        `
                    },
                    b: {
                        title: 'Wie entsteht der tägliche Kalorienbedarf? Was ist der PAL-Wert?',
                        text: `
                        Dein täglicher Kalorienbedarf besteht aus deinem Grundumsatz, welcher mit
                        dem sogenannten PAL-Wert multipliziert wird. Der PAL-Wert gibt an, wie aktiv du 
                        im Durchschnitt täglich bist bzw. wie viel Arbeit deine Muskeln leisten. 
                        Da der Umfang der täglichen Muskelarbeit sehr unterschiedlich ist, 
                        teilt man in der Ernährungswissenschaft die Menschen je nach ihrer körperlichen 
                        Aktivität in fünf Gruppen ein, die durch sogenannte PAL-Faktoren gekennzeichnet sind 
                        (PAL = „Physical Activity Level“ – „Pegel der körperlichen Tätigkeit“). <br/><br/>
                        Mit dem PAL-Wert wird die Notwendigkeit eine Schrittzählers ersetzt, was einiges 
                        erleichtern kann. Zusätzliche körperliche Aktivitäten wie ein Training im Fitness-Studio
                        verbrauchen mehr Kalorien als dir dein Schrittzähler berechnen kann, was zu ungenauen
                        Resultaten in deinem Kalorienverbrauch führen kann. Solche Aktivitäten kannst
                        du deshalb als "Aktivität" in der App eintragen.<br/><br/>
                        Weitere Infomationen zum PAL-Wert/Leistungsumsatz findest du auf 
                        <a href="https://de.wikipedia.org/wiki/Leistungsumsatz" target="_blank">Wikipedia</a>.
                        `
                    }
                }
            }
        }
    }

}
</script>
