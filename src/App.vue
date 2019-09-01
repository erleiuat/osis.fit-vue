<template>
    <v-app>

        <Toolbar>
            <router-view name="toolbar" />
        </Toolbar>

        <Drawer />

        <Notification />

        <v-content>
            <router-view />
        </v-content>

        <router-view name="bottom" />

    </v-app>
</template>

<script>
import Toolbar from '@/components/navigation/Toolbar/'
import Drawer from '@/components/navigation/Drawer/'
import Notification from '@/components/Notification'

export default {
    name: 'App',

    components: {
        Toolbar, Drawer, Notification
    },

    data: () => ({

    })

}
</script>

<style>
.row {
    /* 
        Fix for v-container issue 
        https://github.com/vuetifyjs/vuetify/issues/8608
    */
    width: 100%; 
}
</style>