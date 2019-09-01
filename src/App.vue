<template>
    <v-app>

        <router-view name="toolbar" />

        <v-content>
            <router-view />
        </v-content>

        <router-view name="bottom" />

    </v-app>
</template>

<script>
export default {
    name: 'App',

    data: () => ({

    })

}
</script>
