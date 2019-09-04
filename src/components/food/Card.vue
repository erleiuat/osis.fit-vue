<template>
    <v-card hover link @click="$emit('select')" style="height: 100%" outlined>
        <v-img v-if="path" class="white--text" :lazy-src="path.lazy" :src="path.image" :max-height="maxHeight || 300">
            <v-card-title class="lightbox align-end fill-height">
                {{item.title}}
            </v-card-title>
        </v-img>
        <v-card-title v-else>
            {{item.title}}
        </v-card-title>
        <v-card-text v-if="!nodetails || !path" class="caption text-center">
            Standartmenge: {{ item.amount }}<br />
            Kalorien / 100: {{ item.caloriesPer100 }}<br />
            Total: {{ total }}
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'FoodCard',

    props: {
        item: Object,
        maxHeight: Number,
        nodetails: {
            type: Boolean,
            default: false
        }
    },

    computed: {

        path () {
            if (!this.item.image) return false
            else if (!this.item.image.path) {
                return {
                    image: this.item.image,
                    lazy: this.item.image
                }
            }

            var img = this.item.image.path.small
            var lazy = this.item.image.path.lazy

            return {
                image: img,
                lazy: lazy
            }
        },

        total () {
            if (!this.item.amount || !this.item.caloriesPer100) return null
            return Math.round(((this.item.amount / 100) * this.item.caloriesPer100) * 100) / 100
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
