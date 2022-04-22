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
                // chartData: {  //Объект, который должен приходить в чарт
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
                }
            }
        },
        computed: {
            getChartData() {
                let dataForChart = {
                    labels: [],
                    datasets: [{
                        backgroundColor: [
                            '#41b883', '#795f45', '#00D8FF', '#DD1B16',
                            '#717642', '#B54352', '#01D5DF', '#DBE214',
                            '#3774ee', '#7c45a0'
                        ],
                        data: []
                    }]
                }
                let paymentList = this.$store.getters.getCachedList;
                let catList = this.$store.getters.getCategoryList;
                catList.forEach(el => { // el = Food
                    let initialValue = 0;  //Начальное значение
                    let summ = paymentList.reduce((accumulator, currentValue) => {
                        if (currentValue.category == el) {
                            return accumulator + currentValue.value
                        } else {
                            return accumulator
                        }
                    }, initialValue);
                    // console.log(`Cумма ${el} равна ${summ}`)
                    // console.log(summ)
                    if (summ > 0) {
                        dataForChart.labels.push(el);
                        dataForChart.datasets[0].data.push(summ);
                    }
                });

                return dataForChart;
            }
        }
    }
</script>

<style scoped>

</style>