<template>
  <component :is="components"></component>
</template>
<script>
export default {
  name: "mainIndex",
  props: {
    path: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      components: {},
    };
  },
  methods: {},
  beforeMount() {
    this.components = () => import(`@/view/mange/${this.path}`);
  },
};
</script>