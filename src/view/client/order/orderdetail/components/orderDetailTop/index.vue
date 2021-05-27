<template>
  <div class="topnavBox">
    <el-button icon="el-icon-arrow-left" @click="goback">返回</el-button>
    <el-input
      v-model="searchinput"
      clearable
      placeholder="请输入款号或序号"
      suffix-icon="el-icon-search"
    >
    </el-input>
  </div>
</template>
<script>
export default {
  name: "OrderDetailTopNav",
  data() {
    return {
      searchinput: "",
    };
  },
  components: {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss">
.topnavBox {
  height: 40px;
  width: 100%;
  padding-top: 20px;
  white-space: nowrap;
  overflow: hidden;
  background-color: #5a5a66;
  .el-button {
    background-color: #5a5a66;
    color: #fff;
    font-size: 16px;
    border: 0;
  }
  .el-input {
    width: 196px;
    float: right;
    margin-right: 13px;
    border: 1px solid #ffffff;
    border-radius: 30px;
    white-space: nowrap;
    .el-icon-search {
      line-height: unset;
      color: #fff;
    }
    .el-icon-search::before {
      font-size: 18px;
    }
    .el-input__clear {
      line-height: unset;
      color: #fff;
      vertical-align: middle;
      position: relative;
      left: -50px;
    }
    .el-input__suffix {
      position: relative;
      height: unset;
      display: inline-block;
      vertical-align: middle;
    }
    .el-input__inner {
      width: 171px;
      font-size: 12px;
      height: 32px;
      padding: 0 30px 0 15px;
      background-color: rgba(0, 0, 0, 0);
      color: #fff;
      border: 0;
      line-height: unset;
    }
  }
}
</style>