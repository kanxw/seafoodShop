<template>
  <div class="menu-top">
    <div class="nav-box">
      <template v-for="item in mainnav">
        <el-button
          round
          size="medium"
          type="text"
          :key="item.viewName"
          :class="item.name == navActive ? 'active' : ''"
          @click="navclick(item.name, item.viewName)"
          >{{ item.name }}</el-button
        >
      </template>
    </div>
    <el-input
      v-model="searchinput"
      clearable
      placeholder="请输入款号或序号"
      suffix-icon="el-icon-search"
    >
    </el-input>
    <el-button
      class="rotateIcon"
      icon="el-icon-arrow-up"
      round
      @click="foldOrderTotal"
      :class="{ 'rotate-180': isrotateIcon }"
    ></el-button>
  </div>
</template>
<script>
export default {
  name: "mainnav",
  data() {
    return {
      searchinput: "",
      mainnav: [
        {
          name: "单品",
          viewName: "rghxProduct",
        },
        { name: "陈列", viewName: "rghxProductDisplay" },
        { name: "搭配", viewName: "rghxProductShow" },
        { name: "主题", viewName: "rghxProductTheme" },
        { name: "测试", viewName: "rghxProductTest" },
      ],
      navActive: "单品",
      isrotateIcon: false,
    };
  },
  methods: {
    navclick(val, viewval) {
      this.navActive = val;
      this.$emit("changeView", viewval);
    },
    foldOrderTotal() {
      this.$emit("isShowTotal");
      this.isrotateIcon = !this.isrotateIcon;
    },
  },
};
</script>
<style lang='scss' scoped>
.menu-top {
  display: flex;
  background-color: #5a5a66;
  padding: 0 15px;
  .nav-box {
    flex: 1;
    button:active {
      color: unset;
    }
    button:hover {
      color: #fff;
    }
  }
  button {
    width: 80px;
    margin: 13px;
    color: #fff;
  }
  /deep/ .el-input {
    text-align: right;
    margin: 13px 0;
    flex: 0;
    border: 1px solid #ffffff;
    border-radius: 30px;
    white-space: nowrap;
    /deep/ .el-icon-search {
      line-height: unset;
      color: #fff;
    }
    /deep/ .el-icon-search::before {
      font-size: 18px;
    }
    /deep/ .el-input__clear {
      line-height: unset;
      color: #fff;
      vertical-align: middle;
      position: relative;
      left: -50px;
    }
  }
  .active {
    background-color: #58b5f0;
  }
  /deep/ .el-input__inner {
    width: 171px;
    font-size: 12px;
    height: 32px;
    padding: 0 30px 0 15px;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    border: 0;
  }
  /deep/ .el-input__suffix {
    position: relative;
    height: unset;
    display: inline-block;
    vertical-align: middle;
  }
  .rotateIcon {
    width: 34px;
    height: 34px;
    background-color: unset;
    border: 1px solid;
    font-size: 24px;
    padding: 0;
  }
  .rotate-180 {
    transform: rotate(180deg);
  }
}
</style>