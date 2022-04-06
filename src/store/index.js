import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        test: 5,
        paymentList: [],
        additionPaymentList: [],
        categoryList: [],
        currentElements: [],
        allpages: 6,  //Кол-во страниц загружено с сервера
        displayedItems: 3,
        dataCacheCoast: 0,
    },
    getters: {
        test: state => state.test,
        //getCurrentPayment: state => {},
        getAllPayments: state => (state.allpages * state.displayedItems) + state.additionPaymentList.length,
        getDisplayedItems: state => state.displayedItems, //Возвращает количество отображаемых платежей на одной странице
        getAmountIemsInPaymentList: state => state.allpages * state.displayedItems, //Общее количество платежей в кешированном списке paymentList
        //getAmountIemsInAdditionPaymentList: state => state.paymentList.length,
        getAllPages: state => state.allpages,
        getPaymentList: state => state.paymentList,
        getAdditionPaymentList: state => state.additionPaymentList,
        getCategoryList: state => state.categoryList,
        getFullPaymentValue: state => {
            return state.dataCacheCoast
                +
                state.additionPaymentList.reduce((res, cur) => res + Number(cur.value), 0)
        },
        getCurrentElements: state => state.currentElements,
        getMap: (state) => {
            const tempMap = new Map();
            state.paymentList.forEach(el => tempMap.set(el.id, el))
            state.additionPaymentList.forEach(el => tempMap.set(el.id, el))
            // console.log(tempMap)
            console.log(tempMap)
            return tempMap
        },
    },
    mutations: {
        // tyu(){
        //     // console.log(`TEST ${getters.test}`);
        //     // console.log(`GET ${this.getters.getMap.get(1)}`);
        //     // console.log(this.getters.getMap.get(1))
        //
        // },
        addAdditionPayment(state, data) {
            state.additionPaymentList.push(data);
        },
        editDataPayment(state, newData) {   //Сюда в дата приходит объект
            this.getters.getMap.get(newData.id).value = newData.value;
            this.getters.getMap.get(newData.id).category = newData.category;
            this.getters.getMap.get(newData.id).date = newData.date;
        //     // console.log(map)
        //     // console.log(item)
        //     //dataFromGetMap.get(data.id).set(data);
        //     //wer.set(data)
        //     // state
        //     // console.log(`data.id - ${data.id}`);
        //     // console.log(getters.getMap)
        //     //let qwe = getters.getMap
        //     // console.log(data)
        //     // qwe.set
        //     //console.log(`dsagdsagadsg ${qwe[3]}`)
        //     // if(data.id <= 18){
        //     //
        //     //     // let tmp = state.paymentList.filter(el => {
        //     //     //     return state.paymentList.has(el.id === data.id)
        //     //     // })
        //     //     console.log('Выполнилась мутация')
        //     //     console.log(data.id)
        //     // }
        //     // },
        //     // setPaymentListData(state, payload) {
        //     //   state.paymentList = payload
        //     // },
        //     // addDataPaymentsList(state, data) {
        //     //   state.paymentList.push(data)
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
        }
    },
    actions: {
        // editPayment({commit, getters}, data) {
        //     let wer = getters.getMap.get(data.id);
        //     console.log(`получено ${wer}`)
        //     commit('editDataPayment', wer, data)
        // },
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
            fetch('https://raw.githubusercontent.com/Feikkont/git_repo/master/vue-expenses/resolve.json')
                .then(response => response.json())
                .then(data => {
                    let total = 0;
                    for (let elem in data) {
                        data[elem].forEach(el => total += Number(el.value))
                    }
                    commit('getDataCacheCoast', total)
                    const tempDataArr = data[`page${page}`]
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
