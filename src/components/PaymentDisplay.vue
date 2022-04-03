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
                    <div class="editformwrapper">
                        <button @click="editMenuOpen">...</button>
                        <ModalEditMenu class="editForm" v-if="modalShow" :settings="settings"/>
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
            ModalEditMenu: () => import(/* webpackChunkName: "ModalComp" */ './ModalWindowEditMenu.vue')
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
                modalShow: false,
                settings: {
                    content: 'Edit Cost',
                    title: 'Edit Cost'
                }
            }
        },
        methods: {
            onShowEditMenu(incomingSettings) {
                this.modalShow = true;
                this.settings = incomingSettings;
            },
            onHideEditMenu() {
                this.modalShow = false;
                console.log('Отработал метод onHide2')
            },
            editMenuOpen() {
                this.$modalEditMenu.showEditMenu('editmenu', this.settings)
            }
        },
        mounted() {
            this.$modalEditMenu.EventBus.$on('showEditMenu', this.onShowEditMenu);
            this.$modalEditMenu.EventBus.$on('hideEditMenu', this.onHideEditMenu);
        },
        beforeDestroy() {
            this.$modalEditMenu.EventBus.$off('showEditMenu', this.onShowEditMenu);
            this.$modalEditMenu.EventBus.$off('hideEditMenu', this.onHideEditMenu);
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

    .editformwrapper {
        position: relative;
    }
</style>