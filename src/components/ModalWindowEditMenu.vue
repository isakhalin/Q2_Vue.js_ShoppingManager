<template>
    <div class="wrapper">
        <button class="buttons">Редактировать</button>
        <button class="buttons">Удалить</button>
        <button class="buttons" @click="closeEditMenu">Закрыть</button>
    </div>
</template>

<script>
    export default {
        name: "ModalWindowEditMenu",
        methods: {
            closeEditMenu() {
                this.$modalEditMenu.hideEditMenu()
            }
        }
    }
</script>

<style scoped>
    .buttons {
        display: block;
    }
</style>