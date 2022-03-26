import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {    //state это аналог data, как в компоненте
        paymentList: [],   //Инициализация массива
        //curPaymentList: [],
        categoryList: [],
        allpages: 0,
        curPage: 1
    },
    getters: {
        getPaymentsList: state => state.paymentList,
        getFullPaymentValue: state => {
            return state.paymentList.reduce((res, cur) => res + +cur.value, 0) //Метод reduce суммирует элементы в массиве
            //res это результирующее значение (сумма предыдущих значение)
            //cur это текущий элемент
            //0 это значение для res по умолчанию, если res пустой.
        },
        getCategoryList: state => {
            return state.categoryList
        }
    },
    mutations: {
        setPaymentListData(state, payload) { //payload это значние, которое принимается на вход
            //state это обращение к текущему state
            state.paymentList = payload;
            //console.log(state.paymentList)
            console.log(state.paymentList);
        },
        // addPaymentListData(state, payload){
        //     console.log(`Это добавление элементов в PaymentList`);
        //     Vue.set(state.paymentList, 2, payload);
        // },
        setAllPgs(state, pg){
            state.allpages = pg;
            console.log(state.allpages);
        },
        addDataPayment(state, payload) {
            Vue.set(state.paymentList, 3, payload); // Обновлять стейт нужно так, чтобы сохранялась реактивность
            // где state.paymentList свойство стейта, которое изменяем
            // 2 это индекс элемента в массиве paymentList, который мы перезаписываем
            // payload это вставляемое значение, которое принимается на вход.
            state.paymentList.push(payload);
        },
        addCategoryList(state, categoryLoad) {
            state.categoryList = categoryLoad;
        }
    },
    actions: {
        //Изначальный вариант
        // fetchData({commit}) {
        //     return new Promise((resolve) => {
        //         setTimeout(() => {
        //             const items = [];
        //             for (let i = 1; i <= 50; i++) {
        //                 items.push({
        //                     date: "23.12.2020",
        //                     category: "Sport",
        //                     value: i,
        //                     id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
        //                 });
        //             }
        //             resolve(items)
        //         }, 2000);
        //     }).then(res => {
        //         commit('setPaymentListData', res)
        //     });
        // },
        fetchData({commit, state}) {
            return new Promise((resolve) => {
                //const key = `page${this.state.curPage}`;
                const key = `page${state.curPage}`; //page1
                //console.log('Это кей');
                //console.log(key);
                const items = {
                    "allpages": 4,
                    "page1": [
                        {"id": 1, "date": "20.03.2020", "category": "Food", "value": 169},
                        {"id": 2, "date": "21.03.2020", "category": "Navigation", "value": 50},
                        {"id": 3, "date": "22.03.2020", "category": "Sport", "value": 450}
                    ],
                    "page2": [
                        {"id": 4, "date": "23.03.2020", "category": "Entertaiment", "value": 969},
                        {"id": 5, "date": "24.03.2020", "category": "Education", "value": 1500},
                        {"id": 6, "date": "25.03.2020", "category": "Health", "value": 200}
                    ],
                    "page3": [
                        {"id": 7, "date": "26.03.2020", "category": "Navigation", "value": 469},
                        {"id": 8, "date": "27.03.2020", "category": "Sport", "value": 1100},
                        {"id": 9, "date": "28.03.2020", "category": "Fruit", "value": 800}
                    ],
                    "page4": [
                        {"id": 10, "date": "29.03.2020", "category": "Auto", "value": 369},
                        {"id": 11, "date": "30.03.2020", "category": "Health", "value": 1480},
                        {"id": 12, "date": "31.03.2020", "category": "Food", "value": 900}
                    ]
                };
                //console.log('Это данные из пэйдж1');
                //console.log(items[key])
                resolve({items: items[key], pg: items.allpages})
            }).then(res => {
                //console.log(`Это итемс в then`)
                //console.log(res);
                const [as, pg] = [[...res.items], res.pg]
                commit('setPaymentListData', as);
                commit('setAllPgs', pg);



            });
        },
        // transformData({commit}, payload){
        //     const res = someTransform(payload){
        //         //.......JS Code
        //     }
        //     commit('setPaymentListData', res.paymentList);
        //     commit('setCategoryListData', res.category);
        // },
        fetchCategoryList({commit}) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(['Food', 'Sport', 'Education', 'Auto', 'Health', 'Fruit'])
                }, 1000);
            }).then(res => {
                commit('addCategoryList', res);
            });
        }
    },
    modules: {}
})
