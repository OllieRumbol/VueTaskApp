<template>
  <div class="row">
    <div class="col-4">
      <h1 class="d-flex justify-content-center">
        To-Do<span class="badge badge-primary ml-3"
          >{{ toDoTasks.length }}: Tasks</span
        >
      </h1>
      <List
        :tasks="toDoTasks"
        colour="primary"
        @add-job="addJob"
        @delete-job="deleteJob"
        @edit-job-status="editJobStatus"
      />
    </div>
    <div class="col-4">
      <h1 class="d-flex justify-content-center">
        In Progress<span class="badge badge-warning ml-3"
          >{{ inProgressTasks.length }}: Tasks</span
        >
      </h1>
      <List
        :tasks="inProgressTasks"
        colour="warning"
        @add-job="addJob"
        @delete-job="deleteJob"
        @edit-job-status="editJobStatus"
      />
    </div>
    <div class="col-4">
      <h1 class="d-flex justify-content-center">
        Done<span class="badge badge-success ml-3"
          >{{ doneTasks.length }}: Tasks</span
        >
      </h1>
      <List
        :tasks="doneTasks"
        colour="success"
        @add-job="addJob"
        @delete-job="deleteJob"
        @edit-job-status="editJobStatus"
      />
    </div>
  </div>
</template>

<script>
import List from "./List";
export default {
  name: "Lists",
  components: {
    List,
  },
  props: {},
  mounted() {
    this.$store.dispatch("setTask");
  },
  data() {
    return {};
  },
  methods: {
    //New
    filterTasks: function(data) {
      this.toDoTasks = data.filter((task) => task.status == 0);
      this.inProgressTasks = data.filter((task) => task.status == 1);
      this.doneTasks = data.filter((task) => task.status == 2);
    },
    addJob: function(id, job) {
      fetch("https://localhost:44336/api/tasks/job", {
        method: "POST",
        headers: {
          Accept: "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TaskId: id,
          JobName: job,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.filterTasks(data);
        })
        .catch((error) => {
          console.log(error);
          this.$emit("api-error");
        });
    },
    deleteJob: function(id, job) {
      fetch("https://localhost:44336/api/tasks/job", {
        method: "DELETE",
        headers: {
          Accept: "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TaskId: id,
          JobId: job,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.filterTasks(data);
        })
        .catch((error) => {
          console.log(error);
          this.$emit("api-error");
        });
    },
    editJobStatus: function(taskId, jobId, jobStatus) {
      fetch("https://localhost:44336/api/tasks/job/done", {
        method: "PUT",
        headers: {
          Accept: "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TaskId: taskId,
          JobId: jobId,
          Done: jobStatus,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.filterTasks(data);
        })
        .catch((error) => {
          console.log(error);
          this.$emit("api-error");
        });
    },
  },
  computed: {
    toDoTasks() {
      return this.$store.getters.getToDoTasks;
    },
    inProgressTasks() {
      return this.$store.getters.getInProgressTasks;
    },
    doneTasks() {
      return this.$store.getters.getDoneTasks;
    },
  },
  created() {},
};
</script>
