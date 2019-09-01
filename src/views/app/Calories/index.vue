<template>
    <vcontainer fluid>
        <CaloriesTable :date="$route.params.date" />
    </vcontainer>
</template>

<script>
import calories from '@/store/modules/calories'
const CaloriesTable = () => import('@/views/app/Calories/Table')

export default {
    name: 'Calories',

    components: {
        CaloriesTable
    },

    modules: {
        calories
    }

}
</script>
