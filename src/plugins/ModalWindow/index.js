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

            hide(clickedHideFrom) {
                console.log(`hide${clickedHideFrom}`)
                this.EventBus.$emit(`hide${clickedHideFrom}`)
                console.log('Hide from module');
            },

            // hideEditMEnu() {
            //     this.EventBus.$emit('hideEditMenu')
            //     console.log('Hide2 from module');
            // }
        };
    }
}