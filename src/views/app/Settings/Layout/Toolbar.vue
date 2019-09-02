<template>
    <Default>

        <template v-slot:toggler v-if="$route.name !== 'settings' && $vuetify.breakpoint.smAndDown">
            <v-btn icon @click="$router.go(-1)">
                <v-icon>
                    navigate_before
                </v-icon>
            </v-btn>
        </template>

    </Default>
</template>

<script>
import Default from '@/components/nav/toolbar/Default'

export default {
    name: 'Toolbar',

    components: {
        Default
    }

}
</script>
