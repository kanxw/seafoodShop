<template>
  <div class="od-left">
    <el-image :src="imagesrc"></el-image>
    <el-button-group>
      <el-button>上一款</el-button>
      <el-button>下一款</el-button>
    </el-button-group>
    <el-card :body-style="{ padding: '0px' }">
      <div v-for="(item, key) in prodData" :key="key" class="text item">
        {{ key + "： " + item }}
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "odleft",
  data() {
    return {
        imagesrc: require('small/CDL1V027W10.png'),
        prodData:{
          序号:"1",
          款号:"V92A129",
          吊牌价:"1460.00",
          大类:"服装",
          上下身:"连体装",
          品牌:"HM",
          品名:"连体裤",
          吊牌价2:"0.00",
          吊牌价3:"0.00",
          全国一口价:"0.00",
          性别:"女",
          推荐类型:"明星款",
          年份:"2018",
          货品图片:"V92A129-R29",
          配码组:"HM上衣7"
        }
    };
  },
  components: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.od-left {
  width: 30vw;
  height: 100%;
  overflow: hidden;
  display: inline-block;
  .text{
    font-size: 14px;
    margin: 5px 0 5px 50px;
  }
}
.el-button-group {
  width: 100%;
}
.el-button-group > .el-button {
  width: 50%;
}
.el-image{
  height: 30vw;
  width: 30vw;
}
</style>