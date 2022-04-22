<template>
    <v-container>
        <v-data-table
                :headers="headers"
                :items="list"
                sort-by=""
                class="elevation-1"
                :hideDefaultFooter=false
                :footer-props="{itemsPerPageOptions: [3, 5, 10, 15, 50]}"
                :items-per-page="3"
                @update:items-per-page="currentItemsPerPage"
                :page.sync="pageToTable"
        >
            <template v-slot:top>
                <v-toolbar
                        flat
                >
                    <v-toolbar-title>Список покупок</v-toolbar-title>

                    <v-divider
                            class="mx-4"
                            color=""
                            inset
                            vertical
                    ></v-divider>

                    <v-spacer></v-spacer>
                    <v-dialog
                            v-model="dialog"
                            max-width="500px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                            >
                                Добавить платеж
                            </v-btn>
                        </template>
                        <v-card>
                            <!--                            Модельное окно-->
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model="editedItem.date"
                                                    label="Дата"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                                @click="setCategory('category')"
                                        >
                                            <v-select
                                                    v-model="editedItem.category"
                                                    :items="categoryList"
                                                    label="Категория"
                                                    :disabled="isEnabledNewCategoryInput"
                                            ></v-select>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model.number="editedItem.value"
                                                    label="Стоимость"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                                @click="setCategory('newCategory')"
                                        >
                                            <v-text-field
                                                    v-model="newCategory"
                                                    label="Новая категория"
                                                    :disabled="!isEnabledNewCategoryInput"
                                            ></v-text-field>
                                        </v-col>
                                        <!--                                        <v-col>-->
                                        <!--                                            <v-checkbox-->
                                        <!--                                                    v-model="isEnabledNewCategoryInput"-->
                                        <!--                                                    :label="`Создать новую категорию`"-->
                                        <!--                                            ></v-checkbox>-->
                                        <!--                                        </v-col>-->
                                        <!--                                        <v-btn-->
                                        <!--                                                cols="12"-->
                                        <!--                                                sm="6"-->
                                        <!--                                                md="12"-->
                                        <!--                                        >Clear-->
                                        <!--                                        </v-btn>-->
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="close"
                                >
                                    Отмена
                                </v-btn>
                                <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="save"
                                >
                                    Сохранить
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Подтвердите удаление платежа</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Отменить</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">Удалить</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn
                        color="primary"
                        @click="initialize"
                >
                    Reset
                </v-btn>
            </template>
        </v-data-table>

        <div>
            <!--        <v-container>-->
            <!--        <v-row>-->
            <!--            <v-col :cols="2">#</v-col>-->
            <!--            <v-col :cols="3">date</v-col>-->
            <!--            <v-col :cols="3">category</v-col>-->
            <!--            <v-col :cols="3">value</v-col>-->
            <!--            <v-col :cols="1"></v-col>-->
            <!--        </v-row>-->
            <!--        <v-row v-for="item in list" :key="item.id">-->
            <!--            <v-col :cols="2">{{ item.id }}</v-col>-->
            <!--            <v-col :cols="3">{{ item.date }}</v-col>-->
            <!--            <v-col :cols="3">{{ item.category }}</v-col>-->
            <!--            <v-col :cols="3">{{ item.value }}</v-col>-->
            <!--            <v-col :cols="1">-->
            <!--                <div class="editformwrapper">-->
            <!--                    <button v-if="!modalShow" @click="editMenuOpen(item)">...</button>-->
            <!--                    <button v-else @click="modalShow = !modalShow">...</button>-->
            <!--                    &lt;!&ndash;                        <component :is="ModalWindowEditMenu"/>&ndash;&gt;-->
            <!--                </div>-->
            <!--            </v-col>-->
            <!--        </v-row>-->
            <!--        <div class="list">-->
            <!-- <div class="item" v-for="item in list" :key="item.id">
              {{ item }}
            </div> -->
            <!--            <table class="paymentTable">-->
            <!--                <tr>-->
            <!--                    <th>#</th>-->
            <!--                    <th>-->
            <!--                        date-->
            <!--                    </th>-->
            <!--                    <th>-->
            <!--                        category-->
            <!--                    </th>-->
            <!--                    <th>-->
            <!--                        value-->
            <!--                    </th>-->
            <!--                </tr>-->
            <!--            <tr class="item" v-for="item in list" :key="item.id " :paymetnCounter="item.id">-->
            <!--                <tr class="item" v-for="item in list" :key="item.id ">-->

            <!--                    <td>{{ item.id }}</td>-->
            <!--                    <td>{{ item.date }}</td>-->
            <!--                    <td>{{ item.category }}</td>-->
            <!--                    <td>{{ item.value }}</td>-->
            <!--                    <td>-->
            <!--                        <div class="editformwrapper">-->
            <!--                            <button v-if="!modalShow" @click="editMenuOpen(item)">...</button>-->
            <!--                            <button v-else @click="modalShow = !modalShow">...</button>-->
            <!--                            &lt;!&ndash;                        <component :is="ModalWindowEditMenu"/>&ndash;&gt;-->
            <!--                        </div>-->
            <!--                    </td>-->
            <!--                </tr>-->
            <!--            </table>-->
            <!--            <transition name="fade">-->
            <!--                <ModalWindowEditMenu class="editForm"-->
            <!--                                     v-if="modalShow"-->
            <!--                                     :settings="settings"-->
            <!--                                     :curItem="currentItem"/> &lt;!&ndash;:valueAuto="" &ndash;&gt;-->
            <!--            </transition>-->
            <!--        </div>-->
            <!--    </v-container>-->
        </div> <!-- Старый код -->
    </v-container>
</template>

<script>

    export default {
        props: {
            list: {
                type: Array,
                default: () => []
            },
            page: {
                type: Number,
                default: () => {
                }
            }
        },
        data: () => ({
            isEnabledNewCategoryInput: false,
            newCategory: '',
            pageToTable: '',
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: '#',
                    align: 'start',
                    sortable: true,
                    value: 'id'
                },
                {text: 'Date', value: 'date'},
                {text: 'Category', value: 'category'},
                {text: 'Value', value: 'value'},
                {text: 'Actions', value: 'actions', sortable: false},
            ],
            //desserts: [],
            editedIndex: -1,
            editedItem: {
                id: '',
                date: '',
                category: '',
                value: ''
            },
            defaultItem: {
                id: '',
                date: '',
                category: '',
                value: ''
            },
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Новый платеж' : 'Изменение платежа'
            },
            //Свой метод. Получение списка категорий из сторы
            categoryList() {
                return this.$store.getters.getCategoryList;
            },
            getAllPayments() {
                return this.$store.getters.getAllPayments; //Получаем общее количество покупок
            },
            getCurrentDate() {
                const today = new Date();
                const day = today.getDate();
                const month = today.getMonth() + 1;
                const year = today.getFullYear();
                return `${day}.${month}.${year}`;
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
            dialogDelete(val) {
                val || this.closeDelete()
            },
            page: function (newVal) {
                this.pageToTable = newVal
            }
        },

        created() {
            this.pageToTable = this.page;
            //this.initialize();
        },
        updated() {
            this.$emit('pageFromTable', this.pageToTable)
        },

        methods: {
            initialize() {
                this.desserts = [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                    },
                ]
            },
            // onfocus() {
            //     this.wwe = true
            // },
            setCategory(currentInput) {
                console.log(event.target.querySelector('#input-65'))
                event.target.querySelector('#input-65').focus()
                if (currentInput == 'newCategory') {
                    this.isEnabledNewCategoryInput = true
                } else {
                    this.isEnabledNewCategoryInput = false
                }
                //this.isEnabledNewCategoryInput = !this.isEnabledNewCategoryInput
            },
            editItem(item) {
                this.editedIndex = this.list.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                this.editedIndex = this.list.indexOf(item)
                this.editedItem = Object.assign({}, item) //Метод assign используется для копирования значений всех собственных перечисляемых свойств из одного или более исходных объектов в целевой объект. После копирования он возвращает целевой объект.
                this.dialogDelete = true
            },

            deleteItemConfirm() {
                //this.desserts.splice(this.editedIndex, 1)
                //
                this.$store.commit('deleteCurrentPayment', this.editedItem)
                this.closeDelete()
            },

            close() {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            closeDelete() {
                this.dialogDelete = false
                this.$nextTick(() => {

                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
            save() {
                if (this.editedIndex > -1) {
                    //Object.assign(this.desserts[this.editedIndex], this.editedItem)
                    this.$store.commit('editDataPayment', this.editedItem)
                    this.close()
                } else {
                    //this.desserts.push(this.editedItem)
                    if (this.editedItem.value && (this.editedItem.category || this.newCategory)) {
                        let newObj = Object.assign(this.editedItem, {
                            id: this.$store.getters.getLastPaymentId + 1,
                            date: this.editedItem.date || this.getCurrentDate
                        });
                        if (this.isEnabledNewCategoryInput) {
                            newObj.category = this.newCategory;
                        }
                        this.$store.commit('addAdditionCategory', this.newCategory);
                        //console.log(newObj)
                        this.$store.commit('addAdditionPayment', newObj)
                        this.close()
                    }
                }
            },
            currentItemsPerPage(perPage) {
                this.$emit('changeItemsPerPage', perPage)
            }
        }
    }

    // export default {
    //     name: "PaymentsDisplay",
    //     components: {
    //         //ModalWindowEditMenu: () => import(/* webpackChunkName: "ModalComp" */ './ModalWindowEditMenu.vue')
    //         //ModalWindowAddPaymentForm: () => import(/* webpackChunkName: "ModalComp" */ './ModalWindowAddPaymentForm.vue')
    //     },
    //     props: {
    //         list: {
    //             type: Array,
    //             default: () => [],
    //         },
    //     },
    //     data() {
    //         return {
    //             modalShow: false,
    //             settings: {
    //                 content: 'AddPayment', //Имя компонента, которое мы будем передавать
    //                 title: 'Edit Cost'      //Заголовок, который мы будем передавать
    //             },
    //             currentItem: {} //Значение id текущего выбранного платежа
    //         }
    //     },
    //     methods: {
    //         onShowEditMenu(incomingSettings) {
    //             this.modalShow = true;
    //             this.settings = incomingSettings;  //
    //         },
    //         onHideEditMenu() {
    //             this.modalShow = false;
    //             console.log('Отработал метод onHide2')
    //         },
    //         editMenuOpen(item) {
    //             //this.currentItemId = idOfSelectedItem;
    //             this.currentItem = item;
    //             //console.log(`Это текущий выбранный эл ${this.currentItem}`)
    //             this.$modalEditMenu.showEditMenu('editPayment', this.settings)
    //         }
    //     },
    //     mounted() {
    //         this.$modalEditMenu.EventBus.$on('showEditMenu', this.onShowEditMenu);
    //         this.$modalEditMenu.EventBus.$on('hideEditMenu', this.onHideEditMenu);
    //     },
    //     beforeDestroy() {
    //         this.$modalEditMenu.EventBus.$off('showEditMenu', this.onShowEditMenu);
    //         this.$modalEditMenu.EventBus.$off('hideEditMenu', this.onHideEditMenu);
    //     }
    // };
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


