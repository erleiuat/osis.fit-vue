<template>
    <v-card v-if="true" outlined>
        <v-card-text class="headline pb-0">
            {{ $t('title') }}
        </v-card-text>
        <canvas id="myChart"></canvas>
        <!--
        <v-sparkline :value="values" :stroke-linecap="set.strokeLinecap" :fill="set.fill" :color="set.color" :gradient="set.gradient" :line-width="set.lineWidth" :padding="set.padding" :smooth="set.smooth" :auto-draw="set.autoDraw">
            <template v-slot:label="item">
                {{ item.value }}
            </template>
        </v-sparkline>
        -->
    </v-card>
</template>

<script>
import Chart from 'chart.js';

export default {
    name: 'WeightChart',

    data () {
        return {
            chaDa: {
                type: 'line',
                data: {
                    labels: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
                    datasets: [
                        { // one line graph
                            label: 'Number of Moons',
                            data: [0, 0, 1, 2, 67, 62, 27, 14],
                            backgroundColor: [
                                'rgba(54,73,93,.5)', // Blue
                                'rgba(54,73,93,.5)',
                                'rgba(54,73,93,.5)',
                                'rgba(54,73,93,.5)',
                                'rgba(54,73,93,.5)',
                                'rgba(54,73,93,.5)',
                                'rgba(54,73,93,.5)',
                                'rgba(54,73,93,.5)'
                            ],
                            borderColor: [
                                '#36495d',
                                '#36495d',
                                '#36495d',
                                '#36495d',
                                '#36495d',
                                '#36495d',
                                '#36495d',
                                '#36495d',
                            ],
                            borderWidth: 3
                        },
                        { // another line graph
                            label: 'Planet Mass (x1,000 km)',
                            data: [4.8, 12.1, 12.7, 6.7, 139.8, 116.4, 50.7, 49.2],
                            backgroundColor: [
                                'rgba(71, 183,132,.5)', // Green
                            ],
                            borderColor: [
                                '#47b784',
                            ],
                            borderWidth: 3
                        }
                    ]
                },
                options: {
                    responsive: true,
                    lineTension: 1,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                padding: 25,
                            }
                        }]
                    }
                }
            }
        }
    },

    methods: {
        createChart (chartId, chartData) {
            const ctx = document.getElementById(chartId);
            const myChart = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options,
            });
        }
    },

    mounted () {
        this.createChart('myChart', this.chaDa);
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
