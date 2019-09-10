<template>
    <v-card hover link @click="$emit('select')" outlined>
        <v-img v-if="path" class="white--text" :lazy-src="path.lazy" :src="path.image" :max-height="maxHeight || 300">
            <v-card-title class="lightbox align-end fill-height">
                {{item.title}}
            </v-card-title>
        </v-img>
        <v-card-title v-else>
            {{item.title}}
        </v-card-title>
        <v-card-text v-if="!nodetails || !path" class="caption text-center">
            {{ $t('defAmount') }}: {{ item.amount }} g / ml<br />
            {{ $t('calPer100') }}: {{ item.caloriesPer100 }} Kcal<br />
            {{ $t('totalCal') }}: {{ total }} Kcal
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

    },

    i18n: {
        messages: {
            en: {
                defAmount: 'Default',
                calPer100: 'Calories / 100',
                totalCal: 'Total'
            },
            de: {
                defAmount: 'Menge',
                calPer100: 'Kalorien / 100',
                totalCal: 'Total'
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
