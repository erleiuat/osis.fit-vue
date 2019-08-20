<template>
    <vcontainer align="center" style="min-height: 400px;">
        <v-row justify="center" dense>
            <v-col cols="12" sm="6">
                <v-btn color="primary" block depressed>
                    Change Password
                </v-btn>
            </v-col>
        </v-row>
        <v-row justify="center" dense>
            <v-col cols="12" sm="6">
                <v-btn color="primary" block depressed>
                    Download Data
                </v-btn>
            </v-col>
        </v-row>
        <v-row justify="center" dense>
            <v-col cols="12" sm="6">
                <v-btn color="primary" block depressed>
                    Delete Account
                </v-btn>
            </v-col>
        </v-row>
    </vcontainer>
</template>

<script>
export default {
    name: 'EditAccount',

    data () {
        return {
        }
    },
    
    i18n: {
        messages: {
            en: {
                title: 'Aims',
                weight: 'Weight',
                date: 'Date'
            },
            de: {
                title: 'Ziele',
                weight: 'Gewicht',
                date: 'Datum'
            }
        }
    }

}
</script>
