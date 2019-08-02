<template>
    <v-card outlined>
        <v-img v-if="item.image" class="white--text" :lazy-src="item.image.lazyPath" :src="item.image.fullPath">
            <v-card-title class="align-end fill-height">{{item.title}}</v-card-title>
        </v-img>
        <v-card-title v-else>
            {{item.title}}
        </v-card-title>

        <v-card-text>
            I'm card text
        </v-card-text>

        <v-card-actions>
            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn text>Click</v-btn>
            <v-btn outlined>Click</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'TemplateCard',
    props: {
        item: Object
    }
}
</script>