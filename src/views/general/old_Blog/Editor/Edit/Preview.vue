<template>
    <v-dialog v-model="show" v-show="show" width="500" transition="dialog-bottom-transition">

        <template v-slot:activator="{ on }">
            <v-btn block outline depressed v-on="on">
                <v-icon>play_circle_outline</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card :color="content.color" :dark="content.dark" flat>
                <v-img v-if="content.img_url" :src="content.img_url" max-height="200"></v-img>
                <v-card-title class="display-1 pb-0">
                    {{ content.title }}
                </v-card-title>
                <v-card-text class="caption pb-0">
                    {{ content.description }}...
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn outline @click="show = false">
                        {{ $t('btn.close') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-card>

    </v-dialog>
</template>

<script>
export default {
    name: 'Preview',

    props: {
        content: Object
    },

    data () {
        return {
            show: false
        }
    }

}
</script>
