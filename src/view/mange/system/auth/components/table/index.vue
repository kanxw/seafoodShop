<template>
  <el-table
    ref="authTable"
    size="small"
    :data="tableData"
    stripe
    height="1"
    highlight-current-row
    @current-change="handleCurrentChange"
  >
    <template v-for="(item, index) in tableHead">
      <el-table-column
        :key="index"
        :label="item.label"
        :prop="item.prop"
        width="100"
      ></el-table-column>
    </template>
    <el-table-column label="操作" width="100" header-align="center">
      <el-button type="text" size="mini">编辑</el-button>
      <el-button type="text" size="mini">删除</el-button>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "authTable",
  props: {
    layoutData: {
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
    layoutDataUpdate() {
      let { tableData, tableHead } = this.layoutData;
      let head = [],
        data = [];
      tableData.forEach((item) => {
        data.push(item);
      });

      tableHead.forEach((item) => {
        head.push(item);
      });

      this.tableData = data;
      this.tableHead = head;
      this.$nextTick(() =>{
        this.setCurrent(data[0]);
      })
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      console.log(currentRow, oldCurrentRow, '123');
      this.$emit('updateUserGroup', currentRow)
    },
    setCurrent(row) {
      this.$refs.authTable.setCurrentRow(row);
    },
  },
  mounted() {
      console.log('4556');
  },
  watch: {
    layoutData(val, newval) {
      this.layoutDataUpdate();
    },
  },
};
</script>