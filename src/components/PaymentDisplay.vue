<template>
    <div class="list">
        <div class="item" v-for="item in list" :key="item.id">
            <span class="item-el">#{{ list.indexOf(item) + 1 }}</span>
            <span class="item-el">{{ item.date }}</span>
            <span class="item-el">{{ item.category }}</span>
            <span class="item-el">{{ item.value }}р.</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PaymentDisplay",
        props: {
            list: {
                type: Array,
                default: () => []
            }
        },
    }
</script>

<style scoped>
    .list {
        text-align: start;
        margin: 0 0 0 100px;
    }

    .item {
        margin: 10px 0 0 0;
    }

    .item-el {
        margin: 0 50px 0 0;
    }
</style>