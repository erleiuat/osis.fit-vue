<template>
    <v-fab-transition v-if="!$vuetify.breakpoint.mdAndUp">
        <v-btn @click="$router.push({name: 'food.add'})" fab fixed bottom right color="primary">
            <v-icon>add</v-icon>
        </v-btn>
    </v-fab-transition>
</template>

<script>
export default {
    name: 'BottomNav'
}
</script>
