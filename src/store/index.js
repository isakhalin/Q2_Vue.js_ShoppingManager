import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cachedList: [],     //Кеширующий массив. Тут целиком хранится массив из fetch.
        paymentList: [],
        additionPaymentList: [],
        categoryList: [],
        currentElements: [],
        allpages: 6,  //Кол-во страниц загружено с сервера
        displayedItems: 3,
        dataCacheCoast: 0,
    },
    getters: {
        getCachedList: state => state.cachedList,
        test: state => state.test,
        //getAllPayments: state => (state.allpages * state.displayedItems) + state.additionPaymentList.length,
        getLastPaymentId: state => {
            let lengthOfArr = state.cachedList.length; //18
            let idx = state.cachedList[lengthOfArr-1].id;
            return idx;
        },
        getDisplayedItems: state => state.displayedItems, //Возвращает количество отображаемых платежей на одной странице
        getAmountIemsInPaymentList: state => state.allpages * state.displayedItems, //Общее количество платежей в кешированном списке paymentList
        getAllPages: state => state.allpages,
        getPaymentList: state => state.paymentList,
        getAdditionPaymentList: state => state.additionPaymentList,
        getCategoryList: state => state.categoryList,
        // getFullPaymentValue: state => {
        //     return state.dataCacheCoast
        //         +
        //         state.additionPaymentList.reduce((res, cur) => res + Number(cur.value), 0)
        // },
        getFullPaymentValue: state => {
            return state.cachedList.reduce((res, cur) => res + Number(cur.value), 0)
        },
        getCurrentElements: state => state.currentElements,
        // getValueOfCategory: state => {
        //     return {
        //
        //     }
        // },
        getMap: (state) => {
            const tempMap = new Map();
            state.cachedList.forEach(el => tempMap.set(el.id, el))
            //state.additionPaymentList.forEach(el => tempMap.set(el.id, el))
            return tempMap
        },
    },
    mutations: {
        addAdditionPayment(state, data) {
            state.cachedList.push(data);
        },
        editDataPayment(state, newData) {   //Сюда в дата приходит объект
            console.log(newData)
            this.getters.getMap.get(newData.id).value = newData.value;
            this.getters.getMap.get(newData.id).category = newData.category;
            this.getters.getMap.get(newData.id).date = newData.date;
        },
        getDataCacheCoast(state, dataCache) {
            state.dataCacheCoast = dataCache
        },
        addCategoryList(state, categoryData) {
            state.categoryList = categoryData
        },
        setPaymentListDataGit(state, data) {
            state.paymentList.push(...data)
        },
        setCurrentElements(state, data) {
            state.currentElements = data
        },
        deleteCurrentPayment(state, data) {
            // //Функция возвращает индекс искомого объекта в заданном массиве.
            // //arr - принятый массив
            // //payment - Искомый объект
            // function findIdxInArray(arr, payment) {
            //     return arr.findIndex((el) => {
            //         return (payment.id === el.id)
            //     })
            // }

            state.cachedList.splice(state.cachedList.indexOf(this.getters.getMap.get(data.id)), 1)

            // if (data.id <= (state.allpages * state.displayedItems)) {
            //     state.paymentList.splice(state.paymentList.indexOf(this.getters.getMap.get(data.id)), 1)
            //     //console.log(this.getters.getMap.get(data.id))
            //     //console.log(state.paymentList.indexOf(data))
            //     //state.paymentList.splice(findIdxInArray(state.paymentList, data), 1)
            //     //state.currentElements.splice(findIdxInArray(state.currentElements, data), 1)
            // } else {
            //     state.additionPaymentList.splice(state.additionPaymentList.indexOf(this.getters.getMap.get(data.id)), 1)
            // }
            // state.currentElements.splice(findIdxInArray(state.currentElements, data), 1)
        },
        setCachedList(state, data) {
            state.cachedList = data
        }
    },
    actions: {
        fetchCategoryList({commit}) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(['Food', 'Sport', 'Education', 'Auto', 'Health', 'Family', 'Transport', 'Entertainment'])
                }, 1000)
            }).then(result => {
                commit('addCategoryList', result)
            })
        },
        fetchDataGit({commit, getters}, page) {
            fetch('https://raw.githubusercontent.com/isakhalin/API/main/Payment%20Manager/resolve.json')
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                    let total = 0;
                    let dataFromApi = [];
                    for (let elem in data) {
                        //console.log(elem)
                        data[elem].forEach(el => {
                            total += Number(el.value);
                            dataFromApi.push(el)
                        })
                    }
                    commit('setCachedList', dataFromApi)
                    commit('getDataCacheCoast', total)


                    const tempDataArr = data[`page${page}`]
                    // console.log('Ниже значение tempDataArr')
                    // console.log(tempDataArr)
                    const tempArr = tempDataArr.filter(elem => {
                        return getters.getMap.has(elem.id)
                    })
                    if (tempArr.length) {
                        commit('setCurrentElements', tempArr)
                    } else {
                        commit('setPaymentListDataGit', tempDataArr)
                        commit('setCurrentElements', tempDataArr)
                    }
                })
        }
    },
})
