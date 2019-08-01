<template>
    <v-navigation-drawer v-model="drawer" app clipped floating>

        <v-list dense nav>

            <v-list-item v-for="item in items" :to="{name: item.to}" :key="item.to" link>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ $t('view.'+item.to+'.title') }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </v-list>

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
                <v-list-item :to="{ name: 'auth.logout' }" v-if="$store.getters['auth/status']" link>
                    <v-list-item-icon>
                        <v-icon>lock</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ $t('view.auth.logout.title') }}</v-list-item-title>
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
export default {
    name: 'Drawer',

    computed: {

        items () {
            if (this.$store.getters['auth/status']) return [
                { to: 'dashboard', icon: 'dashboard' },
                { to: 'calories', icon: 'restaurant' },
                { to: 'weight', icon: 'linear_scale' },
                { to: 'activity', icon: 'accessibility_new' },
                { to: 'templates', icon: 'dashboard' },
                { to: 'settings', icon: 'settings' }
            ]
            else return [
                { to: 'welcome', icon: 'home' },
                { to: 'auth.login', icon: 'lock_open' },
                { to: 'auth.register', icon: 'how_to_reg' }
            ]
        },

        drawer: {
            get () {
                return this.$store.state.app.drawer
            },
            set (val) {
                this.$store.commit('app/setDrawer', val)
            }
        }

    }

}
</script>
