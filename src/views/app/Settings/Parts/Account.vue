<template>
    <v-list>

        <v-list-group>
            <template v-slot:activator>
                <v-list-item-title>
                    Change Password
                </v-list-item-title>
            </template>
            <v-list-item>
                COMING SOON
            </v-list-item>
        </v-list-group>

        <v-list-group>
            <template v-slot:activator>
                <v-list-item-title>
                    Download Data
                </v-list-item-title>
            </template>
            <v-list-item>
                COMING SOON
            </v-list-item>
        </v-list-group>

        <v-list-group>
            <template v-slot:activator>
                <v-list-item-title>
                    Delete Account
                </v-list-item-title>
            </template>
            <v-list-item>
                COMING SOON
            </v-list-item>
        </v-list-group>

    </v-list>
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
