Vue.component('list-component', {
    props: {
        tasks: Array,
        colour: String
    },
    template:
        `
        <div>
            <div v-for="(task, key) in tasks">
                <item-component
                    :task = "task"
                    :colour = "colour"
                    :jobs="jobs"
                    @delete-task="deleteTask" 
                    @edit-task="editTask"
                    @move-task="moveTask"
                    @add-job="addJob"
                    @del-job="deleteJob">
                </item-component>
                <br></br>
            </div>
        </div>
    `,
    data() {
        return {
            jobs:[
                {
                    name: "code",
                    done: true
                },
                {
                    name: "code2",
                    done: false
                }
            ]
        }
    },
    methods: {
        deleteTask: function (id) {
            this.$emit("delete-task", id);
        },
        editTask: function(id, value){
            this.$emit("edit-task", id, value);
        },
        addJob: function(array, job){
            this.jobs.push({
                name: job,
                done: false
            })
        },
        deleteJob: function(key){
            this.jobs.splice(key, 1);
        },
        moveTask: function(id, status){
            this.$emit("move-task", id, status);
        }
    },
    computed: {

    },
});