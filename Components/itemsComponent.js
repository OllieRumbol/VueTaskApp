Vue.component('item-component', {
    props: {
        task: String,
        location: Number,
        colour: String,
        mouseEvents: Array,
        jobs: Array
    },
    template:
    `
        <div class="d-inline-flex w-100">
            <div class="dropdown w-100">
                <button :class="button3Style" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                    {{ componentTask }}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div class="p-3 input-group">
                        <input type="text" class="form-control mr-3" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" v-model="componentTask">
                        <button type="button" class="btn btn-primary" v-on:click="editTask(location)">Save</button>
                    </div>
                    <div>
                        <h3 class="p-3">Jobs</h3>
                        <div class="p-3 input-group" v-for="(job, key) in jobs">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" v-model="job.done" id="defaultCheck1">
                                <h5 class="form-check-label">{{job.name}}</h5>
                            </div>
                        </div>
                        <div class="p-3 input-group">
                            <input type="text" class="form-control mr-3" placeholder="New job" aria-label="Username" aria-describedby="basic-addon1" v-model="newJob">
                            <button type="button" class="btn btn-success" v-on:click="addJob(jobs)">+</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dropdown">
                <!--<input :class="button1Style" v-model="componentTask">-->
                <button type="button" :class="button2Style" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu">
                    <div v-for="(mouseEvent, key) in mouseEvents">
                        <a class="dropdown-item" href="#" v-on:click="moveTask(mouseEvent.event, location)">{{mouseEvent.option}}</a>
                    </div>
                    <a class="dropdown-item" href="#" v-on:click="deleteTask(location)">Delete</a>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            componentTask: this.task,
            newJob: ""
        }
    },
    methods: {
        deleteTask: function (location) {
            this.$emit("delete-task", location);
        },
        editTask: function(location){
            this.$emit("edit-task", location, this.componentTask);
        },
        moveTask: function (event, location) {
            this.$emit(event, location);
        },
        addJob: function(array){
            this.$emit("add-job", array, this.newJob)
            return false;
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