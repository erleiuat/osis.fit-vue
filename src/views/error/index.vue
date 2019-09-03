<template>
    <vcontainer align="space-evenly">
        <v-row align="center" justify="center">
            <router-view v-if="$route.name && ($route.name !== 'error' && $route.name !== 'error.found')"/>
            <notFound v-else />
        </v-row>
    </vcontainer>
</template>

<script>
const notFound = () => import('@/views/error/NotFound')

export default {
    name: 'Error',
    components: {
        notFound
    }
}
</script>
