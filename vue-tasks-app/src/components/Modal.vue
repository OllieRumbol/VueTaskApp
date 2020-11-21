<template>
  <div class="blocker">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <!-- Modal title -->
            <h2 class="text-primary">Task Modal</h2>
          </div>
          <div class="modal-body">
            <!-- Task name -->
            <div>
              <h5 class="font-weight-bold">Task Name</h5>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control mr-3"
                  v-model="taskName"
                  id="taskName"
                />
                <button
                  type="button"
                  class="btn btn-primary"
                  v-on:click="editTask"
                  id="taskNameSaveButton"
                >
                  Save
                </button>
              </div>
              <div v-show="showTaskErrorMessage" class="pt-4">
                <div class="alert alert-danger" role="alert" id="taskNameErrorMessage">
                  {{ taskErrorMessage }}
                </div>
              </div>
            </div>
            <br />
            <!-- Task description -->
            <div>
              <h5 class="font-weight-bold">Task Description</h5>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control mr-3"
                  v-model="task.description"
                  id="taskDescription"
                />
                <button
                  type="button"
                  class="btn btn-primary"
                  v-on:click="editDescription"
                >
                  Save
                </button>
              </div>
            </div>
            <br />
            <!-- Task completed date -->
            <div>
              <h5 class="font-weight-bold">Task Completed Date</h5>
              <div class="input-group">
                <input
                  type="date"
                  class="form-control mr-3"
                  v-model="taskCompletedDate"
                  id="taskCompletedDate"
                />
                <button
                  type="button"
                  class="btn btn-primary"
                  v-on:click="editCompletedDate"
                >
                  Save
                </button>
              </div>
            </div>
            <br />
            <!-- List of jobs -->
            <div>
              <h5 class="font-weight-bold">
                Jobs
                <span class="badge badge-secondary ml-1" id="numberOfJobs">{{
                  task.jobs.length
                }}</span>
              </h5>
              <table class="table justify-content-center">
                <tbody>
                  <tr>
                    <th class="text-center">
                      <h5 class="font-weight-bold">Done</h5>
                    </th>
                    <th class="text-center">
                      <h5 class="font-weight-bold">Name</h5>
                    </th>
                    <th class="text-center">
                      <h5 class="font-weight-bold">Delete</h5>
                    </th>
                  </tr>
                  <tr v-for="(job, key) in task.jobs" v-bind:key="key">
                    <td class="text-center">
                      <input
                        class="mt-2 form-control input-sm"
                        type="checkbox"
                        v-model="job.done"
                        :id="'done' + key"
                        v-on:click.stop.prevent="
                          editJobStatus(job.id, job.done)
                        "
                      />
                    </td>
                    <td class="text-center">
                      <h4 class="mt-2" :id="'job' + key">{{ job.name }}</h4>
                    </td>
                    <td class="text-center">
                      <button
                        class="btn btn-danger mt-1"
                        v-on:click.stop.prevent="delJob(job.id)"
                        :id="'del' + key"
                      >
                        Del
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- Add new job -->
              <div>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control mr-3"
                    v-model="newJob"
                    id="newJob"
                  />
                  <button
                    type="button"
                    class="btn btn-success"
                    v-on:click="addJob"
                    id="addJob"
                  >
                    Save
                  </button>
                </div>
              </div>
              <div v-show="showJobErrorMessage" class="pt-4">
                <div class="alert alert-danger" role="alert" id="jobErrorMessage">
                  {{ jobErrorMessage }}
                </div>
              </div>
            </div>
          </div>
          <!-- Close modal -->
          <div class="modal-footer">
            <button
              class="float-right btn btn-primary"
              placeholder="New Job"
              @click="close"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../style/modal.css";

export default {
  name: "Modal",
  components: {},
  props: {
    task: Object,
  },
  mounted() {},
  data() {
    return {
      newJob: "",
      showJobErrorMessage: false,
      jobErrorMessage: "Cannot add empty job, please add a value",
      showTaskErrorMessage: false,
      taskErrorMessage: "Cannot have an empty task name, Please add value",
      taskName: this.task.name,
      taskCompletedDate: this.task.completedDate.split("T")[0],
    };
  },
  methods: {
    close() {
      console.log(this.task);
      this.$emit("close");
    },
    editTask: function() {
      this.showTaskErrorMessage = false;
      if (this.taskName == "") {
        this.showTaskErrorMessage = true;
        return;
      }

      let data = JSON.stringify({
        Id: this.task.id,
        Name: this.taskName,
      });
      this.$store.dispatch("renameTask", data);
    },
    editDescription: function() {
      let data = JSON.stringify({
        Id: this.task.id,
        Description: this.task.description,
      });

      this.$store.dispatch("editDescription", data);
    },
    editCompletedDate: function() {
      let data = JSON.stringify({
        Id: this.task.id,
        CompletedDate: this.taskCompletedDate,
      });

      this.$store.dispatch("editCompletedDate", data);
    },
    addJob: function() {
      this.showJobErrorMessage = false;
      if (this.newJob == "") {
        this.showJobErrorMessage = true;
        return;
      }

      let data = JSON.stringify({
        TaskId: this.task.id,
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
  },
  computed: {},
};
</script>
