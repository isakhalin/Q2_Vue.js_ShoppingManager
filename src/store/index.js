import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {    //state это аналог data, как в компоненте
        paymentList: [],   //Инициализация массива
        categoryList: []
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
        },
        addDataPayment(state, payload) {
            Vue.set(state.paymentList, 2, payload); // Обновлять стейт нужно так, чтобы сохранялась реактивность
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
        fetchData({commit}) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const items = [];
                    for (let i = 1; i <= 50; i++) {
                        items.push({
                            date: "23.12.2020",
                            category: "Sport",
                            value: i,
                            id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
                        });
                    }
                    resolve(items)
                }, 2000);
            }).then(res => {
                commit('setPaymentListData', res)
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
                    resolve(['Food', 'Sport', 'Education', 'Auto', 'Health'])
                }, 1000);
            }).then(res => {
                commit('addCategoryList', res);
            });

            //console.log(context);
        }
    },
    modules: {}
})
