<template>
    <v-navigation-drawer v-model="toggle" app floating>

        <v-list nav dense>
            <v-list-item-group active-class="deep-purple--text text--accent-4">
                <v-list-item>
                    <v-list-item-title>Foo</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>Bar</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>Fizz</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>Buzz</v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>

    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'Drawer',

    computed: {
        toggle: {
            get () {
                return this.$store.getters['app/drawer']
            },
            set (val) {
                this.$store.commit('app/setDrawer', val)
            }
        }
    }

}
</script>
