<template>
  <el-row class="tablepagination-box" type="flex">
    <el-col class="msg-box" v-if="msg">
      <div v-html="msg"></div>
    </el-col>
    <el-col>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="30"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="datacount"
      >
      </el-pagination
    ></el-col>
  </el-row>
</template>
<script>
export default {
  name: "",
  props: {
    paginData: {
      type: Object,
      default: null,
    },
    pageData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
        thisPageData: {},
        thisPaginData: {},
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val)
      this.thisPageData['pageindex'] = val;
      this.$emit('handleCurrentChange', this.thisPageData);
    },
    handleSizeChange(val) {},
  },
  computed: {
    datacount() {
      return Number(this.thisPaginData.rowcount);
    },
    msg() {
      return this.thisPaginData.msg;
    },
    currentPage() {
      return this.thisPageData.paginindex;
    },
  },
  watch: {
    paginData(newVal){
      console.log(newVal)
      this.thisPageData = Object.assign({}, this.pageData);
      this.thisPaginData = Object.assign({}, this.paginData);
    }
  },
  created(){
    // this.thisPageData = Object.assign({}, this.pageData);
    // this.thisPaginData = Object.assign({}, this.paginData);
  }
};
</script>
<style lang='scss' scoped>
.tablepagination-box {
  background-color: #fff;
  padding: 10px;
  font-size: 12px;
  .msg-box {
    display: flex;
    align-items: center;
  }
  .el-pagination{
    text-align: right;
  }
}
</style>