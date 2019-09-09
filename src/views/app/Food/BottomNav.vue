<template>
    <v-fab-transition v-if="showAdd">
        <v-btn @click="$router.push({name: 'food.add'})" fab fixed bottom right color="primary">
            <v-icon>add</v-icon>
        </v-btn>
    </v-fab-transition>
</template>

<script>
export default {
    name: 'BottomNav',

    computed: {
        showAdd () {
            if (!this.$vuetify.breakpoint.mdAndUp) {
                if (this.$route.name !== 'food.favorites') return true
            }
            return false
        }
    }

}
</script>
