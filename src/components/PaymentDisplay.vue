<template>
    <table class="list">
        <tr class="item" v-for="item in list" :key="item.id">
<!--            <td><span class="item-el">#{{ list.indexOf(item) + 1 }}</span></td>-->
            <td><span class="item-el">{{ item.id }}</span></td>
            <td><span class="item-el">{{ item.date }}</span></td>
            <td><span class="item-el">{{ item.category }}</span></td>
            <td><span class="item-el">{{ item.value }}р.</span></td>
        </tr>
    </table>
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
        margin: 20px auto;
    }

    .item {
        /*margin: 30px 0 0 0;*/
    }

    .item-el {
        margin: 0 100px 0 0;
    }
</style>