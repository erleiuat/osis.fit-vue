<template>
    <v-card v-if="values" outlined>
        <v-card-text class="title pb-0 pt-2">
            {{ $t('title') }}
        </v-card-text>
        <canvas id="wChart" />
    </v-card>
</template>

<script>
import Chart from 'chart.js'

export default {
    name: 'WeightChart',

    computed: {

        values () {
            var arr = this.$store.getters['weight/all']
            if (!arr || arr.length <= 1) return false

            var labels = []
            var data = []

            arr.sort(function (a, b) {
                return (
                    new Date(a.date + 'T' + a.time) -
                    new Date(b.date + 'T' + b.time)
                )
            })

            arr.forEach(ele => {
                labels.push(this.$dateFormat(ele.date))
                data.push(ele.weight)
            })

            return {
                labels: labels,
                data: data
            }
        },

        chaDa () {
            var tmp = this.values
            var color = '#' + this.$vuetify.theme.currentTheme.primary
            var color2 = '#' + this.$vuetify.theme.currentTheme.secondary

            return {
                type: 'line',
                data: {
                    labels: tmp.labels,
                    datasets: [
                        {
                            data: tmp.data,
                            backgroundColor: color2,
                            borderColor: color,
                            borderWidth: 3
                        }
                    ]
                },
                options: {
                    responsive: true,
                    lineTension: 2,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
                                padding: 5
                            }
                        }]
                    }
                }
            }
        }

    },

    methods: {

        createChart (chartId, chartData) {
            const ctx = document.getElementById(chartId)
            const myChart = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options
            })
            return myChart
        },

        convertCanvasToImage (chartId) {
            var canvas = document.getElementById(chartId)
            var image = new Image()
            image.src = canvas.toDataURL('image/png')
        }

    },

    mounted () {
        this.createChart('wChart', this.chaDa)
        // this.convertCanvasToImage('wChart'); TODO
    },

    i18n: {
        messages: {
            en: {
                title: 'Process'
            },
            de: {
                title: 'Verlauf'
            }
        }
    }

}
</script>
