<template>
    <v-toolbar-items>
        <v-btn text :to="{name: 'auth.login'}">
            Login
        </v-btn>
        <v-btn text :to="{name: 'auth.register'}">
            Register
        </v-btn>
    </v-toolbar-items>
</template>

<script>
export default {
    name: 'Toolbar'
}
</script>
