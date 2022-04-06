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
                        <button v-if="!modalShow" @click="editMenuOpen(item)">...</button>
                        <button v-else @click="modalShow = !modalShow">...</button>
                        <!--                        <component :is="ModalWindowEditMenu"/>-->
                    </div>
                </td>
            </tr>
        </table>
        <transition name="fade">
                <ModalWindowEditMenu class="editForm"
                                     v-if="modalShow"
                                     :settings="settings"
                                     :curItem="currentItem"/> <!--:valueAuto="" -->
        </transition>
    </div>
</template>

<script>
    export default {
        name: "PaymentsDisplay",
        components: {
            ModalWindowEditMenu: () => import(/* webpackChunkName: "ModalComp" */ './ModalWindowEditMenu.vue')
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
                    content: 'AddPayment', //Имя компонента, которое мы будем передавать
                    title: 'Edit Cost'      //Заголовок, который мы будем передавать
                },
                currentItem: {} //Значение id текущего выбранного платежа
            }
        },
        methods: {
            onShowEditMenu(incomingSettings) {
                this.modalShow = true;
                this.settings = incomingSettings;  //
            },
            onHideEditMenu() {
                this.modalShow = false;
                console.log('Отработал метод onHide2')
            },
            editMenuOpen(item) {
                //this.currentItemId = idOfSelectedItem;
                this.currentItem = item;
                //console.log(`Это текущий выбранный эл ${this.currentItem}`)
                this.$modalEditMenu.showEditMenu('editPayment', this.settings)
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

    .editForm {
        padding: 20px;
        /*position: absolute;*/
        /*top: 20px;*/
        background: #efefef;
    }
</style>