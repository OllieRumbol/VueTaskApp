<template>
  <div>
    <div v-for="(task, key) in tasks" v-bind:key="key">
      <Item :task="task" :colour="colour" />
      <br /><br />
    </div>
  </div>
</template>

<script>
import Item from "./Item";

export default {
  name: "List",
  components: {
    Item,
  },
  props: {
    tasks: Array,
    colour: String,
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
