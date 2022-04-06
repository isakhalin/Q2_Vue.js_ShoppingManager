<template>
    <div :class="[$style.wrp]">
        <div @click="onClick(curPage - 1)">-</div>
        <div
                v-for="i in amount"
                :key="i"
                @click="onClick(i)"
                :class="{ [$style.active]: curPage === i }"
        >
            {{ i }}
        </div>
        <div @click="onClick(curPage + 1)">+</div>
    </div>
</template>

<script>
    export default {
        name: "MyPagination",
        props: {
            allPages: Number,
            testLength: Number,
            elDisplay: Number,
            curPage: Number,
        },
        computed: {
            amount() {
                // if (this.length <= 18) {
                //   return 6;
                // } else {
                //   return Math.ceil(this.length / this.elDisplay + 6 );
                // }
                return Math.ceil(this.testLength / this.elDisplay + this.allPages)
            },
            getAllPages() {
                return this.$store.getters.getAllPages;
            }
        },
        methods: {
            onClick(page) {
                if (page < 1 || page > this.amount) {
                    return;
                }
                this.$emit("changePage", page);
            },
        },
    };
</script>

<style module lang="scss">
    .wrp {
        display: flex;
        justify-content: center;

        & > div {
            padding: 10px;

            &.active {
                background: #ccc;
            }
        }
    }
</style>