<template>
    <div class="EditPayment">
        <!--        <button @click="showForm = !showForm" v-show="btnSaveShow">Add New Cost</button>-->

        <!--        <div v-show="showForm">-->
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
        <!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: "EditPaymentForm"
    }
</script>

<style scoped>

</style>