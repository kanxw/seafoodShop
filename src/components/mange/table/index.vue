<template>
  <el-table :data="tableData" size="mini">
    <el-table-column
      v-for="item in tableHead"
      :key="item.labbel"
      :label="item.label"
      :prop="item.prop"
    ></el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "table-noreder",
  props: {
    dataList: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      tableData: [],
      tableHead: [],
    };
  },
  methods: {
    tableDataUpdate() {
      let { head, data } = this.dataList;
      console.log(head, data);
      this.tableHead = Object.assign([], head);
      this.tableData = Object.assign([], data);
    },
  },
  beforeCreate() {
    console.log("这里是子组件创建之前");
  },
  beforeMount() {
    console.log("这里是子组件beforeMount");
  },
  mounted() {
    console.log("这里是子组件mounted");
  },
  created() {
    console.log("这里是子组件创建");
    this.tableDataUpdate();
  },
  watch: {
    dataList(val, newVal) {
      console.log("检测更新");
      this.tableDataUpdate();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>