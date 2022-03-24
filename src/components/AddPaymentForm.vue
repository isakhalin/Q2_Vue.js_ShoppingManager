<template>
    <div>
        <input class="input" placeholder="Количество" v-model="value" type="number">
        <div class="categorylist" v-if="categoryList.length">
            <select v-model="category">
                <option v-for="(option, idx) in categoryList" :key="idx" :value="option">{{ option }}</option>
            </select>
        </div>
        <!--        <input class="input" placeholder="Тип покупки" v-model="category">-->
        <input class="input" placeholder="Дата" v-model="date">
        <button @click="addToList()">Save</button>
    </div>
</template>

<script>
    export default {
        name: "AddPaymentForm",
        data() {
            return {
                value: '',
                category: '',
                date: ''
            }
        },
        computed: {
            getCurrentDate() {
                const today = new Date();
                const d = today.getDate();
                let m = '';
                if ((today.getMonth() + 1) < 10) {
                    m = `0${today.getMonth() + 1}`;
                } else {
                    m = today.getMonth() + 1;
                }
                const y = today.getFullYear();
                return `${d}.${m}.${y}`
            },
            categoryList() {
                return this.$store.getters.getCategoryList
            }
        },
        methods: {
            addToList() {
                const data = {
                    value: this.value,
                    category: this.category,
                    date: this.date || this.getCurrentDate
                };
                this.$emit('addNewPayment', data);
            }
        },
        mounted() {
            if (!this.categoryList.length) {
                this.$store.dispatch('fetchCategoryList');
            }
        }
    }
</script>

<style scoped>
    .input {
        margin: 5px auto;
        display: block;
    }
</style>