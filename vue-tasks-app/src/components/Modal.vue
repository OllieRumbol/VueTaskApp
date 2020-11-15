<template>
  <div class="blocker">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h2 class="text-primary">Task Modal</h2>
          </div>
          <div class="modal-body">
            <div>
              <ModalInput
                title="Task Name"
                :value="taskName"
                type="text"
                colour="primary"
                clearValue="false"
                @saveChanges="editTask"
              />
              <div v-show="showTaskErrorMessage" class="pt-4">
                <div class="alert alert-danger" role="alert">
                  {{ taskErrorMessage }}
                </div>
              </div>
            </div>
            <br />
            <ModalInput
              title="Task Description"
              :value="task.description"
              type="text"
              colour="primary"
              clearValue="false"
              @saveChanges="editDescription"
            />
            <br />
            <ModalInput
              title="Task Completed Date"
              :value="taskCompletedDate"
              type="date"
              colour="primary"
              clearValue="false"
              @saveChanges="editCompletedDate"
            />
            <br />
            <div>
              <h5 class="font-weight-bold">
                Jobs
                <span class="badge badge-secondary ml-1">{{
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
                        id="defaultCheck1"
                        v-on:click.stop.prevent="
                          editJobStatus(job.id, job.done)
                        "
                      />
                    </td>
                    <td class="text-center">
                      <h4 class="mt-2">{{ job.name }}</h4>
                    </td>
                    <td class="text-center">
                      <button
                        class="btn btn-danger mt-1"
                        v-on:click.stop.prevent="delJob(job.id)"
                      >
                        Del
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <ModalInput
                title=""
                :value="newJob"
                type="text"
                colour="success"
                clearValue="true"
                @saveChanges="addJob"
              />
              <div v-show="showJobErrorMessage" class="pt-4">
                <div class="alert alert-danger" role="alert">
                  {{ jobErrorMessage }}
                </div>
              </div>
            </div>
          </div>
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
import ModalInput from "./ModalInput";

export default {
  name: "Modal",
  components: {
    ModalInput,
  },
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
      this.$emit("close");
    },
    editTask: function(value) {
      this.showTaskErrorMessage = false;
      if (value == "") {
        this.showTaskErrorMessage = true;
        return;
      }

      let data = JSON.stringify({
        Id: this.task.id,
        Name: value,
      });
      this.$store.dispatch("renameTask", data);
    },
    editDescription: function(value) {
      let data = JSON.stringify({
        Id: this.task.id,
        Description: value,
      });

      this.$store.dispatch("editDescription", data);
    },
    editCompletedDate: function(value) {
      let data = JSON.stringify({
        Id: this.task.id,
        CompletedDate: value,
      });

      this.$store.dispatch("editCompletedDate", data);
    },
    addJob: function(value) {
      this.showJobErrorMessage = false;
      if (value == "") {
        this.showJobErrorMessage = true;
        return;
      }

      let data = JSON.stringify({
        TaskId: this.task.id,
        JobName: value,
      });

      this.$store.dispatch("addJob", data);
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
