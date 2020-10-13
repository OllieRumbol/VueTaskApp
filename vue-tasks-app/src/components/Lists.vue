<template>
  <div class="row">
    <div class="col-4">
      <h1 class="d-flex justify-content-center">
        To-Do<span class="badge badge-primary ml-3"
          >{{ toDoTasks.length }}: Tasks</span
        >
      </h1>
      <List :tasks="toDoTasks" colour="primary" />
    </div>
    <div class="col-4">
      <h1 class="d-flex justify-content-center">
        In Progress<span class="badge badge-warning ml-3"
          >{{ inProgressTasks.length }}: Tasks</span
        >
      </h1>
      <List :tasks="inProgressTasks" colour="warning" />
    </div>
    <div class="col-4">
      <h1 class="d-flex justify-content-center">
        Done<span class="badge badge-success ml-3"
          >{{ doneTasks.length }}: Tasks</span
        >
      </h1>
      <List :tasks="doneTasks" colour="success" />
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
  methods: {},
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
