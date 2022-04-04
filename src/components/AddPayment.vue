<template>
    <div class="AddPayment">
        <button @click="showForm = !showForm" v-show="btnAddcostShow">Add New Cost</button>
        <div v-show="showForm">
            <input placeholder="Value" v-model.lazy="value"/>
            <div class="categoryList" v-if="categoryList">
                <select v-model="category">
                    <option v-for="(option, idx) in categoryList" :key="idx + 1">
                        {{ option }}
                    </option>
                </select>
            </div>
            <!-- <input placeholder="Category" v-model="category" /> -->
            <input placeholder="Enter date" v-model.lazy="date"/>
            <button class="save" v-show="btnSaveShow" @click="onSave">Save!</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddPayment",
        props: {
            //nextId: Number,
            autoShowInputForm: String, //Пропс отвечает за авто отображение инпутов формы на старте
            valueAuto: Number,  //Пропс отвечает за автозаполнение поля в инпуте стоимости
            callFromQuick: String,  //Пропс указывает откуда вызван компонент
            showBtnSave: String, //Если true, то блокирует кнопку Save
            showBtnAddcost: String, //Если true, то блокирует кнопку Add Cost
            categoryFromQuickPay: String,
            blocked: Boolean,
            itemid: Number
        },
        data() {
            return {
                showForm: false,
                value: "",
                category: "",
                date: "",
                btnSaveShow: true,
                btnAddcostShow: true,
                //id: this.nextId + 1,
            };
        },
        watch: {
            // showBtnSave: function (newValue) {
            //     this.btnSaveShow = newValue;
            // },
            // showBtnAddcost: function (newValue) {
            //     this.btnAddcostShow = newValue;
            // },
            //deep: true,
            valueAuto: function (newValue) {
                this.value = newValue;
            },
            idOfItem: function (newValue) { //getAllPages * 3
                // console.log(`dsdsds ${this.$store.getters.getPaymentList.length}`)
                if (newValue <= this.$store.getters.getAmountIemsInPaymentList) {
                    return 'Ищем в кешированном списке'
                }

                let generalArray = ''
                console.log(generalArray);
                console.log(newValue);
                //this.value = newValue;
            },
            categoryFromQuickPay: function (newValue) {
                this.category = newValue;
            },
            // blocked: function (newVal) {
            //     this.btnSaveShow = newVal;
            // }
        },
        computed: {
            getAllPayments() {
                return this.$store.getters.getAllPayments; //Получаем общее количество покупок
            },
            getCurrentDate() {
                const today = new Date();
                const day = today.getDate();
                const month = today.getMonth() + 1;
                const year = today.getFullYear();

                return `${day}.${month}.${year}`;
            },
            categoryList() {
                return this.$store.getters.getCategoryList;
            },
        },
        methods: {
            onSave() {
                if (this.value && this.category) {
                    const data = {
                        value: this.value,
                        category: this.category,
                        date: this.date || this.getCurrentDate,
                        id: this.getAllPayments + 1,
                    };
                    this.addData(data);
                    //his.$emit("addNewPayment", data);
                }
            },
            addData(data) {
                this.$store.commit('addAdditionPayment', data)
            }
        },
        beforeMount() {

        },
        async mounted() {
            if (!this.categoryList.length) {
                await this.$store.dispatch("fetchCategoryList");
                this.category = this.categoryList[0];
            }
            if (this.callFromQuick) {
                this.date = this.getCurrentDate;
                //this.btnSaveShow = this.blocked;
                this.showForm = true;
            }
            // if(this.autoShowInputForm){
            //     this.showForm = this.autoShowInputForm;
            // }
            if (this.showBtnSave !== undefined) {
                this.btnSaveShow = this.showBtnSave;
            }
            if(this.showBtnAddcost !== undefined){
                this.btnAddcostShow = this.showBtnAddcost;
            }
            if(this.autoShowInputForm !== undefined){
                this.showForm = this.autoShowInputForm;
            }
            // this.btnSaveShow = this.showBtnSave;
            // this.btnAddcostShow = this.showBtnAddcost;
        },
        updated() {
            if (this.value && this.category && this.date) {
                this.onSave();
            }
        }
    };
</script>

<style>
</style>