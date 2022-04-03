export default {
    install(Vue) {

        if (this.installed) {
            return
        }

        this.install = true

        Vue.prototype.$modalEditMenu = {
            EventBus: new Vue(),
            showEditMenu(name, settings) {
                this.EventBus.$emit('showEditMenu', {name, ...settings})
                console.log('Show ModalEditMenu');
            },
            hideEditMenu() {
                this.EventBus.$emit('hideEditMenu')
                console.log('Hide ModalEditMenu');
            }
        };
    }
}