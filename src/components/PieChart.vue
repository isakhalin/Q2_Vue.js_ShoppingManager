<template>
    <Pie
            :chart-options="chartOptions"
            :chart-data="getChartData"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
    />
</template>

<script>
    import {Pie} from 'vue-chartjs/legacy/'
    import {Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale} from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

    export default {
        name: 'PieChart',
        components: {Pie},
        props: {
            dataFromCat: {
                type: Array,
                default: () => {
                    return []
                }
            },
            chartId: {
                type: String,
                default: 'pie-chart'
            },
            datasetIdKey: {
                type: String,
                default: 'label'
            },
            width: {
                type: Number,
                default: 400
            },
            height: {
                type: Number,
                default: 400
            },
            cssClasses: {
                default: '',
                type: String
            },
            styles: {
                type: Object,
                default: () => {
                }
            },
            plugins: {
                type: Array,
                default: () => {
                }
            }
        },
        data() {
            return {
                // chartData: {
                //     labels: ['January', 'February', 'March', 'April'],
                //     datasets: [
                //         {
                //             backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                //             data: [40, 20, 12, 34]
                //         }
                //     ]
                // },
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false
                },
                ar: {
                    data: [40, 20, 12, 34, 53, 43, 23, 70]
                }
            }
        },
        computed: {
            getChartData() {
                return {
                    labels: this.$store.getters.getCategoryList,
                    datasets: [
                        {
                            backgroundColor: [
                                '#41b883', '#795f45', '#00D8FF', '#DD1B16',
                                '#717642', '#B54352', '#01D5DF', '#DBE214',
                                '#3774ee', '#7c45a0'],
                            data: this.ar.data
                        }
                    ]
                }
            },
            // getValueOfCategorys() {
            //     let catList = [...this.$store.getters.getCategoryList]
            //     catList.forEach(el => {
            //
            //     });
            //
            //     return {
            //         Cat1: 157,
            //         Cat2: 24,
            //         Cat3: 432,
            //         Cat4: 23,
            //         Cat5: 34,
            //         Cat6: 64,
            //         Cat7: 345,
            //         Cat8: 534
            //     }
            // }
        }
    }
</script>

<style scoped>

</style>