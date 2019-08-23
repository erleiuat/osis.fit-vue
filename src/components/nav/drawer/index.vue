<template>
    <v-navigation-drawer v-model="drawer" app floating>

        <template v-slot:prepend>
            <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
                <v-row class="lightbox">
                    <v-col cols="12" class="pb-0">
                        <v-list dense dark>
                            <v-list-item>
                                <v-list-item-avatar v-if="$store.getters['user/image']">
                                    <v-img :src="$store.getters['user/image']" />
                                </v-list-item-avatar>
                                <v-list-item-avatar v-else>
                                    <v-img :src="require('@/assets/img/user.png')" />
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title class="title">{{ $store.getters['user/fullName'] }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-img>
        </template>

        <DrawerItems v-if="$store.getters['auth']" />

        <template v-slot:append>
            <v-divider></v-divider>
            <v-list dense nav>
                <v-list-item :to="{ name: 'settings' }" link>
                    <v-list-item-icon>
                        <v-icon>settings</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ $t('view.settings.title') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :to="{ name: 'help' }" v-if="$store.getters['auth']" link>
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
import user from '@/store/modules/user'

const DrawerItems = () => import('@/components/nav/drawer/DrawerItems')

export default {
    name: 'Drawer',

    components: {
        DrawerItems
    },

    modules: {
        user
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
