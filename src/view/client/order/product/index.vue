<template>
        <el-main>
          <rghxDataTableList v-if="istablelist"></rghxDataTableList>
          <rghxDataList v-else></rghxDataList>
        </el-main>
</template>

<script>
import rghxDataList from "./components/prodlist";
import rghxDataTableList from "./components/prodlisttable";

export default {
  name: "index",
  data() {
    return {
      istablelist: false,
    };
  },

  components: {
    rghxDataList,
    rghxDataTableList,
  },
  methods: {
    getroutetoken() {
      console.log(this.$route.params, 1);
      this.token = this.$route.params.usertoken;
      console.log(this.token, 2);
    },
    isShowTotal(){
      console.log('皮一下测试值');
      this.totalShow = !this.totalShow;
    },
  },
  created() {
    //this.getroutetoken();
  },
};
</script>
<style lang='scss' scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-header{
    padding: 0;
  }
  .el-aside {
    background-color: #409eff;
    z-index: 1;
    box-shadow: 0 0 8px 5px rgba(0,0,0,0.3);
  }
  .el-main{
    background-color: #F7F7F7;
    padding: 0;
  }
  .orderTotal{
    height: 321px !important ;
  }
}
</style>