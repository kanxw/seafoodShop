<template>
  <div class="content-box">
    <el-tabs type="card">
      <el-tab-pane label="自定义格式"></el-tab-pane>
    </el-tabs>
    <el-row>
      <span class="left-divider">1、选择导出格式</span>
      <el-form>
        <template v-for="(value, key) in fieldItems">
          <el-form-item size="mini" :key="key" :label="key">
            <el-checkbox-group v-model="test">
              <el-checkbox
                v-for="item in fieldItems[key]"
                :key="item.NounCode"
                :label="item.NounName"
                border
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <div>
          <el-form-item size="mini" label="自定义组合列">
            <span>仅限选择一维尺码格式使用</span>
            <el-checkbox-group v-model="test">
              <template v-for="(item, index) in customCompose">
                <el-checkbox
                  class="labelCustomCompose"
                  :key="index"
                  :label="item.NounName"
                  border
                >
                </el-checkbox>
                <el-button
                  icon="el-icon-delete"
                  :key="item.NounCode"
                  class="deleteCustomCompose"
                ></el-button>
              </template>
              <el-button icon="el-icon-plus"></el-button>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <el-form-item size="mini" label="导出字段">
          <span>可删除或移动排序</span>
          <div class="field-box">
            <el-tag
              v-for="(item, index) in exportField"
              :key="index"
              closable
              >{{ item }}</el-tag
            >
          </div>
        </el-form-item>
        <div>
          <el-form-item size="mini" label="选择模板">
            <el-select
              v-model="templateDataValue"
              placeholder="请选择模板(可以不选)"
            >
              <el-option
                v-for="(item, index) in templateData"
                :key="index"
                :label="item.LayoutName"
                :value="index.LayoutName"
              ></el-option>
            </el-select>
            <el-button type="primary">保存模板</el-button>
          </el-form-item>
        </div>
        <div>
          <el-form-item size="mini" label="引用第三方表头">
            <el-select
              v-model="thirdPartyTempValue"
              placeholder="请选择模板(可以不选)"
            >
              <el-option
                v-for="(item, index) in thirdPartyTemp"
                :key="index"
                :label="item"
                :value="index"
              ></el-option>
            </el-select>
            <el-button type="primary">上传表头</el-button>
          </el-form-item>
          <el-form-item class="formitem" label="ERP尺码长度" size="mini">
            <el-input
              v-model="thirdPartyErpSizeLength"
              :disabled="thirdPartyTempValue == ''"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item class="formitem" label="从第几行写数据" size="mini">
            <el-input
              v-model="thirdPartyErpSizeLength"
              :disabled="thirdPartyTempValue == ''"
              type="number"
            ></el-input>
            <i class="el-icon-info iconColor"></i>
            <span>0表示不控制</span>
          </el-form-item>
        </div>
      </el-form>
    </el-row>
    <el-row>
      <span class="left-divider">2、筛选条件</span>
      <el-form>
        <el-form-item size="mini" label="汇总方式">
          <el-radio-group v-model="formData.totalType">
            <template v-for="item in radioData">
              <el-radio
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="mini">
          <rghxClientSelect ref="clientSelect"></rghxClientSelect>
        </el-form-item>
        <div>
          <el-form-item size="mini" label="按">
            <el-select>
              <template v-for="item in splitOrderType">
                <el-option
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-if="item.value"
                ></el-option>
              </template>
            </el-select>
            <span>拆单</span>
          </el-form-item>
          <el-form-item size="mini" label="合并Excel">
            <el-switch v-model="test2"></el-switch>
          </el-form-item>
          <el-form-item size="mini" label="尺码一维格式">
            <el-switch v-model="test2"></el-switch>
          </el-form-item>
          <el-form-item size="mini" label="显示汇总合计">
            <el-switch v-model="test2"></el-switch>
          </el-form-item>
          <el-form-item size="mini" label="使用总代折扣">
            <el-switch v-model="test2"></el-switch>
          </el-form-item>
          <el-form-item size="mini" label="导出">
            <el-select>
              <el-option label="有效款" value="0"></el-option>
              <el-option label="取消款" value="1"></el-option>
              <el-option label="全部款" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item size="mini" label="订货时间">
          <el-date-picker
            v-model="orderTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <span class="left-divider">3、确认导出</span>
      <div style="margin:20px 0;text-align: center">
        <el-button type="primary" size="small">立即导出</el-button>
        <el-checkbox label="导出前是否先预览数据" v-model="isPreviewOrder"></el-checkbox>
      </div>
    </el-row>
  </div>
</template>
<script>
import {
  getLayoutData,
  getListData,
  getERPOrderTemplate,
} from "@/api/mange/order/erpExport";
import { getPrintLayout } from "@/api/mange/print";
import rghxClientSelect from "@/components/mange/clientSelect";

export default {
  name: "erpExport",
  data() {
    return {
      formData: {},
      fieldItems: {},
      fieldData: {},
      test: [],
      test2: false,
      thirdPartyTemp: [],
      templateData: [],
      thirdPartyTempValue: "",
      templateDataValue: "",
      thirdPartyErpSizeLength: 0,
      customCompose: [],
      exportField: [],
      splitOrderType: [],
      orderTime: '',
      isPreviewOrder: true,
      radioData: [
        {
          label: "按店铺汇总",
          value: 0,
        },
        {
          label: "按经销商汇总",
          value: 1,
        },
        {
          label: "按总代汇总",
          value: 2,
        },
        {
          label: "按大区汇总",
          value: 3,
        },
        {
          label: "按总部汇总",
          value: 4,
        },
      ],
    };
  },
  methods: {
    async init() {
      await this.getLayoutData();
      await this.getERPOrderTemplate();
      await this.getPrintLayout();
    },
    getLayoutData() {
      return getLayoutData()
        .then((res) => {
          if (res.data.errormsg == "") {
            let { data3, data4, query } = res.data.data;
            let dataArray = data3[0].ExportCol.split("|");
            let dataArray2 = data4[0].splitfield.split("|");
            let exportFieldValue = data3[0].defaultvalue.split(",");
            let fieldItems = {};
            let fieldData = {};
            let exportField = [];
            let splitOrderType = [];
            dataArray.forEach((item) => {
              let itemArr = item.split("@");
              let key = itemArr[2];
              if (!fieldItems[key]) {
                fieldItems[key] = [];
              }
              let group = fieldItems[key];
              group = group.push({
                NounCode: itemArr[0],
                NounName: itemArr[1],
                Field: itemArr[3],
              });

              fieldData[itemArr[0]] = itemArr[1];
            });

            dataArray2.forEach((item) => {
              let itemArr = item.split("@");
              splitOrderType.push({
                label: itemArr[1],
                value: itemArr[0],
              });
            });

            exportFieldValue.forEach((item) => {
              exportField.push(fieldData[item]);
            });
            let option = {
              clientLevel: 0,
            };

            this.$refs.clientSelect.show(option);
            this.splitOrderType = splitOrderType;
            this.exportField = exportField;
            this.fieldData = fieldData;
            this.fieldItems = fieldItems;
          }
        })
        .catch((err) => {
          console.log(err, "this is err");
        });
    },
    getERPOrderTemplate() {
      return getERPOrderTemplate()
        .then((res) => {
          if (res.data.errormsg == "") {
            this.thirdPartyTemp = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPrintLayout() {
      let option = {
        ReportName: "erp订单导出",
        LayoutName: "",
      };
      return getPrintLayout(option)
        .then((res) => {
          if (res.data.errormsg == "") {
            this.templateData = res.data.data.filter((item) => {
              return item.LayoutName != "erp订单导出-组合字段";
            });
            let customComposeData = res.data.data.filter((item) => {
              return item.LayoutName == "erp订单导出-组合字段";
            });

            this.customCompose = JSON.parse(customComposeData[0].ContractStyle);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.init();
  },
  components: {
    rghxClientSelect,
  },
};
</script>
<style lang="scss" scoped>
.content-box {
  margin: 10px;
  width: calc(100% - 20px);
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  .el-row {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    position: relative;
    margin-top: 15px;
    .el-form {
      padding: 10px;
    }
    .left-divider {
      font-size: 14px;
      position: absolute;
      left: 20px;
      transform: translateY(-50%);
      background-color: #fff;
      padding: 0 10px;
    }
    /deep/.el-form-item__label {
      font-size: 12px;
      width: 100px;
    }
    /deep/.el-form-item__content {
      width: calc(100% - 100px);
    }
    .el-checkbox {
      margin: 0;
      margin-right: 10px;
    }
    .el-form-item {
      margin-top: 10px;
      margin-left: 5px;
    }
    .formitem {
      width: 200px;
      vertical-align: top;
    }
    .iconColor {
      color: rgb(245, 108, 108);
    }
    .deleteCustomCompose {
      padding: 7px 5px;
      transform: translateX(-5px);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      margin-right: 10px;
    }
    .labelCustomCompose {
      margin-right: 0;
      vertical-align: sub;
    }
    .field-box {
      min-height: 90px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding-top: 10px;
      padding-left: 10px;
      background-color: #f0f0f0;
    }
  }
}
</style>