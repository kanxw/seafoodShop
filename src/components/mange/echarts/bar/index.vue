<template>
  <div ref="bar"></div>
</template>
<script>
const echarts = require("echarts/lib/echarts");

export default {
  name: "echarts-bar",
  props: {
    option: {
      type: Object,
      defalut: null,
    },
  },
  methods: {
    init() {
      let myChart = echarts.init(this.$refs.bar);
      let optionData = this.option;
      if (!myChart || optionData["seriesData"].length === 0) {
        return false;
      }

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        legend: optionData.legend,
        xAxis: optionData.xAxis,
        yAxis: optionData.yAxis,
        series: optionData.seriesData,
      };
      this.$nextTick(() => {
        myChart.setOption(option);
      });
    },
  },
  mounted() {
    this.init();
  },
  beforeCreate() {
    console.log("此时引入元素");
  },
  created() {
    console.log("此时创建本组件的元素");
  },
};
</script>
<style lang="scss" scoped>
div {
  height: 100%;
}
</style>