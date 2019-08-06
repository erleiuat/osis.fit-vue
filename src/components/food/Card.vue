<template>
    <v-card hover link @click="$emit('select')">
        <v-img v-if="path" class="white--text" :lazy-src="path.lazy" :src="path.image">
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
            Total: {{ item.amount * item.caloriesPer100 }}
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'FoodCard',
    props: {
        item: Object
    },
    computed: {
        path () {
            if(!this.item.image) return false

            var img = this.item.image.path.small
            var lazy = this.item.image.path.lazy

            return {
                image: img,
                lazy: lazy
            }
        }
    }
}
</script>

<style scoped>
.lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}
</style>
