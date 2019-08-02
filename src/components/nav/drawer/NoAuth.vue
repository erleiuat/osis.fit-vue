<template>
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
</template>

<script>
export default {
    name: 'NoAuthDrawer',

    computed: {

        items () {
            return [
                { to: 'welcome', icon: 'home' },
                { to: 'auth.login', icon: 'lock_open' },
                { to: 'auth.register', icon: 'how_to_reg' }
            ]
        }

    }

}
</script>
