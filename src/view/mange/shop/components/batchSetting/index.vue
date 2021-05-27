<template>
  <el-dialog :title="title" :visible.sync="isShow" width="800px">
    <el-form>
      <el-row>
          <rghxclientSelect ref="clientSelect"></rghxclientSelect>
      </el-row>
      <el-form-item label="指标类别" size="small">
        <el-row v-for="(item, index) in setData" :key="index">
          <el-checkbox :label="item.label" v-model="item.checked">
            <span class="checktitle">{{ item.name }}</span>
            <el-tooltip :content="placeholder1">
              <el-input
                :placeholder="placeholder1"
                :disabled="!item.checked"
              ></el-input
            ></el-tooltip>
            <el-tooltip :content="placeholder2" v-if="isPlaceholder2Show">
              <el-input
                :placeholder="placeholder2"
                :disabled="!item.checked"
              ></el-input
            ></el-tooltip>
          </el-checkbox>
        </el-row>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button size="small" @click="dialogCancel">取消</el-button>
      <el-button size="small" type="primary">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { GetDropDownList } from "@/api/mange/shop/publicMethod";
import rghxclientSelect from "@/components/mange/clientSelect";

export default {
  name: "batchSetting",
  data() {
    return {
      isShow: false,
      title: "",
      setData: [],
      placeholder1: "",
      placeholder2: "",
      isPlaceholder2Show: true,
    };
  },
  props: {},
  methods: {
    show(val) {
      let { type, row, clientLevel } = val;
      let colcodes = "TargetAmountSort";
      if (type == 0) {
        this.title = "批量设置指标";
        if (val.tabindex == 0) {
          this.placeholder1 = "请输入指标量";
          this.placeholder2 = "请输入指标额";
        } else {
          this.placeholder1 = "请输入款数";
          this.placeholder2 = "请输入款色数";
        }
      } else {
        this.placeholder1 = "请输入折扣";
        this.title = "批量设置折扣";
        colcodes = "discountsort";
        this.isPlaceholder2Show = false;
      }

      let params = {
        colcodes,
      };

      GetDropDownList(params)
        .then((res) => {
          let data = res.data.data[0];
          let dataArray = data.data.split("|");
          let setData = [];
          dataArray.forEach((val) => {
            let thisArray = val.split("@");
            let item = {
              label: thisArray[0],
              name: thisArray[1],
              checked: false,
            };
            setData.push(item);
          });
          this.setData = setData;
          this.isShow = true;
          this.$nextTick(() => {
            this.$refs.clientSelect.show({ clientLevel, row });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dialogCancel() {
      Object.assign(this.$data, this.$options.data());
      this.$refs.clientSelect.valueClear();
    },
  },
  components: {
    rghxclientSelect,
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-form {
  overflow: auto;
  white-space: nowrap;
  .el-form-item__label {
    width: 80px;
    text-align: right;
  }
  .el-form-item__content {
    margin-left: 80px;
    .el-tooltip {
      width: auto;
    }
    .checktitle {
      display: inline-block;
      width: 60px;
      margin-right: 10px;
    }
    .el-row {
      margin-bottom: 10px;
    }
  }
}
</style>