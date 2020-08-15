Vue.component('list-component', {
    props: {
        tasks: Array,
        colour: String,
        mouseEvents: Array
    },
    template:
        `
        <div>
            <div v-for="(task, key) in tasks">
                <item-component
                    :task = "task"
                    :location = "key"
                    :colour = "colour"
                    :mouseEvents="mouseEvents"
                    :jobs="jobs"
                    @delete-task="deleteTask" 
                    @edit-task="editTask"
                    @move-todo-inprogress="moveTodoInProgress"
                    @move-inprogress-todo="moveInProgressToDo"
                    @move-inprogress-done="moveInProgressDone"
                    @move-done-inprogress="moveDoneInProgress"
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
        deleteTask: function (location) {
            this.$emit("delete-task", location);
        },
        editTask: function(location, value){
            this.$emit("edit-task", location, value);
        },
        moveTodoInProgress: function(location){
            this.$emit("move-todo-inprogress", location)
        },
        moveInProgressToDo: function (location){
            this.$emit("move-inprogress-todo", location)
        },
        moveInProgressDone: function(location){
            this.$emit("move-inprogress-done", location)
        },
        moveDoneInProgress: function(location){
            this.$emit("move-done-inprogress", location)
        },
        addJob: function(array, job){
            this.jobs.push({
                name: job,
                done: false
            })
        },
        deleteJob: function(key){
            this.jobs.splice(key, 1);
        }
    },
    computed: {

    },
});