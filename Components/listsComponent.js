Vue.component('lists-component', {
    props: {

    },
    template:
        `
        <div class="row">
            <div class="col-4">
                <h1 class="d-flex justify-content-center">To-Do</h1>
                <list-component 
                    :tasks="toDoTasks" 
                    colour="primary"
                    :mouseEvents="toDoMoveEvents"
                    @delete-task="deleteToDoTask" 
                    @edit-task="editToDoTasks"
                    @move-todo-inprogress="moveToDoToInProgress">
                </list-component>
            </div>
            <div class="col-4">
                <h1 class="d-flex justify-content-center">In Progress</h1>
                <list-component 
                    :tasks="inProgressTasks" 
                    colour="warning" 
                    :mouseEvents="inProgressMoveEvents"
                    @delete-task="deleteInProgressTask"  
                    @edit-task="editInProgressTask"
                    @move-inprogress-todo="moveInProgressToToDo"
                    @move-inprogress-done="moveInProgressToDone">
                </list-component>
            </div>
            <div class="col-4">
                <h1 class="d-flex justify-content-center">Done</h1>
                <list-component 
                    :tasks="doneTasks" 
                    colour="success" 
                    :mouseEvents="doneMoveEvents"
                    @delete-task="deleteDoneTasks"
                    @edit-task="editDoneTasks"
                    @move-done-inprogress="">
                </list-component>
            </div>
        </div>
    `,
    data() {
        return {
            toDoTasks: [],
            inProgressTasks: ["Hello"],
            doneTasks: [],
            toDoMoveEvents: [
                {
                    option: "Move to in progress",
                    event: "move-todo-inprogress"
                }],
            inProgressMoveEvents: [
                { 
                    option: "Move to to-do",
                    event: "move-inprogress-todo"
                }, 
                { 
                    option: "Move to done",
                    event: "move-inprogress-done"
                }],
            doneMoveEvents: [
                { 
                    option: "Move to in progress",
                    event: "move-done-inprogress"
                }]
        }
    },
    methods: {
        deleteToDoTask: function (location) {
            this.toDoTasks.splice(location, 1);
        },
        deleteInProgressTask: function (location) {
            this.inProgressTasks.splice(location, 1);
        },
        deleteDoneTasks: function (location) {
            this.doneTasks.splice(location, 1);
        },        editToDoTasks: function (location, value) {
            this.toDoTasks[location] = value;
        },

        editInProgressTask: function (location, value) {
            this.inProgressTasks[location] = value;
        },
        editDoneTasks: function (location, value) {
            this.doneTasks[location] = value;
        },

        moveToDoToInProgress:function(location){
            let moved = this.toDoTasks.splice(location, 1);
            this.inProgressTasks.push(moved[0]);
        },
        moveInProgressToToDo: function(location){
            let moved = this.inProgressTasks.splice(location, 1);
            this.toDoTasks.push(moved[0]);
        },
        moveInProgressToDone: function(location){
            let moved1 = this.inProgressTasks.splice(location, 1);
            this.doneTasks.push(moved1[0]);
        },
        moveDoneToInProgress: function(location){
            let moved = this.doneTasks.splice(location, 1);
            this.inProgressTasks.push(moved[0]);
        }
    },
    computed: {

    },
    mounted() {
        eventBus.$on('add-task', task => {
            this.toDoTasks.push(task)
        })
    }
});