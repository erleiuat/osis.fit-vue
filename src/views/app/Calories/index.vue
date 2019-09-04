<template>
    <vcontainer>
        <CaloriesTable :date="$route.params.date" />
    </vcontainer>
</template>

<script>
const CaloriesTable = () => import('@/views/app/Calories/Table')

export default {
    name: 'Calories',

    components: {
        CaloriesTable
    }

}
</script>
