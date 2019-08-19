<template>
    <div>
        <v-app-bar v-if="$vuetify.breakpoint.xsOnly" class="mt-2 ml-2 mr-2" dense app color="primary" dark elevate-on-scroll hide-on-scroll :tile="false">
            <slot></slot>
        </v-app-bar>
        <v-app-bar v-else app color="primary" elevate-on-scroll hide-on-scroll dark>
            <slot></slot>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    name: 'Default'
}
</script>
