<template>
    <transition appear name="fade" mode="out-in">
        <router-view>
        </router-view>
    </transition>
</template>

<script>
export default {
    name: 'Templates',

    i18n: {
        messages: {
            en: {
                addCalories: 'Calories',
                templates: 'Templates'
            },
            de: {
                addCalories: 'Kalorien',
                templates: 'Vorlagen'
            }
        }
    }

}
</script>
