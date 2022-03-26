<template>
    <div :class="[$style.wrp]">
        <div @click="onClick($store.state.curPage - 1)">-</div>
        <div :class="{[$style.active]: $store.state.curPage === i}" v-for="i in amount" :key="i" @click="onClick(i)">
            {{ i }}
        </div>
        <div @click="onClick($store.state.curPage + 1)">+</div>
    </div>
</template>

<script>
    export default {
        name: "MyPagination",
        props: {
            length: Number,
            n: Number
        },
        data() {
            return {}
        },
        computed: {
            amount() {
                return this.$store.state.allpages;
                //return Math.ceil(this.length / this.n); //Длинна всех элементов (50шт) деленная
            }                                             //на кол-во отображаемых эл-тов
        },
        methods: {
            onClick(page) {
                if (page < 1 || page > this.amount) {
                    return
                }
                this.$emit('changePage', page)
            }
        }
    }
</script>

<style module lang="scss">
    .wrp {
        display: flex;

        & > div {
            padding: 10px;

            &.active {
                background: #ccc;
            }
        }
    }

</style>