<template>
    <v-app-bar app flat>

        <v-app-bar-nav-icon @click.stop="drawer()" />

        <slot>
            <v-toolbar-title class="headline">
                <span>Osis.Fit</span>
            </v-toolbar-title>
        </slot>

    </v-app-bar>
</template>

<script>
export default {
    name: 'Toolbar',

    methods: {
        drawer () {
            this.$store.dispatch('app/drawer')
        }
    }
}
</script>
