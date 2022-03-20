<template>
    <div class="list">
        <div class="item" v-for="item in list" :key="item.id">
            {{ item }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "PaymentDisplay",
        props: {
            list: []
        },
    }
</script>

<style scoped>

</style>