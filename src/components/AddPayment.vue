<template>
    <div>
        <button @click="showForm = !showForm" v-show="btnSaveShow">Add New Cost</button>
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
            valueQuickPay: Number,
            showFromQuick: String,
            categoryFromQuickPay: String,
            blocked: Boolean
        },
        data() {
            return {
                showForm: false,
                value: "",
                category: "",
                date: "",
                btnSaveShow: true
                //id: this.nextId + 1,
            };
        },
        watch: {
            valueQuickPay: function (newVal) {
                this.value = newVal;
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
        async mounted() {
            if (!this.categoryList.length) {
                await this.$store.dispatch("fetchCategoryList");
                this.category = this.categoryList[0];
            }
            if (this.showFromQuick) {
                this.showForm = true;
                this.date = this.getCurrentDate;
                this.btnSaveShow = this.blocked;
            }
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