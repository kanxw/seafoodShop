<template>
  <div class="content-box">
    <div class="content-body">
      <el-row class="header" type="flex">
        <el-select
          size="mini"
          v-model="liveRoomSelect"
          placeholder="请选择直播间"
          @change="liveRoomChange"
        >
          <el-option
            v-for="(item, index) in liveRoomData"
            :key="index"
            :label="item.RoomName"
            :value="item.ID"
          ></el-option>
        </el-select>
        <el-button
          icon="el-icon-goods"
          type="primary"
          size="mini"
          style="margin-left: 10px"
          >投影大屏</el-button
        >
        <el-checkbox
          v-model="isTimedRefresh"
          label="启用定时刷新"
          :disabled="isDisabled"
        ></el-checkbox>
        <div class="timer" v-if="isTimedRefresh">
          <el-input
            size="mini"
            type="number"
            :min="0"
            placeholder
            v-model.number="refreshNum"
          >
            <template slot="prepend">间隔</template>
            <template slot="append">秒</template>
          </el-input>
        </div>
        <el-checkbox
          v-model="isTimedRefresh"
          label="启用倒计时"
          :disabled="isDisabled"
        ></el-checkbox>
        <el-button size="mini" :disabled="isDisabled">倒计时设置</el-button>
      </el-row>
      <el-row :gutter="20" class="body">
        <template v-if="isDisabled">
          <div style="flex: 1; text-align: center">请选择直播间</div>
        </template>
        <template v-else>
          <el-col class="col-gaugeChart">
            <div class="col-box">
              <el-row class="gauge-chart">
                <div
                  ref="gaugeChart"
                  class="testcanvs"
                  style="height: 300px"
                ></div>
              </el-row>
              <el-row
                v-if="prodData.length > 0"
                class="pushproddetail"
                v-html="prodData[0]['DetailInfo']"
              ></el-row>
              <el-tooltip
                effect="dark"
                content="设置仪表盘/柱状图最大值"
                placement="right"
              >
                <el-button
                  icon="el-icon-setting"
                  type="text"
                  size="medium"
                  class="gaugeChartSet"
                  @click="gaugeChartSetting"
                >
                </el-button>
              </el-tooltip>
            </div>
          </el-col>
          <el-col class="col-bar">
            <div class="col-box">
              <div style="flex: 1;" ref="barChart"></div>
              <el-row>
                <template v-for="(item, index) in columnChartData">
                  <div :key="index" class="baritem-box">
                    <el-image :src="item.PictureCode"></el-image>
                    <div v-html="item.X轴"></div>
                  </div>
                </template>
              </el-row>
            </div>
          </el-col>
        </template>
        <el-col class="col-chatrecord">
          <div class="col-box">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="直播视频"></el-tab-pane>
              <el-tab-pane label="用户留言"></el-tab-pane>
            </el-tabs>
            <el-row class="chatRecord-body"></el-row></div
        ></el-col>
      </el-row>
    </div>
    <rghxdialog ref="dialog"></rghxdialog>
  </div>
</template>
<script>
const echarts = require("echarts/lib/echarts");
import { getRoomList } from "@/api/mange/live/pushProd";
import { getGuideOrder } from "@/api/mange/live/liveShadow";
import rghxdialog from "@/components/mange/dialog";

export default {
  name: "liveShadow",
  data() {
    return {
      liveRoomData: [],
      liveRoomSelect: "",
      isDisabled: true,
      isTimedRefresh: false,
      isShieldPush: false,
      currchatcontentid: -1,
      prodData: [],
      columnChartData: [],
      xAxisData: [],
      seriesData: [],
      activeName: "",
      refreshNum: 0,
      qtySum: 0,
      maxGauge: 1000,
      isShowDialog: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      await this.getRoomList();
    },
    getRoomList() {
      return getRoomList()
        .then((res) => {
          if (res.data.errormsg == "") {
            let roomListData = res.data.data;
            this.liveRoomData = roomListData;
          }
        })
        .catch((err) => {
          console.log(err, 2);
        });
    },
    liveRoomChange(val) {
      if (this.liveRoomSelect != "") {
        this.isDisabled = false;
        this.isTimedRefresh = true;
        let params = {
          id: val,
          currchatcontentid: this.currchatcontentid,
        };

        getGuideOrder(params)
          .then((res) => {
            if (res.data.errormsg == "") {
              let seriesData = [];
              let xAxisData = [];
              this.prodData = res.data.data1;
              let columnChartData = res.data.data2;
              if (columnChartData.length > 0) {
                let qtySum = this.qtySum;
                columnChartData.forEach((item) => {
                  item.PictureCode =
                    "http://ipad.lenxdt.com/ProductImages/PictureSmaller/" +
                    item.PictureCode +
                    ".png";
                  qtySum += Number(item.QtySum);
                  seriesData.push(item.QtySum);
                  xAxisData.push(item.Info)
                });

                this.seriesData = seriesData;
                this.xAxisData = xAxisData;
                this.qtySum = qtySum;
              }

              this.columnChartData = columnChartData;
              this.drawGauge();
              this.drawBar(xAxisData,seriesData);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleClick() {
      console.log();
    },
    handleChange() {},
    //设置仪表盘
    drawGauge() {
      let option = {
        radius: "60%",
        series: [
          {
            name: "订量",
            type: "gauge",
            max: this.maxGauge,
            splitNumber: 1,
            splitLine: {
              show: false,
              length: 12,
            },
            axisLine: {
              lineStyle: {
                width: 12,
              },
            },
            axisTick: {
              splitNumber: 10,
              lineStyle: {
                width: 4,
                color: "#fff",
              },
              length: 12,
            },
            axisLabel: {
              // show: false,
              distance: 0,
              fontSize: 16,
            },
            pointer: {
              // 指针
              // show: false,
              length: "60%",
            },
            title: {
              color: "#888",
              offsetCenter: [0, "-30%"],
              fontSize: 20,
            },
            detail: {
              color: "red",
              formatter: "{value}",
              fontSize: 38,
              offsetCenter: [0, "100%"],
            },
            data: [{ value: this.qtySum, name: "总订量" }],
          },
        ],
      };

      let myChart = echarts.init(this.$refs["gaugeChart"]);
      myChart.setOption(option);
      // if (this.$refs["full-gauge"] && this.dialogVisible) {
      //   let fullChart = this.$echarts.init(this.$refs["full-gauge"]);
      //   fullChart.setOption(option, true);
      // }
    },
    //设置柱状图
    drawBar(xAxisData = [], data = []) {
      let option = {
        tooltip: {
          show: false,
        },
        xAxis: {
          show: false,
          type: "category",
          axisTick: {
            alignWithLabel: true,
          },
          data: xAxisData,
        },
        yAxis: {
          show: false,
          max: this.maxGauge,
          // max: 10
        },
        grid: {
          // top: "10px",
          left: "-40px",
          right: "0",
          bottom: "0",
          containLabel: true,
        },
        series: [
          {
            name: "订量",
            type: "bar",
            barMaxWidth: 50,
            barMinHeight: 2,
            itemStyle: {
              normal: {
                barWidth: 40,
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    color: "#409EFF",
                    fontSize: 32,
                  },
                },

                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#188df0" },
                  { offset: 0.5, color: "#188df0" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
            data: data,
          },
        ],
      };
      let myChart = this.$echarts.init(this.$refs["barChart"]);
      myChart.setOption(option);
      // if (this.$refs["full-rate"] && this.dialogVisible) {
      //   let fullChart = this.$echarts.init(this.$refs["full-rate"]);
      //   fullChart.setOption(option);
      // }
    },
    gaugeChartSetting() {
      let option = {
        title: "设置仪表盘最大值",
        tips: {
          content: "请输入大于0的数字",
          icon: false,
        },
        input: {
          default: this.maxGauge,
          type: "Number",
          disabled: false,
        },
      };

      this.$refs.dialog.show(option);
    },
    dialogUpdate(option) {
      this.maxGauge = option.input["default"];
      this.drawGauge();
      this.drawBar(this.xAxisData, this.seriesData);
    },
  },
  components: {
    rghxdialog,
  },
};
</script>
<style lang="scss" scoped>
.content-box {
  background-color: unset;
  .content-body {
    height: calc(100% - 30px);
    margin: 15px;
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    .header {
      margin-bottom: 10px;
      .el-checkbox {
        margin: 0 20px;
        line-height: 28px;
      }
      .timer {
        display: inline-block;
        width: 120px;
        margin-left: 10px;
        /deep/.el-input-group__append,
        /deep/.el-input-group__prepend {
          padding: 0 6px;
        }
      }
    }
    .body {
      flex: 1;
      display: flex;
      .el-col {
        height: 100%;
        .col-box {
          height: 100%;
          border: 1px solid #dcdfe6;
          display: flex;
          flex-direction: column;
          position: relative;
          .gaugeChartSet {
            position: absolute;
            right: 5px;
          }
        }
      }
      .gauge-chart {
        flex: 1;
        overflow: hidden;
        -webkit-box-flex: 1;
        height: 100%;
      }
      .chatRecord-body {
        flex: 8;
        background-color: #f0f0f0;
      }
      .pushproddetail {
        flex: 1;
        border-top: 1px solid #dcdfe6;
        padding: 10px;
        .el-row {
          margin: 10px 0;
        }
      }
      .col-gaugeChart {
        width: 320px;
      }
      .col-bar {
        flex: 1;
        .el-row{
          display: flex;
          height: 180px;
        }
        .baritem-box{
          flex: 1;
          text-align: center;
        }
      }
      .col-chatrecord {
        width: 300px;
      }
    }
  }
}
</style>