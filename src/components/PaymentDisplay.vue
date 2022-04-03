<template>
    <div class="list">
        <!-- <div class="item" v-for="item in list" :key="item.id">
          {{ item }}
        </div> -->
        <table class="paymentTable">
            <tr>
                <th>#</th>
                <th>
                    date
                </th>
                <th>
                    category
                </th>
                <th>
                    value
                </th>
            </tr>
            <!--            <tr class="item" v-for="item in list" :key="item.id " :paymetnCounter="item.id">-->
            <tr class="item" v-for="item in list" :key="item.id ">

                <td>{{ item.id }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.value }}</td>
                <td>
                    <div class="cont">
                        <button @click="editFormOpen">...</button>
                        <ModalEditMenu class="editForm" v-if="modalShow" whereIam="PaymentsDisplay" :settings="settings"/>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "PaymentsDisplay",
        components: {
            ModalEditMenu: () => import(/* webpackChunkName: "ModalComp" */ './ModalWindowAddPaymentForm.vue')
            //ModalWindowAddPaymentForm: () => import(/* webpackChunkName: "ModalComp" */ './ModalWindowAddPaymentForm.vue')
        },
        props: {
            list: {
                type: Array,
                default: () => [],
            },
        },
        data() {
            return {
                modalShow: true,
                settings: {
                    content: 'AddPayment',
                    title: 'Add new Payment'
                }
            }
        },
        methods: {
            onHide2() {
                this.modalShow = false;
                console.log('Отработал метод onHide2')
            },
            editFormOpen(){
                this.$modal.show('editmenu', this.settings)
            }
        },
        mounted() {
            this.$modal.EventBus.$on('show', this.onShow);
            this.$modal.EventBus.$on('hidePaymentsDisplay', this.onHide2);
        },
        beforeDestroy() {
            this.$modal.EventBus.$off('show', this.onShow);
            this.$modal.EventBus.$off('hide', this.onHide);
        }
    };
</script>

<style>
    .paymentTable {
        margin: 0 auto;
    }

    th {
        padding: 10px;
    }

    td {
        padding: 5px 7px;
    }

    .cont {
        position: relative;
    }
</style>