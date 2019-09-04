<template>
    <v-list dense nav>

        <v-list-item v-for="(item,key) in items.i1" :to="item.to" :key="key" link>
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>{{ $t('view.'+item.title+'.title') }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-group :prepend-icon="items.i2.icon">
            <template v-slot:activator>
                <v-list-item-title>{{ $t('view.'+items.i2.to+'.title') }}</v-list-item-title>
            </template>
            <v-list-item v-for="(item,key) in items.i2.items" :to="{name: item.to}" :key="key" link>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
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
    name: 'DrawerItems',

    computed: {

        items () {
            var date = this.$store.getters['today'].date

            var items1 = {
                dashboard: { title: 'dashboard', to: { name: 'dashboard' }, icon: 'dashboard' },
                calories: { title: 'calories', to: { name: 'calories', params: { date: date } }, icon: 'restaurant' },
                weight: { title: 'weight', to: { name: 'weight' }, icon: 'linear_scale' },
                activity: { title: 'activity', to: { name: 'activity', params: { date: date } }, icon: 'accessibility_new' }
            }

            var item2 = {
                to: 'food',
                icon: 'fastfood',
                items: {
                    own: { title: this.$t('templates'), to: 'food', icon: 'folder_open' },
                    favorites: { title: this.$t('database'), to: 'food.favorites' , icon: 'layers' }
                }
            }

            var item3 = {
                to: 'training',
                icon: 'fitness_center',
                items: {
                    saved: { title: 'training.saved', to: 'training.saved', icon: 'list_alt' },
                    exercise: { to: 'exercise.saved', icon: 'calendar_view_day' }
                }
            }

            var items4 = {}

            if (!this.$store.getters['auth/premium']) {
                items4['premium'] = {
                    to: 'premium', icon: 'star', color: 'yellow'
                }
            }

            return {
                i1: items1,
                i2: item2,
                i3: item3,
                i4: items4
            }
        }

    },

    i18n: {
        messages: {
            en: {
                templates: 'Templates',
                database: 'Database'
            },
            de: {
                templates: 'Vorlagen',
                database: 'Datenbank'
            }
        }
    }

}
</script>
