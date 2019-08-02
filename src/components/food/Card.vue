<template>
    <v-card outlined>
        <v-img v-if="item.image" class="white--text" :lazy-src="item.image.lazyPath" :src="item.image.fullPath">
            <v-card-title class="lightbox align-end fill-height">
                {{item.title}}
            </v-card-title>
        </v-img>
        <v-card-title v-else>
            {{item.title}}
        </v-card-title>
        <v-card-text>
            Standartmenge: {{ item.amount }}<br />
            Kalorien / 100: {{ item.caloriesPer100 }}<br />
            Total: {{ item.amount * item.caloriesPer100 }}<br />
        </v-card-text>
        <v-card-actions>
            <v-btn icon @click="$emit('edit', item)">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon @click="$emit('delete', item)">
                <v-icon>delete</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'FoodCard',

    props: {
        item: Object
    }
}
</script>

<style scoped>
.lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}
</style>