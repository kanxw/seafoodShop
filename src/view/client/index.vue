<template>
  <el-container>
    <el-aside width="70px">
      <rghxClientAvatar ref="clientavatar"></rghxClientAvatar>
    </el-aside>
    <el-main>
      <component :is="currentView"></component>
    </el-main>
  </el-container>
</template>

<script>
import rghxClientAvatar from "./components/avatar";
import rghxClientOrder from "./order";

export default {
  name: "index",
  data() {
    return {
      currentView: "rghxClientOrder",
    };
  },

  components: {
    rghxClientAvatar,
    rghxClientOrder,
  },
  methods: {},
  created() {
    //this.getroutetoken()1;
  },
};
</script>
<style lang='scss' scoped>
/deep/::-webkit-scrollbar {
  height: 0px;
  width: 0px;
  background: #eee;
}
.el-container {
  width: 100%;
  height: 100%;
  .el-header {
    padding: 0;
  }
  .el-aside {
    background-color: #409eff;
    z-index: 1;
    box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.3);
  }
  .el-main {
    background-color: #f7f7f7;
    padding: 0;
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background: #eee;
}
</style>