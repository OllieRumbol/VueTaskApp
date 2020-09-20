Vue.component('lists-component', {
    props: {

    },
    template:
        `
        <div class="row">
            <div class="col-4">
                <h1 class="d-flex justify-content-center">To-Do<span class="badge badge-primary ml-3">{{ toDoTasks.length }}: Tasks</span></h1>
                <list-component 
                    :tasks="toDoTasks" 
                    colour="primary"
                    @delete-task="deleteTask" 
                    @edit-task="renameTask"
                    @move-task="moveTask"
                    @add-job="addJob"
                    @delete-job="deleteJob"
                    @edit-job-status="editJobStatus">
                </list-component>
            </div>
            <div class="col-4">
                <h1 class="d-flex justify-content-center">In Progress<span class="badge badge-warning ml-3">{{ inProgressTasks.length }}: Tasks</span></h1>
                <list-component 
                    :tasks="inProgressTasks" 
                    colour="warning" 
                    @delete-task="deleteTask"
                    @edit-task="renameTask"
                    @move-task="moveTask"
                    @add-job="addJob"
                    @delete-job="deleteJob"
                    @edit-job-status="editJobStatus">
                </list-component>
            </div>
            <div class="col-4">
                <h1 class="d-flex justify-content-center">Done<span class="badge badge-success ml-3">{{ doneTasks.length }}: Tasks</span></h1>
                <list-component 
                    :tasks="doneTasks" 
                    colour="success" 
                    @delete-task="deleteTask"
                    @edit-task="renameTask"
                    @move-task="moveTask"
                    @add-job="addJob"
                    @delete-job="deleteJob"
                    @edit-job-status="editJobStatus">
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
        },
        deleteJob: function(id, job){
            fetch('https://localhost:44336/api/tasks/job',{
                method: 'DELETE',
                headers: {
                    'Accept':'*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    TaskId: id,
                    JobId: job
                })
            })
            .then(response => response.json())
            .then(data => {
                this.filterTasks(data);
            });
        },
        editJobStatus: function(taskId, jobId, jobStatus){
            fetch('https://localhost:44336/api/tasks/job/done',{
                method: 'PUT',
                headers: {
                    'Accept':'*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    TaskId: taskId,
                    JobId: jobId,
                    Done: jobStatus
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