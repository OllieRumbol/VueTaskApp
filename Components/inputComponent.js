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
    data() {
        return {
            task: ""
        }
    },
    methods: {
        submitTask: function () {
            fetch('https://localhost:44336/api/tasks', {
                method: "POST",
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    task: this.task
                })
            })
            .then(response => response.json())
            .then(data => {
                eventBus.$emit("add-task", data);
            });

            this.task = "";
        },
        clearInput: function () {
            this.task = "";
        }
    },
    computed: {

    },
});