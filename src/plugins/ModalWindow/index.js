export default {
    install(Vue) {

        if (this.installed) {
            return
        }

        this.install = true

        Vue.prototype.$modal = {
            show() {
                console.log('Show');
            },

            hide() {
                console.log('Hide');
            }
        };
    }
}