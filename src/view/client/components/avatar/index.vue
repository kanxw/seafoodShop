<template>
  <div class="avatar-box">
    <div class="asidehead">
      <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
      <div class="shopname">联欣北京路店(散码)</div>
    </div>
    <div class="asidebody">
      <template v-for="(item, index) in asidemen">
        <el-row :key="index" class="men-box">
          <i class="icon menuIcon" :class="item.class"></i>
          <span>{{ item.menuName }}</span>
        </el-row>
      </template>
    </div>
    <div class="asidefoot">
      <el-button type="text" @click="cancellation">注销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "clientavatar",
  data() {
    return {
      asidemen: [
        {
          name: "order",
          class: "menu-order",
          menuName: "订货",
        },
        {
          name: "rank",
          class: "menu-rank",
          menuName: "排行",
        },
        {
          name: "analysis",
          class: "menu-analysis",
          menuName: "分析",
        },
        {
          name: "more",
          class: "menu-more",
          menuName: "更多",
        },
      ],
      //{ 订货: "order", 排行: "top", 分析: "analysis", 更多: "more" },
      menactive: "order",
    };
  },
  methods: {
    cancellation() {
      this.$router.push("/");
    },
    menuclick(val) {
      console.log(val);
      this.menactive = val;
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.avatar-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  button {
    color: #fff;
  }
}
.asidebody {
  flex: 1;
  margin-top: 15vh;
  .men-box {
    margin: 15px 0;
    font-size: 12px;
    color: #fff;
    padding: 10px 0;
  }
}

.el-container .el-aside {
  text-align: center;
}
.asidehead {
  margin-top: 30px;
  color: #fff;
}
</style>