<template>
    <v-container grid-list-xl>

        <v-layout row warp>
            <v-flex xs12>
                {{ flatObject }}
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12>
                <div class="display-4">{{ text }}</div>
                <div class="display-3">{{ text }}</div>
                <div class="display-2">{{ text }}</div>
                <div class="display-1">{{ text }}</div>
            </v-flex>

            <v-flex xs12>
                <div class="headline">{{ text }}</div>
                <div class="title">{{ text }}</div>
                <div class="subheading">{{ text }}</div>
            </v-flex>

            <v-flex xs12>
                <div class="body-2">{{ text }}</div>
                <div class="body-1">{{ text }}</div>
                <div class="caption">{{ text }}</div>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 v-for="opt in themeOpts" :key="opt">
                <v-card :class="opt">
                    <v-card-text>
                        <div class="body-2">{{ opt }}</div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs3 v-for="opt in themeOpts" :key="opt">
                <v-btn block :class="opt">
                    <div class="body-2">{{ opt }}</div>
                </v-btn>
            </v-flex>
        </v-layout>

        <v-layout>
            {{ sitemap }}
        </v-layout>

    </v-container>
</template>

<script>
export default {
    name: 'Theme',

    data () {
        return {
            text: 'Osis.fit',
            sitemap: '',
            flatObject: '',
            themeOpts: [
                'primary',
                'secondary',
                'accent',
                'success',
                'error',
                'warning',
                'info'
            ]
        }
    },

    methods: {

        flatten (array, prn) {
            var vm = this
            var allRoutes = []

            array.forEach(function (parentRoute) {
                var inPoint = prn + parentRoute.path + '/'
                allRoutes.push(prn + parentRoute.path)

                for (var key in parentRoute)
                    if (typeof parentRoute[key] === 'object')
                        if (parentRoute[key].length) {
                            var childs = vm.flatten(parentRoute[key], inPoint)
                            allRoutes = allRoutes.concat(childs)
                        }
            })

            return allRoutes
        }

    }

}
</script>
