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

        <v-list-group :prepend-icon="items.i3.icon">
            <template v-slot:activator>
                <v-list-item-title>{{ $t('view.'+items.i3.to+'.title') }}</v-list-item-title>
            </template>
            <v-list-item v-for="(item,key) in items.i3.items" :to="{name: item.to}" :key="key" link>
                <v-list-item-title>{{ $t('view.'+(item.title || item.to)+'.title') }}</v-list-item-title>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
            </v-list-item>
        </v-list-group>

        <v-list-item v-for="item in items.i4" :to="{name: item.to}" :key="item.to" link>
            <v-list-item-icon>
                <v-icon :color="item.color ? item.color : null">
                    {{ item.icon }}
                </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>
                    {{ $t('view.'+item.to+'.title') }}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

    </v-list>
</template>

<script>
export default {
    name: 'AuthDrawer',

    computed: {

        items () {
            var items1 = {
                dashboard: { to: 'dashboard', icon: 'dashboard' },
                calories: { to: 'calories', icon: 'restaurant' },
                weight: { to: 'weight', icon: 'linear_scale' },
                activity: { to: 'activity', icon: 'accessibility_new' }
            }

            var item2 = {
                to: 'food',
                icon: 'fastfood',
                items: {
                    own: { title: 'food.own', to: 'food', icon: 'folder' },
                    favorites: { to: 'food.favorites', icon: 'favorite' }
                }
            }

            var item3 = {
                to: 'training',
                icon: 'fitness_center',
                items: {
                    saved: { title: 'training.saved', to: 'training.saved', icon: 'list_alt' },
                    exercise: { to: 'training.exercise.saved', icon: 'calendar_view_day' }
                }
            }

            var items4 = {
                settings: { to: 'settings', icon: 'settings' }
            }

            if (!this.$store.getters['premium'])
                items4['premium'] = {
                    to: 'premium', icon: 'star', color: 'yellow'
                }

            return {
                i1: items1,
                i2: item2,
                i3: item3,
                i4: items4
            }
        }

    }

}
</script>
