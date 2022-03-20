<template>
    <div>
        <slot name="append" v-bind="{counter, helloFun}"/>
        <button @click="onClick"><slot>Clicked</slot>{{ counter }}</button>
    </div>
</template>

<script>
    export default {
        name: "MyButton",
        props: {
            msg: String,
            text: String
        },
        data(){
            return {
                counter: 0,
                cnt: 5
            }
        },
        methods: {
            helloFun(txt){
                return `im fun ${txt}`;
            },
            onClick(){
                this.counter++;
            },
            onMouseOver(){
                console.log('mouseover');
            }
        },
        beforeCreate() {
            console.log('beforeCreate')
        },
        created() {
            console.log('Created')
        },
        beforeMount() {
            console.log('before Mount')
        },
        mounted() {
            const btn = this.$el.querySelector('button');
            if (btn){
                btn.addEventListener('mouseover', this.onMouseOver);
            }
            console.log('mounted');
        },
        beforeUpdate() {
            console.log('Before Update')
        },
        updated() {
            console.log('Updated')
        },
        beforeDestroy() {
            console.log('before Destroy');
            const btn = this.$el.querySelector('button');
            btn.removeEventListener('mouseover', this.onMouseOver);
        },
        destroyed() {
            console.log('Destroyed');
        }
    }
</script>

<style scoped>

</style>