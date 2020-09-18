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
                    @delete-task="deleteTask" 
                    @edit-task="renameTask"
                    @move-task="moveTask"
                    @add-job="addJob">
                </list-component>
            </div>
            <div class="col-4">
                <h1 class="d-flex justify-content-center">In Progress</h1>
                <list-component 
                    :tasks="inProgressTasks" 
                    colour="warning" 
                    @delete-task="deleteTask"
                    @edit-task="renameTask"
                    @move-task="moveTask">
                </list-component>
            </div>
            <div class="col-4">
                <h1 class="d-flex justify-content-center">Done</h1>
                <list-component 
                    :tasks="doneTasks" 
                    colour="success" 
                    @delete-task="deleteTask"
                    @edit-task="renameTask"
                    @move-task="moveTask">
                </list-component>
            </div>
        </div>
    `,
    data() {
        return {
            toDoTasks: [],
            inProgressTasks: [],
            doneTasks: [],
        }
    },
    methods: {
        //New
        filterTasks: function(data){
            this.toDoTasks = data.filter(task => task.status == 0);
            this.inProgressTasks = data.filter(task => task.status == 1);
            this.doneTasks = data.filter(task => task.status == 2);
        },

        moveTask: function(id, status){
            fetch('https://localhost:44336/api/tasks/status',{
                method: 'PUT',
                headers: {
                    'Accept':'*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Id: id,
                    Status: status
                })
            })
            .then(response => response.json())
            .then(data => {
                this.filterTasks(data);
            });
        },
        renameTask: function(id, name){
            fetch('https://localhost:44336/api/tasks',{
                method: 'PUT',
                headers: {
                    'Accept':'*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Id: id,
                    Name: name
                })
            })
            .then(response => response.json())
            .then(data => {
                this.filterTasks(data);
            });
        },
        deleteTask: function(id){
            fetch('https://localhost:44336/api/tasks/' + id,{
                method: 'DELETE',
                headers: {
                    'Accept':'*',
                }
            })
            .then(response => response.json())
            .then(data => {
                this.filterTasks(data);
            });
        },
        addJob: function(id, job){
            fetch('https://localhost:44336/api/tasks/job',{
                method: 'POST',
                headers: {
                    'Accept':'*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    TaskId: id,
                    JobName: job
                })
            })
            .then(response => response.json())
            .then(data => {
                this.filterTasks(data);
            });
        }

    },
    computed: {

    },
    mounted() {
        eventBus.$on('add-task', data => {
            this.toDoTasks = data.filter(task => task.status == 0);
        })
    },
    created(){
        fetch('https://localhost:44336/api/tasks',{
            method: 'GET',
            headers: {
                'Accept':'*'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.filterTasks(data);
        });
    }
});