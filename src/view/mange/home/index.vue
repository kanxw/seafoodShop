<template>
  <div class="content-box">
    <el-row v-html="reminderData"></el-row>
    <el-row v-if="orderTotalData">
      <template v-for="(value, key) in orderTotalData">
        <el-row
          :key="key"
          v-if="value"
          type="flex"
          :gutter="10"
          class="margin-ten color-white"
        >
          <template v-for="(item, index) in value">
            <el-col
              :key="index"
              :class="{
                colorblack: item.backcolor == '#FFFFFF' || item.backcolor == '',
              }"
            >
              <el-row
                class="ordertotal-row-body-box border"
                :style="'background-color:' + item.backcolor"
              >
                <el-row>
                  <el-col :span="12">
                    <div class="margin-bottom-ten">{{ item.data1.text }}</div>
                    <div class="margin-bottom-ten">{{ item.data1.value }}</div>
                  </el-col>
                  <el-col :span="12" :class="{ textcenter: item.icon != '' }">
                    <template v-if="item.icon != ''">
                      <i :class="item.icon" class="font-size-forty"></i>
                    </template>
                    <template v-else>
                      <div class="margin-bottom-ten">{{ item.data2.text }}</div>
                      <div class="margin-bottom-ten">
                        {{ item.data2.value }}
                      </div>
                    </template>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="margin-bottom-ten">{{ item.data3.text }}</div>
                    <div>{{ item.data3.value }}</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="margin-bottom-ten">{{ item.data4.text }}</div>
                    <div>{{ item.data4.value }}</div>
                  </el-col>
                </el-row>
              </el-row>
            </el-col>
          </template>
        </el-row>
      </template>
    </el-row>
    <el-row type="flex" :gutter="10">
      <el-col v-for="item in chartData" :key="item.url" :span="6">
        <el-card
          class="display-flex height-full flex-direction-column"
          :body-style="{ padding: '0', height: '400px' }"
        >
          <div slot="header" class="display-flex">
            <span>{{ item.title }}</span>
            <el-button type="text" class="chartrow-details"
              >详情<i class="el-icon-arrow-right"></i
            ></el-button>
          </div>
          <rghxTableList
            v-if="item.type == '列表'"
            ref="table"
            :dataList="item.data"
          ></rghxTableList>
          <rghxEchartsPie
            v-if="item.type == '饼图'"
            :option="item.data"
          ></rghxEchartsPie>
          <rghxEchartsBar
            v-if="item.type == '柱状图'"
            :option="item.data"
          ></rghxEchartsBar>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card :body-style="{ padding: '0', height: '400px' }">
        <div slot="header" class="display-flex">
          <span>客户行为分析</span>
          <el-select v-model="columname">
            <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <rghxEchartsBar :option="orderStructData"></rghxEchartsBar>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import {
  getSystemCheck,
  getOrderTotal,
  getOrderTop10,
  getOrderStruct,
} from "@/api/mange/home";
import rghxOrderTotal from "./components/orderTotal";
import rghxTableList from "@/components/mange/table";
import rghxEchartsBar from "@/components/mange/echarts/bar";
import rghxEchartsPie from "@/components/mange/echarts/pie";

export default {
  name: "mangehome",
  data() {
    return {
      reminderData: "",
      orderTotalData: {},
      chartData: [],
      columname: '',
      selectData: [],
      orderStructData: {},
    };
  },
  methods: {
    async init() {
      await this.getData();
    },
    getData() {
      this.getOrderTotalData();
      this.getReminder();
      this.getOrderTop();
      this.changeColumn();
    },
    getOrderTotalData() {
      return getOrderTotal()
        .then((res) => {
          if (res.data.errormsg == "") {
            let data = res.data.data;
            let orderTotalData = {};
            data.forEach((item) => {
              let group = item.group;
              let array = Object.assign([], orderTotalData[group]);
              for (let key in item) {
                let val = item[key];
                if (val.includes("@")) {
                  let valArr = val.split("@");
                  let newVal = {
                    text: valArr[0],
                    value: valArr[1],
                  };
                  item[key] = newVal;
                }
              }

              array.push(item);
              orderTotalData[group] = array;
            });

            this.orderTotalData = orderTotalData;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getReminder() {
      return getSystemCheck()
        .then((res) => {
          if (res.data.errormsg == "") {
            this.reminderData = res.data.msg;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOrderTop() {
      return getOrderTop10()
        .then((res) => {
          console.log("这里是父组件数据处理");
          console.log(this.$refs.table);
          let layoutData = res.data;
          let dataList = Object.keys(layoutData).map((key) => {
            let thisData = layoutData[key];
            if (thisData && thisData.errormsg == "") {
              let dataArr = thisData.data;
              let infoArr = dataArr[0].Info.split("@");
              let type = infoArr[0];
              let title = infoArr[1];
              let url = infoArr[2];
              let data = {};
              switch (type) {
                case "列表":
                  data = this.tableDataUpdate(dataArr);
                  break;
                case "饼图":
                  data = this.pieDataUpdate(dataArr);
                  break;
                case "柱状图":
                  data = this.barDataUpdate(dataArr);
                  break;
              }

              return {
                type,
                title,
                url,
                data,
              };
            }
          });

          this.chartData = dataList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tableDataUpdate(data) {
      let head = Object.keys(data[0]).map((item) => {
        return {
          label: item,
          prop: item,
        };
      });
      head = head.filter((item) => {
        return item.label != "Info";
      });
      return {
        head,
        data,
      };
    },
    pieDataUpdate(data) {
      let seriesData = [];
      let keys = Object.keys(data[0]);
      let value = keys.filter((item) => {
        return item.includes("value");
      })[0];

      let name = keys.filter((item) => {
        return item.includes("key");
      })[0];

      data.forEach((item) => {
        let obj = {
          value: item[value],
          name: item[name],
        };
        seriesData.push(obj);
      });

      return { seriesData };
    },
    barDataUpdate(data) {
      let seriesData = [];
      let keys = Object.keys(data[0]);
      let value = keys.filter((item) => {
        return item.includes("value");
      })[0];

      let name = keys.filter((item) => {
        return item.includes("key");
      })[0];

      let nameArr = name.split("@");
      let valueArr = value.split("@");
      let legend = {
        data: [valueArr[0]],
      };

      let valArr = [];
      let yAxisData = [];
      data.forEach((item) => {
        valArr.push(item[value]);
        yAxisData.push(item[name]);
      });
      let xAxis = {
        type: "value",
        boundaryGap: [0, 0.01],
      };
      let yAxis = {
        type: "category",
        data: yAxisData.reverse(),
      };
      let obj = {
        name: nameArr[0],
        type: "bar",
        data: valArr.reverse(),
      };
      seriesData.push(obj);
      return { xAxis, yAxis, legend, seriesData };
    },
    changeColumn(){
      let columname = this.columname;
      return getOrderStruct(columname).then(res =>{
        let {data1, data2} = res.data;
        console.log(data1,data2)
        if(data1.errormsg == ''){
          this.orderStructData = this.orderStructUpdate(data1.data);
        }

        if(data2.errormsg == ''){
          let columname = this.columname;
          if(columname == ''){
            columname = data2.data[0].value;
          }

          this.selectData = data2.data;
        }

      })
      .catch(err =>{
        console.log(err);
      })
    },
    orderStructUpdate(data){
      let seriesData = [];
      let legendData = Object.keys(data[0]).filter(item =>{
        return item != 'ColumnName'
      });

      let legend = {
        data: legendData,
      };

      let xAxisData = [];
      let orderData = {};
      data.forEach((item) => {
        legendData.forEach(item2 =>{
          let orderDataArr = Object.assign([], orderData[item2]);
          orderDataArr.push(item[item2]);
          orderData[item2] = orderDataArr;
        })

        xAxisData.push(item.ColumnName);
      });
      let xAxis = {
        type: "category",
        data: xAxisData,
      };
      let yAxis = {
        type: "value",
      };
      for (let key in orderData){
        let obj = {
          name: key,
          type: "bar",
          data: orderData[key],
        };

        seriesData.push(obj);
      }

      return { xAxis, yAxis, legend, seriesData };
    },
  },
  created() {
    this.init();
  },
  beforeCreate() {
    console.log("这里是父组件创建之前");
  },
  beforeMount() {
    console.log("这里是父组件beforeMount");
  },
  mounted() {
    console.log("这里是父组件mounted");
  },
  components: { rghxOrderTotal, rghxTableList, rghxEchartsBar, rghxEchartsPie },
};
</script>
<style lang="scss" scoped>
.content-box {
  margin: 10px;
  padding: 10px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  overflow-y: auto;
  .ordertotal-row-body-box {
    padding: 20px;
    height: 100%;
  }
  .color-white {
    color: #fff;
  }
  .height-full {
    height: 100%;
  }
  .border {
    border: 1px solid #ebeef5;
    border-radius: 4px;
  }
  .margin-ten {
    margin: 10px;
  }
  .colorblack {
    color: black;
  }
  .margin-bottom-ten {
    margin-bottom: 10px;
  }
  .font-size-forty {
    font-size: 40px;
  }
  .textcenter {
    text-align: center;
  }
  /deep/ .el-card__header {
    padding: 10px;
    .chartrow-details {
      padding: 0;
      margin-left: auto;
    }
  }
  .display-flex {
    display: flex;
  }
  .flex-direction-column {
    flex-direction: column;
  }
  /deep/.el-card__body {
    padding: 0;
    flex: 1;
  }
}
</style>