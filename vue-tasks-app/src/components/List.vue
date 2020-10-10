<template>
  <div>
    <div v-for="(task, key) in tasks" v-bind:key="key">
      <Item
        :task="task"
        :colour="colour"
        @delete-task="deleteTask"
        @edit-task="editTask"
        @move-task="moveTask"
        @add-job="addJob"
        @del-job="deleteJob"
        @edit-job-status="editJobStatus" />
      <br/><br/>
    </div>
  </div>
</template>

<script>
import Item from "./Item";

export default {
  name: "List",
  components: {
      Item
  },
  props: {
    tasks: Array,
    colour: String,
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {
    deleteTask: function(id) {
      this.$emit("delete-task", id);
    },
    editTask: function(id, value) {
      this.$emit("edit-task", id, value);
    },
    addJob: function(id, job) {
      this.$emit("add-job", id, job);
    },
    deleteJob: function(id, jobId) {
      this.$emit("delete-job", id, jobId);
    },
    moveTask: function(id, status) {
      this.$emit("move-task", id, status);
    },
    editJobStatus: function(taskId, jobId, jobStatus) {
      this.$emit("edit-job-status", taskId, jobId, jobStatus);
    },
  },
  computed: {},
};
</script>
