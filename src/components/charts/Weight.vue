<template>
    <v-card v-if="values" flat>
        <v-card-text class="title pb-0 pt-2">
            {{ $t('title') }}
        </v-card-text>
        <canvas id="wChart" height="150px" />
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

            return {
                type: 'line',
                data: {
                    labels: tmp.labels,
                    datasets: [
                        {
                            data: tmp.data,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            borderColor: color,
                            borderWidth: 3
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
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
        if (!this.values) return
        this.createChart('wChart', this.chaDa)
        // this.convertCanvasToImage('wChart'); TODO
    },

    watch: {
        values () {
            this.createChart('wChart', this.chaDa)
        }
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
