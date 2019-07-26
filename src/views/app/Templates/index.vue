<template>
    <v-container fluid pa-0>
        <v-flex xs12>
            <v-tabs slider-color="primary" grow>
                <v-tab :to="{name: 'templates'}">
                    <v-icon>folder</v-icon>
                </v-tab>
                <v-tab :to="{name: 'templates.favorite'}">
                    <v-icon>favorite</v-icon>
                </v-tab>
                <v-tab :to="{name: 'templates.browse'}">
                    <v-icon>search</v-icon>
                </v-tab>
            </v-tabs>
        </v-flex>
        <transition appear name="fade" mode="out-in">
            <router-view>
            </router-view>
        </transition>
    </v-container>
</template>

<script>
export default {
    name: 'Templates',

    i18n: {
        messages: {
            en: {
                addCalories: 'Calories',
                templates: 'Templates'
            },
            de: {
                addCalories: 'Kalorien',
                templates: 'Vorlagen'
            }
        }
    }

}
</script>
