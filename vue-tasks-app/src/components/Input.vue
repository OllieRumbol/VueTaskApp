<template>
  <div>
    <div v-show="showErrorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <h5>Task Name</h5>
    <input v-model="task" class="form-control" type="text" />
    <br />
    <h5>Task Description</h5>
    <input v-model="description" class="form-control" type="text" />
    <br />
    <h5>Task Completion Date</h5>
    <input type="date" v-model="date" />
    <br />
    <button class="btn btn-primary btn-lg m-3" v-on:click="submitTask">
      Add
    </button>
    <button class="btn btn-danger btn-lg" v-on:click="clearInput">Clear</button>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {},
  mounted() {},
  data() {
    return {
      task: "",
      description: "",
      date: "",
      showErrorMessage: false,
      errorMessage: "Input box cannot be empty, please add task",
    };
  },
  methods: {
    submitTask: function() {
      this.showErrorMessage = false;
      if (this.task == "") {
        this.showErrorMessage = true;
        return;
      }

      let data = JSON.stringify({
        task: this.task,
        description: this.description,
        completedDate: this.date,
      });

      this.$store.dispatch("addTask", data);

      this.task = "";
      this.description = "";
      this.date = "";
    },
    clearInput: function() {
      this.task = "";
      this.description = "";
      this.date = "";
      this.showErrorMessage = false;
    },
  },
  computed: {},
};
</script>
