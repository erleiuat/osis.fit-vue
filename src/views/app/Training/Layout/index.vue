<template>
    <transition appear name="fade" mode="out-in">
        <router-view>
        </router-view>
    </transition>
</template>

<script>
import exercise from '@/store/modules/exercise'

export default {
    name: 'Training',

    modules: {
        exercise
    },

    mounted () {
        this.$store.dispatch('exercise/load')
    }
}
</script>
