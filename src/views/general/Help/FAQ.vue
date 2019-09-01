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
                <div class="title">
                    FAQ
                </div>
            </v-col>
            <v-col cols="12" sm="10">
                <v-expansion-panels>
                    <v-expansion-panel v-for="(item,i) in 10" :key="i">
                        <v-expansion-panel-header>Item</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>

        <v-row dense justify="end">
            <v-col cols="auto" class="text-right">
                    Konnte dein Anliegen noch nicht geklärt werden?<br/>
                <v-btn outlined :to="{name: 'help.contact'}">
                    Support kontaktieren
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

        }
    },

    i18n: {
        messages: {
            en: {
                text: 'No one has asked us a question yet.',
                doYou: 'Would you like to?'
            },
            de: {
                text: 'Uns hat bisher noch niemand eine Frage gestellt.',
                doYou: 'Möchtest du?'
            }
        }
    }

}
</script>
