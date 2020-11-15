<template>
  <div>
    <h5 class="font-weight-bold">{{ title }}</h5>
    <div class="input-group">
      <input :type="type" class="form-control mr-3" v-model="componentValue" />
      <button type="button" :class="buttonStyle" v-on:click="click">
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalInput",
  components: {},
  props: {
    title: String,
    value: String,
    type: String,
    colour: String,
    clearValue: String
  },
  mounted() {},
  data() {
    return {
      componentValue: this.value,
    };
  },
  methods: {
    click: function() {
      this.$emit("saveChanges", this.componentValue);
      if(this.clearValue === "true"){
          this.componentValue = "";
      }
    },
  },
  computed: {
    buttonStyle() {
      return "btn btn-" + this.colour;
    },
  },
  created() {},
};
</script>
