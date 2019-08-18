<template>
    <v-navigation-drawer v-model="drawer" app floating temporary>

        <AuthDrawer v-if="$store.getters['auth']" />

        <NoAuthDrawer v-else />

        <template v-slot:append>
            <v-list dense nav>
                <v-list-item :to="{ name: 'help' }" link>
                    <v-list-item-icon>
                        <v-icon>help</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ $t('view.help.title') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :to="{ name: 'logout' }" v-if="$store.getters['auth']" link>
                    <v-list-item-icon>
                        <v-icon>lock</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ $t('view.logout.title') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :to="{ name: 'terms' }" link>
                    <v-list-item-icon>
                        <v-icon>notes</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ $t('view.terms.title') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </template>

    </v-navigation-drawer>
</template>

<script>
const AuthDrawer = () => import('@/components/nav/drawer/Auth')
const NoAuthDrawer = () => import('@/components/nav/drawer/NoAuth')

export default {
    name: 'Drawer',

    components: {
        AuthDrawer, NoAuthDrawer
    },

    computed: {

        drawer: {
            get () {
                return this.$store.state.app.drawer
            },
            set (val) {
                this.$store.commit('setDrawer', val)
            }
        }

    }

}
</script>
