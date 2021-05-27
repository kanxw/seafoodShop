<template>
  <el-dialog
    :title="dialogdata.title"
    :visible.sync="dialogVisible"
    :width="dialogdata.width"
    :fullscreen="dialogdata.fullscreen"
    append-to-body
    lock-scroll
    :center="dialogdata.center"
  >
    <template v-if="dialogdata.type == 'text'">
      <span
        ><i class="el-icon-warning iconColor"></i
        >{{ dialogdata.data.content }}</span
      >
    </template>
    <template v-else-if="dialogdata.type == 'collapse'">
      <el-form v-model="dialogFromData">
        <el-collapse v-model="dialogTypeData.activeName">
          <template v-for="(value, key) in dialogTypeData.data">
            <el-collapse-item
              :title="key == 'main' ? '基础数据' : '更多数据'"
              :key="key"
              :name="key"
            >
              <template v-for="(item, index) in value">
                <el-form-item :key="index" size="mini">
                  <rghxcollapse
                    :class="
                      item['columnname'] === 'Reserve1' ? 'columnflex' : ''
                    "
                    :item="item"
                    v-model.trim="dialogFromData[item.columnname]"
                  ></rghxcollapse>
                </el-form-item>
              </template>
            </el-collapse-item>
          </template>
        </el-collapse>
      </el-form>
    </template>
    <template v-else-if="dialogdata.type == 'fullscreen'">
      <rghxfullScreen></rghxfullScreen>
    </template>
    <span
      v-if="dialogdata.footshow"
      slot="footer"
      class="dialog-footer textaling"
    >
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="dialogdetermine">{{
        bottomBtntText
      }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import rghxcollapse from "../collapse";
import rghxfullScreen from "../fullscreen"

export default {
  name: "shopdialog",
  props: {
    dialogdata: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogTypeData: {},
      bottomBtntText: "确 定",
      dialogFromData: {},
    };
  },
  methods: {
    dialogdetermine() {
      this.$emit("dialogdetermine");
    },
    dialogDataUpdate(option, type) {
      let { data1, data2 } = option.data;
      let main = [],
        detail = [],
        fromdata = {};
      if (data1) {
        for (let value of data1) {
          for (let key in value) {
            if (value[key].indexOf("|") > -1) {
              let valueArray = [];
              let dataArray = value[key].split("|");
              for (let value2 of dataArray) {
                let value2Array = value2.split("@");
                valueArray.push({
                  label: value2Array[1],
                  value: value2Array[0],
                });
              }

              value[key] = valueArray;
            } else if (key == "readonly") {
              value[key] = value[key] == "1" && type == "edit" ? true : false;
            }
          }

          fromdata[value.columnname] = "";
          value.Group == "main" ? main.push(value) : detail.push(value);
        }

        this.dialogFromData = fromdata;
        this.dialogTypeData.data = { main, detail };
        this.dialogTypeData.activeName = ["main"];
        this.bottomBtntText = "保 存";
        if (data2) {
          data2[0]["ParentCode"] = data2[0]["ParentCode"].split("|").reverse();
          data2[0]["Reserve1"] = data2[0]["Reserve1"].split(",");
          this.dialogFromData = Object.assign(this.dialogFromData, data2[0]);
        }
      }

      this.dialogShow();
    },
    dialogShow() {
      this.dialogVisible = true;
    },
  },
  components: {
    rghxcollapse,
    rghxfullScreen,
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__body {
  padding: 10px 20px;
  .iconColor {
    color: #e6a23c;
    font-size: 24px;
    vertical-align: sub;
    margin-right: 5px;
  }
  .el-form-item {
    display: inline-block;
    width: 50%;
    margin-bottom: 18px;
    .columnflex {
      flex-direction: column;
    }
    .el-form-item__content {
      line-height: 28px;
    }
    .el-cascader {
      line-height: 28px;
    }
  }
}
/deep/.el-dialog__footer {
  text-align: right;
}
</style>