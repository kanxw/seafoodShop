<template>
  <div class="content-box">
    <div class="head-box">
      <el-button-group>
        <el-button icon="el-icon-download" type="primary" size="mini"
          >导入配置</el-button
        >
        <el-button icon="el-icon-upload2" type="primary" size="mini"
          >导出配置</el-button
        >
        <el-button icon="el-icon-folder" type="primary" size="mini"
          >保存</el-button
        >
        <el-button icon="el-icon-refresh" type="primary" size="mini"
          >刷新</el-button
        >
      </el-button-group>
      <el-tooltip disabled>
        <el-button type="text" icon="el-icon-delete">数据初始化</el-button>
      </el-tooltip>
      <el-tooltip disabled>
        <el-button type="text" icon="el-icon-menu" @click="viewWxQrCode">查看小程序码</el-button>
      </el-tooltip>
      <el-tooltip>
        <div slot="content"><span v-html="authorize"></span></div>
        <el-button type="text" icon="el-icon-key" @click="systemAuthorization">系统授权</el-button>
      </el-tooltip>
      <el-select
        v-model="seachActive"
        placeholder="搜索系统配置"
        size="mini"
        @change="seachChange"
      >
        <el-option
          v-for="item in seachData"
          :label="item.ConfigCode"
          :value="item.value"
          :key="item.ConfigCode"
        ></el-option>
      </el-select>
    </div>
    <div class="content-body">
      <el-tabs v-model="activeName" type="card" class="tabs-box">
        <el-tab-pane
          v-for="(value, key) in configData"
          :key="key"
          :label="key"
          :name="key"
        >
          <el-form>
            <template v-if="value.type">
              <el-form-item
                v-for="item in value.value"
                class="item-box"
                :key="item.ConfigCode"
                size="mini"
                :label="item.ConfigRemark"
                :class="item.ConfigCode"
              >
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-select
                      v-if="item.DataType == 'select'"
                      v-model="formData"
                    >
                      <el-option
                        v-for="item2 in item.Data"
                        :key="item2.value"
                        :label="item2.label"
                        :value="item2.value"
                      >
                      </el-option>
                    </el-select>
                    <el-input
                      v-else-if="item.DataType == 'text'"
                      type="text"
                      v-model="item.ConfigDesc"
                    ></el-input>
                    <el-switch
                      v-else-if="item.DataType == 'checkbox'"
                      v-model="item.ConfigDesc"
                      active-value="1"
                      inactive-value="0"
                    ></el-switch>
                    <el-input
                      v-else-if="item.DataType == 'number'"
                      type="number"
                      v-model="item.ConfigDesc"
                    ></el-input>
                  </el-col>
                  <el-col :span="12" v-if="item.Help != ''" class="help-box">
                    <i class="el-icon-warning icon-color"></i>
                    <span>{{ item.Help }}</span>
                  </el-col>
                </el-row>
              </el-form-item>
            </template>
            <template v-else>
              <rghxSettingTable
                :tableHead="value.tableHead"
                :tableData="value.tableData"
              ></rghxSettingTable>
            </template>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { getPublicConfig, getAuthorize, getWxQrCode } from "@/api/mange/system/setting";
import { getPrintLayout } from "@/api/mange/print";
import rghxClientSelect from "@/components/mange/clientSelect";
import rghxSettingTable from "./components/table";

export default {
  name: "setting",
  data() {
    return {
      configData: {},
      pageData: {},
      seachData: [],
      activeName: "",
      seachActive: "",
      formData: {},
      aliasTableHead: {}, //别名表头数据
      tableHead: {}, //测试表头数据
      tableData: {}, //测试表格数据
      isShowTable: true, //是否显示表格
      authorize: '',
    };
  },
  methods: {
    async init() {
      await this.getLayoutData();
      await this.getAuthorize();
    },
    getLayoutData() {
      return getPublicConfig()
        .then((res) => {
          if (res.data.errormsg == "") {
            let { data1, ...pageData } = res.data;
            let data = {};
            let seachData = [];
            this.activeName = data1[0].Group;

            //系统配置
            data1.forEach((item) => {
              let groupName = item.Group;
              let seachItemData = {
                configCode: item.ConfigCode,
                value: groupName + "-" + item.ConfigRemark,
              };
              data[groupName] = data[groupName] ? data[groupName] : {};
              let groupData = data[groupName];
              groupData.value = groupData.value ? groupData.value : [];
              groupData.type = groupData.type ? groupData.type : "other";
              let value = groupData.value;
              let itemData = item.Data;
              let newItemData = [];
              if (item.DataType == "select") {
                let dataArr = itemData.split("|");
                dataArr.forEach((item2) => {
                  let itemData2 = item2.split("@");
                  newItemData.push({
                    label: itemData2[1],
                    value: itemData2[0],
                  });
                });

                item.Data = newItemData;
              }

              value.push(item);
              seachData.push(seachItemData);
            });

            //别名
            //添加自定义tab选项
            this.pageData = pageData;
            let tabArray = [
              "别名设置",
              "高级分析",
              "下单规则",
              "菜单配置",
              "定制导入",
              "自定义尺码头",
              "自定义首页",
            ];
            tabArray.forEach((item) => {
              data[item] = {};
              let { tableHead, tableData } = this.dataUpdat(item);
              data[item].tableData = tableData;
              data[item].tableHead = tableHead;
            });

            this.configData = data;
            this.seachData = seachData;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //别名
    aliasDataHandle(data) {
      let aliasTableHead = {};
      let aliasTableData = {};
      let headValue = [
        {
          label: "属性名",
          width: 200,
          prop: "NounName",
        },
        {
          label: "自定义名称",
          width: 200,
          prop: "CustomName",
          slottype: "input",
        },
      ];

      data.forEach((item) => {
        let group = item.Group;
        aliasTableData[group] = aliasTableData[group]
          ? aliasTableData[group]
          : [];
        aliasTableHead[group] = aliasTableHead[group]
          ? aliasTableHead[group]
          : headValue;
        let groupData = aliasTableData[group];
        groupData.push(item);
      });

      // return { aliasTableHead, aliasTableData };
      return { tableHead: aliasTableHead, tableData: aliasTableData };
    },
    //高级分析
    seniorAnalysisDataHandle(data) {
      let tableHead = {};
      let tableData = {};
      let headValue = [
        {
          label: "序号",
          width: 80,
          prop: "num",
          slottype: "input",
        },
        {
          label: "报表名称",
          width: 200,
          prop: "reportname",
          slottype: "input",
          disabled: true,
        },
        {
          label: "存储过程",
          width: 250,
          prop: "proc",
          slottype: "input",
          inputType: "text",
        },
        {
          label: "开放级别",
          width: 200,
          prop: "reportdata",
          slottype: "select",
          value: "reportlevel",
        },
        {
          label: "冻结列",
          width: 70,
          prop: "fixnum",
          slottype: "input",
        },
        {
          label: "是否显示",
          width: 80,
          prop: "isshow",
          slottype: "switch",
        },
        {
          label: "操作",
          width: 50,
          prop: "",
          slottype: "button",
        },
      ];

      let reportdata = [
        { label: "0-对所有人开放", value: "0-对所有人开放" },
        { label: "1-只对订货商开放", value: "1-只对订货商开放" },
        { label: "2-只对管理员开放", value: "2-只对管理员开放" },
      ];
      data.forEach((item) => {
        item.reportdata = reportdata;
      });

      tableHead.seniorAnalysis = headValue;
      tableData.seniorAnalysis = data;
      return { tableHead, tableData };
    },
    //下单规则
    orderRuleHandle(data) {
      let tableHead = {};
      let tableData = {};
      let newArray = [];
      let headValue = [
        {
          label: "字段名",
          width: 200,
          prop: "column_data",
          value: "columnname",
          slottype: "select",
        },
        {
          label: "操作符",
          width: 250,
          prop: "operatorData",
          value: "operate",
          slottype: "select",
        },
        {
          label: "字段值",
          width: 200,
          prop: "columnvalue",
          slottype: "input",
        },
        {
          label: "限制类型",
          width: 250,
          prop: "limit_Data",
          value: "limittype",
          slottype: "select",
        },
        {
          label: "限制参数",
          width: 200,
          prop: "parameter",
          slottype: "input",
        },
        {
          label: "是否启用",
          width: 100,
          prop: "isenable",
          slottype: "switch",
        },
        {
          label: "操作",
          width: 100,
          prop: "",
          slottype: "button",
        },
      ];
      let operatorData = [
        { label: "包含", value: "like" },
        { label: "等于", value: "=" },
        { label: "不等于", value: "<>" },
      ];
      data.forEach((item) => {
        let selectData = item.column_data.split("|");
        let array = [];
        selectData.forEach((item2) => {
          let itemArr = item2.split("@");
          array.push({
            label: itemArr[1],
            value: itemArr[0],
          });
        });

        item.column_data = array;
        item.operatorData = operatorData;
        newArray.push(item);
      });

      tableHead.data5 = headValue;
      tableData.data5 = newArray;
      return { tableHead, tableData };
    },
    //菜单配置
    menuConfigHandle(data) {
      let tableHead = {};
      let tableData = {};
      let headValue = [
        {
          label: "所属模块",
          width: 100,
          prop: "group",
          slottype: "input",
          disabled: true,
        },
        {
          label: "功能",
          width: 100,
          prop: "menu",
          slottype: "input",
          disabled: true,
        },
        {
          label: "排序",
          width: 100,
          prop: "sort",
          slottype: "input",
        },
        {
          label: "是否显示",
          width: 100,
          prop: "isshow",
          slottype: "switch",
        },
        {
          label: "条件",
          width: 250,
          prop: "where",
          slottype: "input",
        },
        {
          label: "操作",
          width: 100,
          prop: "",
          slottype: "button",
        },
        {
          label: "提示",
          width: 300,
          prop: "tips",
          slottype: "input",
        },
      ];

      tableHead.data6 = headValue;
      tableData.data6 = data;
      return { tableHead, tableData };
    },
    //定制导入
    madeImportHandle(data) {
      let tableHead = {};
      let tableData = {};
      return { tableHead, tableData };
    },
    //自定义尺码头
    customSizeTableHeadHandle(data) {
      let tableHead = {};
      let tableData = {};
      let headValue = [
        {
          label: "序号",
          width: 100,
          prop: "Seq",
          slottype: "input",
        },
      ];
      for (let i = 1; i < 31; i++) {
        let headValueItem = {
          label: "尺码" + i,
          width: 100,
          prop: "Size" + i,
          slottype: "input",
        };

        headValue.push(headValueItem);
      }

      let btnData = {
        label: "操作",
        width: 100,
        prop: "",
        slottype: "button",
      };
      headValue.push(btnData);
      tableHead.data4 = headValue;
      tableData.data4 = data;
      return { tableHead, tableData };
    },
    //自定义首页
    customHomeHandle(data) {
      let tableHead = {};
      let tableData = {};
      return { tableHead, tableData };
    },
    dataUpdat(name) {
      let data = {};
      let {
        data2,
        data3,
        data4,
        data5,
        data6,
        data7,
        data8,
        data9,
      } = this.pageData;
      switch (name) {
        case "别名设置": {
          data = this.aliasDataHandle(data2);
          break;
        }
        case "高级分析": {
          data = this.seniorAnalysisDataHandle(data3);
          break;
        }
        case "下单规则": {
          data = this.orderRuleHandle(data5);
          break;
        }
        case "菜单配置": {
          data = this.menuConfigHandle(data6);
          break;
        }
        case "定制导入": {
          data = this.madeImportHandle(data3);
          break;
        }
        case "自定义尺码头": {
          data = this.customSizeTableHeadHandle(data4);
          break;
        }
        case "自定义首页": {
          data = this.customHomeHandle(data9);
          break;
        }
        default: {
          break;
        }
      }

      return data;
    },
    seachChange(val) {
      console.log(val);
      if (val == "") {
        return;
      }

      let configData = this.configData;
      let tabActive = this.activeName;
      let valArr = val.split("-");
      let group = valArr[0];
      let remark = valArr[1];
      let seachData = configData[group].value;
      let activeData = seachData.filter((item) => {
        return item.ConfigRemark == remark;
      });
      
      if (activeData.length > 0) {
        let className = activeData[0].ConfigCode;
        let e = document.getElementsByClassName(className)[0];
        if (group != tabActive) {
          tabActive = group;
        }

        //滑动高度
        let eltabscontent = document.getElementsByClassName('el-tabs__content')[1];
        eltabscontent.scrollTop = e.offsetTop - 7;

        //高亮显示
        e.className = e.className + " selected";
        setTimeout(() =>{
          e.className = e.className.replace('selected', '')
        }, 1000)

        this.seachActive = '';
      }
    },
    systemAuthorization(){
      getWxQrCode
    },
    //获取授权
    getAuthorize(){
      let authorize = this.authorize;
      if(authorize != ''){
        return
      }

      getAuthorize().then(res =>{
        if(res.data.errormsg == ''){
          this.authorize = res.data.msg;
        }
      })
      .catch(err =>{
        console.log(err)
      })
    },
    //小程序码
    viewWxQrCode(){
      getWxQrCode().then(res =>{
        console.log(res)
      })
      .catch(err =>{
        console.log(err)
      })

    },
  },
  computed: {},
  created() {
    this.init();
  },
  components: {
    rghxSettingTable,
  },
};
</script>
<style lang="scss" scoped>
.content-box {
  margin: 10px;
  width: calc(100% - 20px);
  padding: 10px;
  box-sizing: border-box;
  .content-body {
    overflow: hidden;
    .item-box {
      display: flex;
      /deep/.el-form-item__label {
        width: 300px;
      }
      /deep/ .el-form-item__content {
        flex: 1;
      }
      .el-select {
        width: 100%;
      }
      .icon-color {
        color: #409eff;
      }
    }
    .selected {
      background-color: #f56c6c;
    }
    /deep/.el-tabs__content {
      overflow: auto;
    }
    .tabs-box {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
    }
    .help-box {
      font-size: 12px;
    }
  }
}
</style>