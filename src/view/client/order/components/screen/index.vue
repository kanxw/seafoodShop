<template>
  <div class="screen-box">
    <template v-for="(screenitem, key, index) in screenData">
      <div class="tag-group" :key="key">
        <el-button type="text"
          >{{ key }}
          <i class="el-icon-arrow-down"></i>
          :
        </el-button>
        <el-button
          type="text"
          v-for="(item, index2) in screenitem"
          :key="index2"
          :class="index2 == screenActive[index] ? 'active' : ''"
          @click="screenClick(index,index2)"
          class="biaoji"
        >
          {{ item }}
        </el-button>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "screen",
  props: {
    totkn: {
      type: String,
      default() {
        return "";
      },
    },
    orderCurrentView: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      screenData: {},
      screenActive: [0, 0, 0],
      testTotkn: this.totkn,
    };
  },
  methods: {
    screenDataChange() {
      switch (this.orderCurrentView) {
        case "rghxProductDisplay":
          this.screenData = {
            陈列1: ["全部", "1", "分组1", "静态陈列"],
            陈列2: ["全部", "2", "分组21", "春一波", "夏2波"],
          };
          break;
        case "rghxProductShow":
          this.screenData = {
            搭配1: ["全部", "CCDD", "HM", "静态陈列"],
            搭配2: ["全部", "春2波", "夏一波", "春一波", "夏2波"],
          };
          break;
        case "rghxProductTheme":
          this.screenData = {
            主题: ["季节", "品牌", "系列", "大类"],
          };
          break;
        case "rghxProductTest":
          this.screenData = {
            陈列1: ["全部", "1", "分组1", "静态陈列"],
            陈列2: ["全部", "2", "分组21", "春一波", "夏2波"],
          };
          break;
        default:
          this.screenData = {
            大类: ["全部", "上衣", "裤子", "鞋子", "饰品"],
            上市波段: [
              "全部",
              "春一波",
              "春二波",
              "夏一波",
              "夏二波",
              "夏三波",
            ],
            系列: ["全部", "春意盎然", "别具一格", "别出心思", "测试"],
          };

          break;
      }
    },
    screenClick(i, val){
      this.screenActive.splice(i, 1, val);
    }
  },
  created() {

    // if (this.screenData.length == 0) {
    //   axios
    //     .get("/screenproduct", {
    //       totkn: this.testTotkn,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((res) => {
    //       console.log(res);
    //     });
    // }
    this.screenDataChange();
  },
  watch: {
    testTotkn(val) {
      console.log(val, this.testTotkn);
      console.log("这里是父组件传值检测", this.screenList);
      console.log(2, this.screenData);
    },
    orderCurrentView(val) {
      //this.screenActive = this.$options.screenActive;
      Object.assign(this.$data.screenActive, this.$options.data().screenActive);
      this.screenDataChange();
    },
  },
};
</script>

<style lang='scss' scoped>
.screen-box {
  padding: 0 20px 0 30px;
  .tag-group {
    padding-top: 10px;
    border-top: 1px dashed #ccc;
    .el-icon-arrow-down {
      color: #43a4e2;
    }
    .el-button:first-child {
      margin-left: 10px;
    }
  }
  .tag-group:first-child {
    border-top: 0;
  }
  .el-button {
    margin-left: 20px;
    color: #333333;
    font-size: 14px;
  }
  .active {
    color: #43a4e2;
  }
}
</style>