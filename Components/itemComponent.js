Vue.component('item-component', {
    props: {
        task: Object,
        colour: String
    },
    template:
    `
        <div class="d-inline-flex w-100">
            <div class="dropdown w-100">
                <button :class="button3Style" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                    {{ task.name }}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div class="p-3 input-group">
                        <input type="text" class="form-control mr-3" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" v-model="task.name">
                        <button type="button" class="btn btn-primary" v-on:click.stop.prevent="editTask">Save</button>
                    </div>
                    <div v-show="showTaskErrorMessage" class="p-3 input-group">
                        <div class="alert alert-danger" role="alert">
                            {{ taskErrorMessage }}
                        </div>
                    </div>
                    <div>
                        <h2 class="p-3">Jobs</h2>
                        <div class="p-3 input-group" v-for="(job, key) in task.jobs">
                            <div class="form-check">
                                <div class="row">
                                    <div class="col-6">
                                        <input class="form-check-input mt-2" type="checkbox" v-model="job.done" id="defaultCheck1" v-on:click.stop.prevent="editJobStatus(job.id, job.status)">
                                        <h4 class="form-check-label">{{job.name}}</h4>
                                    </div>
                                    <div class="col-6">
                                        <button class="btn btn-danger" v-on:click.stop.prevent="delJob(job.id)">Del</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="p-3 input-group">
                            <input type="text" class="form-control mr-3" placeholder="New job" aria-label="Username" aria-describedby="basic-addon1" v-model="newJob">
                            <button type="button" class="btn btn-success" v-on:click.stop.prevent="addJob(task.id)">+</button>
                        </div>
                        <div v-show="showJobErrorMessage" class="p-3 input-group">
                            <div class="alert alert-danger" role="alert">
                                {{ jobErrorMessage }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dropleft">
                <button type="button" :class="button2Style" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#" v-on:click="moveTask">Move</a>
                    <a class="dropdown-item" href="#" v-on:click="deleteTask">Delete</a>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            newJob: "",
            showJobErrorMessage: false,
            jobErrorMessage: "Cannot add empty job, please add a value",
            showTaskErrorMessage: false,
            taskErrorMessage: "Cannot have an empty task name, Please add value"
        }
    },
    methods: {
        moveTask: function () {
            this.$emit("move-task", this.task.id, this.getStatus(this.task.status));
        },
        deleteTask: function () {
            this.$emit("delete-task", this.task.id);
        },
        editTask: function(){
            this.showTaskErrorMessage = false;
            if(this.task.name == ""){
                this.showTaskErrorMessage = true;
                return;
            }

            this.$emit("edit-task",  this.task.id, this.task.name);
        },
        addJob: function(id){
            this.showJobErrorMessage = false;
            if(this.newJob == ""){
                this.showJobErrorMessage = true;
                return;
            }

            this.$emit("add-job", id, this.newJob);
            this.newJob = "";
        },
        delJob: function(jobId){
            this.$emit("del-job", this.task.id, jobId);
        },
        editJobStatus: function(jobId, jobStatus){
            this.$emit("edit-job-status", this.task.id, jobId, !jobStatus)
        },
        getStatus: function(status){
            if(status == 2){
                return 1;
            }
            else{
                return status + 1;
            }
        }
    },
    computed: {
        button1Style() {
            return "btn btn-" + this.colour + " w-100";
        },
        button2Style() {
            return "btn btn-" + this.colour + " dropdown-toggle dropdown-toggle-split";
        },
        button3Style(){
            return "btn btn-" + this.colour + " dropdown w-100";
        }
    },
});