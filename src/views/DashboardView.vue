<template>
    <div class="wrapper">
        <header>
            <p class="title">My personal coast</p>
            <div>My total {{ getFPV }}</div>
        </header>
        <main>
            <!--            <AddPayment-->
            <!--                    @addNewPayment="addData"-->
            <!--            />-->
<!--            <ModalWindowAddPaymentForm v-if="addFormShow" @close='addFormShow=false' :settings="settings" />-->
            <PaymentsDisplay :list="currentElements"/>
            <my-pagination
                    :allPages="getAllPages"
                    :testLength="additionPaymentList.length"
                    :curPage="curPage"
                    :elDisplay="elDisplay"
                    @changePage="onChangePage"
            />
            <button @click="addFormOpen">
                Add New Cost +
            </button>
        </main>
    </div>
</template>

<script>
    import MyPagination from "@/components/MyPagination.vue";
    import PaymentsDisplay from "@/components/PaymentDisplay.vue";
    //import ModalWindowAddPaymentForm from "@/components/ModalWindowAddPaymentForm";

    export default {
        name: "DashboardView",
        components: {
            //ModalWindowAddPaymentForm,
            PaymentsDisplay,
            MyPagination
        },
        data() {
            return {
                //addFormShow: false, //возможно теперь не нужен
                elDisplay: 3,
                curPage: 1,
                settings: {
                    content: 'AddPayment',
                    title: 'Add new Payment'

                }
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
                    this.elDisplay * ((this.curPage - this.getAllPages) - 1),
                    this.elDisplay * ((this.curPage - this.getAllPages) - 1) + this.elDisplay
                );
            },
            currentElements() {
                if (this.curPage <= this.getAllPages) {
                    return this.$store.getters.getCurrentElements;
                } else {
                    return this.additionCurrentElements;
                }
            },
        },
        watch: {
            '$router': function (newValue, oldValue) {
                console.log(newValue, oldValue);
            }
        },
        methods: {
            onChangePage(page) {
                this.curPage = page;
                if (page > this.getAllPages) {
                    return;
                } else {
                    this.$store.dispatch("fetchDataGit", page);
                }
            },
            //Вы зывает метод show из модуля и передает в него аргументы
            addFormOpen(){
                this.$modal.show('addpayment', this.settings);
            }
        },
        created() {
            this.$store.dispatch("fetchCategoryList");
            this.$store.dispatch("fetchDataGit", this.curPage);
        },
        async mounted() {
            await this.$store.dispatch('fetchDataGit');
            //this.curPage = Number(this.$route.params.page);
        }
    };
</script>

<style lang="scss" scoped>

</style>