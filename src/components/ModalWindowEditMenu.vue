<template>
    <div class="wrapper">
        <button class="buttons" @click="onShowEditForm">Редактировать</button>
        <button class="buttons">Удалить</button>
        <!--        <button class="buttons" @click="closeEditMenu">Закрыть</button>-->

        <component :is="settings.content"
                   v-if="showEditForm"
                   :curItem="curItem"
                   :autoShowInputForm="true"
                   :showBtnAddcost="false"/>
        <!--        :showBtnSave="false" -->
    </div>
</template>

<script>
    export default {
        name: "ModalWindowEditMenu",
        components: {
            AddPayment: () => import('@/components/AddPayment.vue')
        },
        props: {
            settings: Object,
            curItem: Object //Значение id текущего выбранного платежа
        },
        data() {
            return {
                showEditForm: false,
                // itemi: ''
            }
        },
        // watch: {
        //     idOfItem: function (newValue) {
        //         this.itemi = newValue
        //     }
        // },
        methods: {
            closeEditMenu() {
                this.$modalEditMenu.hideEditMenu()
            },
            onShowEditForm() {
                console.log('showEditForm = true')
                this.showEditForm = true;
            }
        }
    }
</script>

<style scoped>
    /*.buttons {*/
    /*    display: block;*/
    /*}*/
</style>