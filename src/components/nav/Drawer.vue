<template>
    <v-navigation-drawer app v-model="drawer" class="secondary" dark clipped floating>
        <v-layout column fill-height>

            <v-list>
                <v-list-tile v-for="item in items" :to="{name: item.to}" :key="item.to">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('view.'+item.to+'.title') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>

            <v-spacer></v-spacer>

            <v-list>
                <v-list-tile :to="{ name: 'blog' }">
                    <v-list-tile-action>
                        <v-icon>event</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('view.blog.title') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile :to="{ name: 'help' }">
                    <v-list-tile-action>
                        <v-icon>help</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('view.help.title') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile :to="{ name: 'auth.logout' }" v-if="$store.state.auth.login">
                    <v-list-tile-action>
                        <v-icon>lock</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('view.auth.logout.title') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile :to="{ name: 'terms' }">
                    <v-list-tile-action>
                        <v-icon>notes</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('view.terms.title') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

        </v-layout>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'Drawer',

    computed: {

        items () {
            if (this.$store.state.auth.login)
                return [
                    { to: 'dashboard', icon: 'dashboard' },
                    { to: 'calories', icon: 'restaurant' },
                    { to: 'weights', icon: 'linear_scale' },
                    { to: 'activity', icon: 'accessibility_new' },
                    { to: 'templates', icon: 'dashboard' },
                    { to: 'settings', icon: 'settings' }
                ]
            else
                return [
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
                this.$store.commit('drawer', val)
            }
        }

    }

}
</script>
