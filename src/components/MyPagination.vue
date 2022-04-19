<template>
    <!--    <div :class="[$style.wrp]">-->
    <!--        <div @click="onClick(curPage - 1)">-</div>-->
    <!--        <div-->
    <!--                v-for="i in amount"-->
    <!--                :key="i"-->
    <!--                @click="onClick(i)"-->
    <!--                :class="{ [$style.active]: curPage === i }"-->
    <!--        >-->
    <!--            {{ i }}-->
    <!--        </div>-->
    <!--        <div @click="onClick(curPage + 1)">+</div>-->
    <!--    </div>-->
        <div class="text-center">
            <v-pagination
                    v-model="page"
                    :length="amount"
                    prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"
            ></v-pagination>
        </div>
</template>

<script>
    export default {
        name: "MyPagination",
        props: {
            allPages: Number,
            cachedListLength: Number,
            //additionPaymentListLength: Number,
            displayedElements: Number,
            //curPage: Number,
            //page: 1
        },
        data() {
            return {
                page: 1
            }
        },
        computed: {
            amount() {
                // if (this.length <= 18) {
                //   return 6;
                // } else {
                //   return Math.ceil(this.length / this.elDisplay + 6 );
                // }
                //return Math.ceil(this.additionPaymentListLength / this.displayedElements + this.allPages)
                return Math.ceil(this.cachedListLength / this.displayedElements)
            },
            // getAllPages() {
            //     return this.$store.getters.getAllPages;
            // }
        },
        updated() {
          this.onClick()
        },
        methods: {
            onClick() {
                // if (page < 1 || page > this.amount) {
                //     return;
                // }
                // console.log("fsegs")
                // console.log(this.$store.getters.getMap  )
                this.$emit("changePage", this.page);
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