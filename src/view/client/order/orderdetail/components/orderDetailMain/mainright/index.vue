<template>
  <div class="od-right">
    <div class="od-information">
      <div class="od-information-left">
        <span>订量:{{ qtysum }}</span>
        <span>吊牌额:￥{{ amount }}</span>
        <span>折后额:￥{{ Discount }}</span>
      </div>
      <div class="od-information-right">
        <el-rate v-model="value"></el-rate>
        <el-button icon="el-icon-postcard">意见</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="od-information">
      <div class="left">
        <el-button icon="el-icon-arrow-left"></el-button>
      </div>
      <div class="right">
        <el-button round size="medium" class="del-but odbut"
          >删除订量</el-button
        >
        <el-button round size="medium" class="save-but odbut"
          >保存订量</el-button
        >
      </div>
    </div>
    <rghxordertable></rghxordertable>
    <div></div>
  </div>
</template>
<script>
import rghxordertable from "../components/ordertable";

export default {
  name: "mainright",
  data() {
    return {
      value: null,
      qtysum: 100,
      amount: 10000,
      Discount: 5000,
    };
  },
  components: {
    rghxordertable,
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.od-right {
  height: 100%;
  width: calc(100% - 30vw);
  background-color: #f7f7f7;
  display: inline-block;
  vertical-align: top;
  .od-information {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    display: flex;
    .right {
      white-space: nowrap;
    }
    .left {
      flex: 1;
      button {
        background-color: unset;
        padding: 5px;
      }
    }
    .odbut {
      padding: 8px 15px;
      margin-right: 20px;
    }
    .del-but {
      background-color: #fff;
      border: 1px solid #555;
    }
    .save-but {
      background-color: #58b5f0;
      color: #fff;
    }
  }
  .od-information-left,
  .od-information-right {
    width: 49.5%;
    display: inline-block;
    button {
      border: 0;
      background-color: unset;
    }
  }
  .od-information-right {
    text-align: right;
    .el-rate {
      display: inline-block;
    }
    .el-rate__item .el-rate__icon {
      font-size: 26px;
    }
  }
  .el-divider--horizontal {
    margin: 5px 0;
  }
}
</style>
