<template>
    <v-list dense nav>

        <v-list-item v-for="item in items.i1" :to="{name: item.to}" :key="item.to" link>
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>{{ $t('view.'+item.to+'.title') }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-group :prepend-icon="items.i2.icon">
            <template v-slot:activator>
                <v-list-item-title>{{ $t('view.'+items.i2.to+'.title') }}</v-list-item-title>
            </template>

            <v-list-item v-for="(item,key) in items.i2.items" :to="{name: item.to}" :key="key" link>
                <v-list-item-title>{{ $t('view.'+(item.title || item.to)+'.title') }}</v-list-item-title>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
            </v-list-item>
        </v-list-group>

        <v-list-item v-for="item in items.i3" :to="{name: item.to}" :key="item.to" link>
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
    name: 'AuthDrawer',

    computed: {

        items () {

            var premium = this.$store.getters['auth/premium']

            var items1 = {
                dashboard: { to: 'dashboard', icon: 'dashboard' },
                calories: { to: 'calories', icon: 'restaurant' },
                weight: { to: 'weight', icon: 'linear_scale' },
                activity: { to: 'activity', icon: 'accessibility_new' }
            }

            if (premium) var item2 = {
                to: 'food',
                icon: 'dashboard',
                items: {
                    own: { title: 'food.own', to: 'food.own', icon: 'folder' },
                    favorites: { to: 'food.favorites', icon: 'favorite' },
                    browse: { to: 'food.browse', icon: 'search' }
                }
            }
            else var item2 = {
                to: 'food',
                icon: 'dashboard',
                items: {
                    own: { title: 'food.own', to: 'food.own', icon: 'folder' },
                    favorites: { title: 'food.favorites', to: 'premium', icon: 'favorite' },
                    browse: { title: 'food.browse', to: 'premium', icon: 'search' }
                }
            }

            var items3 = {
                settings: { to: 'settings', icon: 'settings' }
            }

            return {
                i1: items1,
                i2: item2,
                i3: items3
            }
        }

    }

}
</script>
