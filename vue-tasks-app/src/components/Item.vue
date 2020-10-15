<template>
  <div class="d-inline-flex w-100">
    <div class="dropdown w-100">
      <!-- Task Name -->
      <button
        :class="button3Style"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        {{ task.name }}
      </button>
      <!--JOBS MENU-->
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <!--UPDATE TASK-->
        <div class="p-3 input-group">
          <input
            type="text"
            class="form-control mr-3"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="task.name"
          />
          <button
            type="button"
            class="btn btn-primary"
            v-on:click.stop.prevent="editTask"
          >
            Save
          </button>
        </div>
        <div v-show="showTaskErrorMessage" class="p-3 input-group">
          <div class="alert alert-danger" role="alert">
            {{ taskErrorMessage }}
          </div>
        </div>
        <!--JOBS SECTION-->
        <div>
          <h2 class="p-3">
            Jobs <span class="badge badge-secondary ml-1">{{ task.jobs.length }}</span>
          </h2>
          <!-- NEW -->
          <table class="p-3 input-group table d-flex justify-content-center">
            <tbody>
              <tr>
                <th class="text-center"><h5>Done</h5></th>
                <th class="text-center"><h5>Name</h5></th>
                <th class="text-center"><h5>Delete</h5></th>
              </tr>
              <tr v-for="(job, key) in task.jobs" v-bind:key="key">
                <td class="text-center">
                  <input
                    class="mt-2"
                    type="checkbox"
                    v-model="job.done"
                    id="defaultCheck1"
                    v-on:click.stop.prevent="editJobStatus(job.id, job.done)"
                  />
                </td>
                <td class="text-center">
                  <h4>{{ job.name }}</h4>
                </td>
                <td class="text-center">
                  <button
                    class="btn btn-danger"
                    v-on:click.stop.prevent="delJob(job.id)"
                  >
                    Del
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!--ADD JOB-->
          <div class="p-3 input-group">
            <input
              type="text"
              class="form-control mr-3"
              placeholder="New job"
              aria-label="Username"
              aria-describedby="basic-addon1"
              v-model="newJob"
            />
            <button
              type="button"
              class="btn btn-success"
              v-on:click.stop.prevent="addJob(task.id)"
            >
              +
            </button>
          </div>
          <div v-show="showJobErrorMessage" class="p-3 input-group">
            <div class="alert alert-danger" role="alert">
              {{ jobErrorMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--TASK MENU-->
    <div class="dropleft">
      <button
        type="button"
        :class="button2Style"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span class="sr-only">Toggle Dropdown</span>
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#" v-on:click="moveTask">Move</a>
        <a class="dropdown-item" href="#" v-on:click="deleteTask">Delete</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  components: {},
  props: {
    task: Object,
    colour: String,
  },
  mounted() {},
  data() {
    return {
      newJob: "",
      showJobErrorMessage: false,
      jobErrorMessage: "Cannot add empty job, please add a value",
      showTaskErrorMessage: false,
      taskErrorMessage: "Cannot have an empty task name, Please add value",
    };
  },
  methods: {
    moveTask: function() {
      let data = JSON.stringify({
        Id: this.task.id,
        Status: this.getStatus(this.task.status),
      });
      this.$store.dispatch("moveTask", data);
    },
    deleteTask: function() {
      this.$store.dispatch("deleteTask", this.task.id);
    },
    editTask: function() {
      this.showTaskErrorMessage = false;
      if (this.task.name == "") {
        this.showTaskErrorMessage = true;
        return;
      }

      let data = JSON.stringify({
        Id: this.task.id,
        Name: this.task.name,
      });
      this.$store.dispatch("renameTask", data);
    },
    addJob: function(id) {
      this.showJobErrorMessage = false;
      if (this.newJob == "") {
        this.showJobErrorMessage = true;
        return;
      }

      let data = JSON.stringify({
        TaskId: id,
        JobName: this.newJob,
      });

      this.$store.dispatch("addJob", data);

      this.newJob = "";
    },
    delJob: function(jobId) {
      let data = JSON.stringify({
        TaskId: this.task.id,
        JobId: jobId,
      });

      this.$store.dispatch("deleteJob", data);
    },
    editJobStatus: function(jobId, jobStatus) {
      let data = JSON.stringify({
        TaskId: this.task.id,
        JobId: jobId,
        Done: !jobStatus,
      });

      this.$store.dispatch("editJobStatus", data);
    },
    getStatus: function(status) {
      if (status == 2) {
        return 0;
      } else {
        return status + 1;
      }
    },
  },
  computed: {
    button1Style() {
      return "btn btn-" + this.colour + " w-100";
    },
    button2Style() {
      return (
        "btn btn-" + this.colour + " dropdown-toggle dropdown-toggle-split"
      );
    },
    button3Style() {
      return "btn btn-" + this.colour + " dropdown w-100";
    },
  },
};
</script>
