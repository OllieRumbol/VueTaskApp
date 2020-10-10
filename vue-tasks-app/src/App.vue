<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="container-fluid" id="app">
      <h1 class="display-4 font-weight-bold">Tasks</h1>
      <p class="lead">Create all the tasks for your day here.</p>
      <div class="row">
        <div class="col-12">
          <Input />
        </div>
      </div>
      <br />
      <Lists />
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Input from "./components/Input";
import Lists from "./components/Lists";

export default {
  name: "App",
  components: {
    Input,
    Lists,
  },
  props: {},
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
