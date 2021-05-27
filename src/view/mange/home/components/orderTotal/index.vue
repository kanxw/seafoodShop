<template>
    <el-col></el-col>
</template>
<script>
export default {
  name: "orderTotal",
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
        orderData: [],
    };
  },
  methods: {
    rowDataUpdate() {
        let rowData = this.rowData;
        let orderData = Object.assign([], rowData);
        this.orderData = orderData;
    },
  },
  watch: {
    rowData(val, newVal) {
      this.rowDataUpdate();
    },
  },
};
</script>