<template>
  <div ref="pie"></div>
</template>
<script>
const echarts = require("echarts/lib/echarts");

export default {
  name: "echarts-pie",
  props: {
    option: {
      type: Object,
      defalut: null,
    },
  },
  methods: {
    init() {
      let myChart = echarts.init(this.$refs.pie);
      if (!myChart || this.option["seriesData"].length === 0) {
        return false;
      }

      let option = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: this.option.seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      this.$nextTick(()=>{
        myChart.setOption(option);
      })
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