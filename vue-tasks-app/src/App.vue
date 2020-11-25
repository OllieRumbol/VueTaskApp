<template>
  <div>
    <div class="alert alert-danger" role="alert" v-show="showApiError" id="apiErrorMessage">
      Unable to connect to the Tasks API and therefore unable to save task.
      <strong>Please contact support for further details.</strong>
    </div>
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
  </div>
</template>

<style>
@import'~bootstrap/dist/css/bootstrap.css';
</style>

<script>
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
  computed: {
    showApiError() {
      return this.$store.getters.getError;
    },
  },
};
</script>
