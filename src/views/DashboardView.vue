<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="text-h5 text-sm-h4 pb-2">Менеджер покупок</div>

                <!--                <v-dialog v-model="dialog">-->
                <!--                    <template v-slot:activator="{ on }">-->
                <!--                        <v-btn color="teal" dark v-on="on">-->
                <!--                            ADD NEW COST-->
                <!--                            <v-icon>mdi-plus</v-icon>-->
                <!--                        </v-btn>-->
                <!--                    </template>-->
                <!--                    <v-card>-->
                <!--                        <AddPayment></AddPayment>-->
                <!--                    </v-card>-->
                <!--                </v-dialog>-->

                <DashBoardStats :summ="getValueOfAllPayments"/>

                <PaymentsDisplay :list="currentElements"/>

                <MyPagination :allPages="getAllPages"
                              :additionPaymentListLength="additionPaymentList.length"
                              :displayedElements="displayedElements"
                              @changePage="onChangePage"
                />
            </v-col>

            <v-col>
                DIAGRAMMA
                <PieChart></PieChart>
            </v-col>
        </v-row>
        <!--        <div class="wrapper">-->
        <!--            <header>-->
        <!--                <p class="title">My personal cost</p>-->
        <!--                <div>My total {{ getFPV }}</div>-->
        <!--            </header>-->
        <!--            <main>-->
        <!--                                    <AddPayment-->
        <!--                                            @addNewPayment="addData"-->
        <!--                                    />-->
        <!--                                    <ModalWindowAddPaymentForm v-if="addFormShow" @close='addFormShow=false' :settings="settings" />-->
        <!--                <PaymentsDisplay :list="currentElements"/>-->
        <!--                <my-pagination-->
        <!--                        :allPages="getAllPages"-->
        <!--                        :testLength="additionPaymentList.length"-->
        <!--                        :curPage="curPage"-->
        <!--                        :elDisplay="elDisplay"-->
        <!--                        @changePage="onChangePage"-->
        <!--                />-->
        <!--                <button @click="addFormOpen">-->
        <!--                    Add New Cost +-->
        <!--                </button>-->
        <!--            </main>-->
        <!--        </div>--->
    </v-container>
</template>

<script>

    import PaymentsDisplay from "@/components/PaymentDisplay.vue";
    import MyPagination from "@/components/MyPagination";
    import DashBoardStats from "@/components/DashBoardStats";
    import PieChart from "@/components/PieChart";

    //import ModalWindowAddPaymentForm from "@/components/ModalWindowAddPaymentForm";
    //import AddPayment from "@/components/AddPayment.vue";
    //import MyPagination from "@/components/MyPagination.vue";

    export default {
        name: "DashboardView",
        components: {
            MyPagination,
            DashBoardStats,
            PaymentsDisplay,
            PieChart
            //ModalWindowAddPaymentForm,
            //AddPayment,
            //MyPagination
        },
        data() {
            return {
                //addFormShow: false, //возможно теперь не нужен
                dialog: false,
                displayedElements: 3,
                curPage: 1,
                settings: {
                    content: 'AddPayment',
                    title: 'Add new Payment'

                },
                curElements: []
            };
        },
        computed: {
            getAllPages() {
                return this.$store.getters.getAllPages;
            },
            getFPV() {
                return this.$store.getters.getFullPaymentValue;
            },
            additionPaymentList() {
                return this.$store.getters.getAdditionPaymentList
            },
            additionCurrentElements() {
                return this.additionPaymentList.slice(
                    this.displayedElements * ((this.curPage - this.getAllPages) - 1),
                    this.displayedElements * ((this.curPage - this.getAllPages) - 1) + this.displayedElements
                );
            },
            getCurrentElements() {
                return this.$store.getters.getCurrentElements;
            },
            currentElements() {
                if (this.curPage <= this.getAllPages) {
                    return this.$store.getters.getCurrentElements;
                } else {
                    return this.additionCurrentElements;
                }
            },
            //Возвращает сумму всех покупок
            getValueOfAllPayments() {
                return this.$store.getters.getFullPaymentValue;
            }
        },
        watch: {
            '$router': function (newValue, oldValue) {
                console.log(newValue, oldValue);
            },
            // currentElements: function () {
            //     this.curElements = this.$store.getters.getCurrentElements;
            //     console.log(this.curElements)
            //     // console.log(oldVal)
            //     // console.log(newVal)
            //     console.log('Changed')
            // }
        },
        methods: {
            // updPage(data){
            //   this.curPage = data
            // },
            onChangePage(page) {
                this.curPage = page;
                if (page > this.getAllPages) {
                    return;
                } else {
                    this.$store.dispatch("fetchDataGit", page);
                }
            },
            //Вы зывает метод show из модуля и передает в него аргументы
            addFormOpen() {
                this.$modal.show('addpayment', this.settings);
            }
        },
        created() {
            this.$store.dispatch("fetchCategoryList");
            this.$store.dispatch("fetchDataGit", this.curPage);

        },
        // updated() {
        //     this.curElements = this.currentElements
        // },
        // beforeMount() {
        //     this.curElements = [1, 2, 3];
        // },
        async mounted() {
            await this.$store.dispatch('fetchDataGit');
            //this.curPage = Number(this.$route.params.page);
            // this.curElements = this.currentElements;
            // console.log('сейчас в карент элментс')
            // this.curElements = this.currentElements;
            // console.log(this.currentElements)
            // setTimeout(() => {
            //     this.curElements = this.currentElements;
            //     console.log('Прошло 5сек')
            // }, 100)
        }
    };
</script>

<style lang="scss" scoped>

</style>