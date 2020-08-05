Vue.component('input-component', {
    props: {

    },
    template:
    `
        <div>
            <input v-model="task" class="form-control" type="text">
            <br></br>
            <button class="btn btn-primary" v-on:click="submitTask">Add</button>
            <button class="btn btn-danger" v-on:click="clearInput">Clear</button>
        </div>
    `,
    data(){
        return{
            task: ""
        }
    },
    methods: {
        submitTask: function(){
            eventBus.$emit("add-task", this.task);
            this.task = "";
        },
        clearInput: function(){
            this.task = "";
        }
    },
    computed: {
        
    },
});