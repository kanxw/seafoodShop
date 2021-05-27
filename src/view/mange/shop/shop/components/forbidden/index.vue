<template>
  <el-dialog
    center
    append-to-body
    title="强制下线"
    :visible.sync="dialogVisible"
    width="70%"
  >
    <el-row>
      <el-form>
        <el-form-item size="mini">
          <el-input
            v-model="searchValue"
            placeholder="请输入店铺编号"
          ></el-input></el-form-item
        ><el-form-item size="mini">
          <el-button icon="el-icon-search" type="primary"
            >搜索</el-button
          ></el-form-item
        >
      </el-form>
    </el-row>
    <el-table :data="tableData">
          <el-table-column label="店铺编号" prop="店铺编号"></el-table-column>
          <el-table-column label="店铺名称" prop="店铺名称"></el-table-column>
          <el-table-column label="强制下线" prop="强制下线"></el-table-column>
          <el-table-column label="最后在线时间" prop="最后在线时间"></el-table-column>
    </el-table>
    <rghxTabelPagin
      :paginData="paginData"
      :pageData="pageData"
    ></rghxTabelPagin>
  </el-dialog>
</template>
<script>
import rghxTabelPagin from "@/components/mange/tablepagin";

export default {
  name: "forbidden",
  data() {
    return {
      dialogVisible: false,
      tableData: {},
      searchValue: "",
      paginData: {},
      pageData: {
        pageindex: 1,
        pagesize: 30,
      },
    };
  },
  methods: {
    show(val) {
      let tableHeardData = [],
        tableData = val.data.data[0];
        for(let key in tableData){
          tableHeardData
        }
      this.tableData = val.data.data;
      this.paginData = {
        rowcount: val.data.count,
        msg: val.data.msg,
      };
      this.dialogVisible = true;
    },
    dislogIsShow() {
      this.dialogVisible = !this.dialogVisible;
    },
  },
  components: {
    rghxTabelPagin,
  },
};
</script>