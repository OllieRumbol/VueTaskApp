<template>
  <div>
    <div v-show="showErrorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <input v-model="task" class="form-control" type="text" />
    <br />
    <button class="btn btn-primary btn-lg m-3" v-on:click="submitTask">Add</button>
    <button class="btn btn-danger btn-lg" v-on:click="clearInput">Clear</button>
  </div>
</template>

<script>
import { EventBus } from '../helpers/event-bus';

export default {
  name: "Input",
  props: {},
  mounted() {},
  data() {
    return {
      task: "",
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
      fetch("https://localhost:44336/api/tasks", {
        method: "POST",
        headers: {
          Accept: "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: this.task,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          EventBus.$emit("add-task", data);
        });

      this.task = "";
    },
    clearInput: function() {
      this.task = "";
      this.showErrorMessage = false;
    },
  },
  computed: {},
};
</script>
