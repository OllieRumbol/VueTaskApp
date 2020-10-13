<template>
  <div>
    <div class="alert alert-danger" role="alert" v-show="showApiError">
      Unable to connect to the Tasks API and therefore unable to save task.
      <strong>Please contact support for further details.</strong>
    </div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container-fluid" id="app">
        <h1 class="display-4 font-weight-bold">Tasks</h1>
        <p class="lead">Create all the tasks for your day here.</p>
        <div class="row">
          <div class="col-12">
            <Input @api-error="displayError" />
          </div>
        </div>
        <br />
        <Lists @api-error="displayError" />
      </div>
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
    return {
      showApiError: false,
    };
  },
  methods: {
    displayError: function() {
      this.showApiError = true;
    },
  },
  computed: {},
};
</script>
