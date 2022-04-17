<template>
    <div>
        Общая сумма всех покупок: {{ summ }}р.
    </div>
</template>

<script>
    export default {
        name: "DashBoardStats",
        props: {
            summ: {
                type: Number
            }
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>

</style>