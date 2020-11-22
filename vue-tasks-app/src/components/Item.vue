<template>
  <div class="d-inline-flex w-100">
    <!-- Task Name -->
    <button
      :class="button3Style"
      type="button"
      id="dropdownMenuButton"
      @click="open"
    >
      {{ task.name }}
    </button>
    <Modal v-if="showModal" @close="close" :task="task" />

    <!--TASK MENU-->
    <div class="dropleft">
      <button
        type="button"
        :class="button2Style"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span class="sr-only">Toggle Dropdown</span>
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#" v-on:click="moveTask">Move</a>
        <a class="dropdown-item" href="#" v-on:click="deleteTask">Delete</a>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./Modal";

export default {
  name: "Item",
  components: {
    Modal,
  },
  props: {
    task: Object,
    colour: String,
  },
  mounted() {},
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    moveTask: function() {
      let data = JSON.stringify({
        Id: this.task.id,
        Status: this.getStatus(this.task.status),
      });
      this.$store.dispatch("moveTask", data);
    },
    deleteTask: function() {
      this.$store.dispatch("deleteTask", this.task.id);
    },
    getStatus: function(status) {
      if (status == 2) {
        return 0;
      } else {
        return status + 1;
      }
    },
    close() {
      this.showModal = false;
    },
    open() {
      this.showModal = true;
    },
  },
  computed: {
    button1Style() {
      return "btn btn-" + this.colour + " w-100";
    },
    button2Style() {
      return (
        "btn btn-" + this.colour + " dropdown-toggle dropdown-toggle-split"
      );
    },
    button3Style() {
      return "btn btn-" + this.colour + " dropdown w-100";
    },
  },
};
</script>
