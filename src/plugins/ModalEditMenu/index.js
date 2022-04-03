// export default {
//     install(Vue) {
//
//         if (this.installed) {
//             return
//         }
//
//         this.install = true
//
//         // Vue.prototype.$modal = {
//         //
//         //     EventBus: new Vue(),
//         //
//         //     show(name, settings) {
//         //         this.EventBus.$emit('show', {name, ...settings})
//         //         console.log('Show');
//         //     },
//         //
//         //     hide() {
//         //         this.EventBus.$emit('hide')
//         //         console.log('Hide');
//         //     }
//         // };
//
//         Vue.prototype.$modalEditMenu = {
//             EventBus: new Vue(),
//             show(name, settings) {
//                 this.EventBus.$emit('show', {name, ...settings})
//                 console.log('Show ModalEditMenu');
//             },
//             hide() {
//                 this.EventBus.$emit('hide')
//                 console.log('Hide ModalEditMenu');
//             }
//         };
//     }
// }