<template>
    <vcontainer align="space-evenly">
        <v-row justify="center">
            <v-col cols="12" md="10">
                <div class="headline">
                    FAQ
                </div>
                <div class="caption">
                    {{ $t('subText') }}
                </div>
            </v-col>
            <v-col cols="12" md="10">
                <v-expansion-panels v-model="openPanel">
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

        <v-row dense>
            <v-col cols="12" md="10" class="text-right">
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
            openPanel: null,
            faqItems: [
                { title: this.$t('fqi.a.title'), text: this.$t('fqi.a.text') },
                { title: this.$t('fqi.b.title'), text: this.$t('fqi.b.text') },
                { title: this.$t('fqi.c.title'), text: this.$t('fqi.c.text') },
                { title: this.$t('fqi.d.title'), text: this.$t('fqi.d.text') },
                { title: this.$t('fqi.e.title'), text: this.$t('fqi.e.text') }
            ]
        }
    },

    i18n: {
        messages: {
            en: {
                subText: 'Check the frequently asked questions before contacting us. They may be able to help you faster than our support team.',
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
                    },
                    c: {
                        title: 'How accurate are the calculations? Where do they come from?',
                        text: `
                        When developing and checking our formulas, we are very precise and also work with
                        <b> Swiss recognized doctors</b>. <br/><br/>
                        The methods are basically the same as those used for many other fitness and 
                        Weight loss applications (WeightWatchers, BodyChange etc.) and have often proven 
                        their effectiveness in the past. <br/><br/>
                        After all, <b>the most important factor</b> for the accuracy of the calculations and therefore your
                        Success <b> is always you </b> - that's why it is important that you keep your information 
                        (weight, calories consumed and additional activities) constantly up to date.
                        `
                    },
                    d: {
                        title: "The results of the calculations don't seem right to me. What is the reason for this?",
                        text: `
                        Some factors are decisive for the calculations. Therefore, check the following details in 
                        your profile again for their correctness: <br/>
                        <ul>
                            <li>Make sure your current <b>weight</b> is correct.</li>
                            <li>Check the information about your <b>metabolism</b> (height, gender, date of birth, PAL value) in the <b>settings.</b></li>
                            <li>Set yourself <b>realistic targets</b> (target weight, date) in the settings.</li>
                        </ul>
                        If you think that your calculations are still not correct, you can also contact us.
                        `
                    },
                    e: {
                        title: 'My daily calorie requirement is extremely high/low. How can I change it?',
                        text: `
                        If all your information is correct and you still get an extremely high or low calorie requirement, 
                        it's probably because of your goals. If you want to lose too much weight in too short a time, you 
                        may end up with a much too low calorie requirement. Low calorie intake can have bad consequences 
                        for your health, so you should set realistic goals. Try shifting your target date to a later date 
                        or using a smaller target weight. When you have reached your goal, you can still set a new goal. 
                        If you think that your calculations are still incorrect, you can also contact us.
                        `
                    }
                }
            },
            de: {
                subText: 'Durchsuche die häufig gestellten Fragen bevor du uns kontaktierst. Sie können dir vielleicht schneller helfen als unser Support-Team.',
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
                    },
                    c: {
                        title: 'Wie genau sind die Berechnungen? Woher stammen sie?',
                        text: `
                        Bei der Erarbeitung und Überprüfung unserer Formeln sind wir sehr genau und arbeiten
                        auch mit <b>schweizerisch anerkannten Ärzten</b> zusammen. <br/><br/>
                        Die Methoden sind grundsätzlich die Selben wie bei zahlreichen anderen Fitness- und 
                        Gewichtsverlust-Anwendungen (WeightWatchers, BodyChange etc.) und haben ihre Wirksamkeit 
                        in der Vergangenheit schon oft belegt. <br/><br/>
                        <b>Der wichtigste Faktor</b> für die Richtigkeit der Berechnungen und somit deinen
                        Erfolg <b>bist jedoch immer du</b> - deshalb ist es wichtig, dass du deine Angaben 
                        (Gewicht, konsumierte Kalorien und zusätzliche Aktivitäten) stetig auf dem 
                        aktuellsten Stand hälst.
                        `
                    },
                    d: {
                        title: 'Die Resultate der Berechnungen scheinen mir nicht richtig. Woran liegt das?',
                        text: `
                        Für die Berechnungen sind einige Faktoren ausschlaggebend. Überprüfe deshalb die folgenden 
                        Angaben in deinem Profil nochmals auf ihre Richtigkeit: <br/>
                        <ul>
                            <li>Stelle sicher, dass dein aktuelles <b>Gewicht</b> richtig ist.</li>
                            <li>Überprüfe die Angaben zu deinem <b>Stoffwechsel</b> (Körpergrösse, Geschlecht, Geburtsdatum, PAL-Wert) in den <b>Einstellungen.</b></li>
                            <li>Stelle dir <b>realistische Ziele</b> (Ziel-Gewicht, Datum) in den Einstellungen.</li>
                        </ul>
                        Wenn du denkst, dass deine Berechnungen noch immer nicht stimmen, kannst du uns auch kontaktieren.
                        `
                    },
                    e: {
                        title: 'Mein täglicher Kalorienbedarf ist extrem hoch/niedrig. Wie kann ich ihn ändern?',
                        text: `
                        Wenn alle deine Angaben stimmen und du trotzdem einen extrem hohen oder niedrigen Kalorienbedarf erhälst,
                        liegt das wahrscheinlich an deinen Zielen. Wenn du zu viel in zu kurzer Zeit abnehmen möchtest, kann das in einem
                        viel zu niedrigen Kalorienbedarf enden. Eine zu geringe Kalorienaufnahme kann dabei schlechte Folgen für deine Gesundheit 
                        haben, weshalb du dir realistische Ziele setzen solltest. Versuche dein Ziel-Datum auf einen späteren Zeitpunkt zu versetzen oder
                        nutze ein kleineres Ziel-Gewicht. Wenn du dein Ziel erreicht hast kannst du dir immer noch ein neues Ziel setzen.
                        Wenn du denkst, dass deine Berechnungen noch immer nicht stimmen, kannst du uns auch kontaktieren.
                        `
                    }
                }
            }
        }
    }

}
</script>
