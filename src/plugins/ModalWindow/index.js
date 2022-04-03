export default {
    install(Vue) {

        if (this.installed) {
            return
        }

        this.install = true

        Vue.prototype.$modal = {

            EventBus: new Vue(),

            show(name, settings) {
                this.EventBus.$emit('show', {name, ...settings})
                console.log('Show');
            },

            hide() {
                //console.log(`hide`)
                this.EventBus.$emit(`hide`)
                //console.log('Hide from module');
            },
        };
    }
}