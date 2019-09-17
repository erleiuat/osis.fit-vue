<template>
    <div style="height: 100%;"> <!-- TODO: BG Color at overflowing bottom -->
        <v-tabs grow icons-and-text v-if="showTabs">
            <v-tab class="ml-0" :to="{name: 'training.saved'}">
                {{ $t('title') }}
                <v-icon>save</v-icon>
            </v-tab>
            <v-tab class="ml-0" :to="{name: 'training.favorites'}">
                {{ $t('title1') }}
                <v-icon>star</v-icon>
            </v-tab>
            <v-tab class="ml-0" :to="{name: 'training.browse'}">
                {{ $t('title2') }}
                <v-icon>explore</v-icon>
            </v-tab>
        </v-tabs>
        <transition appear name="fade" mode="out-in">
            <router-view>
            </router-view>
        </transition>
    </div>
</template>

<script>
import exercise from '@/store/modules/exercise'

export default {
    name: 'Training',

    modules: {
        exercise
    },

    computed: {
        showTabs () {
            if (this.$route.name === 'training.saved') return true
            else if (this.$route.name === 'training.browse') return true
            else if (this.$route.name === 'training.favorites') return true
            else return false
        }
    },

    mounted () {
        this.$store.dispatch('exercise/load')
    },

    i18n: {
        messages: {
            en: {
                title: 'Saved',
                title1: 'Favorites',
                title2: 'Browse'
            },
            de: {
                title: 'Gespeichert',
                title1: 'Favoriten',
                title2: 'Entdecken'
            }
        }
    }

}
</script>
