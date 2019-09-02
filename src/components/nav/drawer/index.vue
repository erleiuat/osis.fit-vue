<template>
    <v-navigation-drawer v-model="drawer" app floating>

        <template v-slot:prepend>
            <v-img :lazy-src="require('@/assets/img/drawer_bg_lazy.jpg')" :src="require('@/assets/img/drawer_bg.jpg')" max-height="144">

                <v-row class="lightbox">
                    <v-col cols="12" class="pb-0">
                        <v-list dense dark>
                            <v-list-item link @click="$router.push({name: 'settings.profile'})">
                                <v-list-item-avatar v-if="$store.getters['user/image']">
                                    <v-img :src="$store.getters['user/image'].path.small" />
                                </v-list-item-avatar>
                                <v-list-item-avatar v-else>
                                    <v-img :src="require('@/assets/img/user.png')" />
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-list-item two-line link @click="$router.push({name: 'settings.profile'})">
                                <v-list-item-content>
                                    <v-list-item-title class="subheader">
                                        {{ $store.getters['user/fullName'] }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{ $store.getters['auth/account'].username }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-img>
        </template>

        <DrawerItems v-if="$store.getters['auth/authorized']" />

        <template v-slot:append>
            <v-divider></v-divider>
            <v-container class="pt-2 pb-2">
                <v-row no-gutters align="center">
                    <v-col cols="10" class="caption">
                        <v-btn icon :to="{ name: 'settings' }">
                            <v-icon>settings</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="2" class="text-right">
                        <v-menu left transition="slide-y-transition">
                            <template v-slot:activator="{ on }">
                                <v-btn icon small v-on="on">
                                    <v-icon>more_horiz</v-icon>
                                </v-btn>
                            </template>
                            <v-list dense nav>
                                <v-list-item :to="{ name: 'help' }" v-if="$store.getters['auth/authorized']" link>
                                    <v-list-item-icon>
                                        <v-icon>help</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ $t('view.help.title') }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item :to="{ name: 'logout' }" v-if="$store.getters['auth/authorized']" link>
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
                                <v-list-item :to="{ name: 'about' }" link>
                                    <v-list-item-icon>
                                        <v-icon>info</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ $t('view.about.title') }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-menu>

                    </v-col>
                </v-row>
            </v-container>
        </template>

    </v-navigation-drawer>
</template>

<script>
const DrawerItems = () => import('@/components/nav/drawer/DrawerItems')

export default {
    name: 'Drawer',

    components: {
        DrawerItems
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

<style scoped>
.lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}
</style>
