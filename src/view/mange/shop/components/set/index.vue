<template>
  <el-dialog :visible.sync="isShow" :title="title">
    <span v-html="html" class="headtitle"></span>
    <el-form>
      <template v-if="type == 'edit'">
        <template v-for="(item, index) in formData">
          <el-row :key="index">
            <el-form-item :label="item.name" size="small">
              <el-input
                v-model="item.value"
                type="text"
                maxlength="10"
                show-word-limit
                @input="inputVerification"
              ></el-input>
            </el-form-item>
          </el-row>
        </template>
      </template>
      <template v-else>
        <el-form-item :label="clientLevel" class="copyitem">
          <rghxclientSelect ref="clientSelect"></rghxclientSelect>
        </el-form-item>
      </template>
    </el-form>
    <span slot="footer">
      <el-button size="small" @click="isShow = false">取消</el-button>
      <el-button size="small" type="primary">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import rghxclientSelect from "@/components/mange/clientSelect";

export default {
  name: "set",
  data() {
    return {
      isShow: false,
      title: "",
      html: "",
      type: "copy",
      formData: [],
      clientLevel: "",
    };
  },
  props: {},
  methods: {
    show(option) {
      let { type, row } = option;
      console.log(row);
      let clientLevel = option.clientLevel == 0 ? "店铺" : "总代";
      let pagetype = option.pagetype == 0 ? "指标" : "折扣";
      this.title = type + clientLevel + pagetype;
      if (type == "编辑") {
        this.type = "edit";
        this.html =
          type +
          "【" +
          row[`${clientLevel}名称`] +
          "】" +
          pagetype +
          "类别为【" +
          row[`${pagetype}类别`] +
          "】的" +
          pagetype;
      } else {
        this.type = "copy";
        this.html =
          type +
          "【" +
          row[`${clientLevel}名称`] +
          "】的" +
          pagetype +
          "，到选择的" +
          clientLevel;
        this.$nextTick(() => {
          this.$refs.clientSelect.show(option.clientLevel);
        });
      }

      let filterName = ["一口价", "折扣", "指标量", "指标额", "款数", "款色数"];
      let formData = [];
      for (let key in row) {
        if (filterName.includes(key)) {
          let item = {
            name: key,
            value: row[key],
          };

          formData.push(item);
        }
      }

      this.formData = formData;
      this.clientLevel = clientLevel;
      this.isShow = true;
    },
    inputVerification(val) {
      console.log(val);
    },
  },
  components: {
    rghxclientSelect,
  },
};
</script>
<style lang="scss" scoped>
.el-form-item {
  white-space: nowrap;
}
.headtitle {
  display: block;
  margin-bottom: 20px;
}

.copyitem {
  display: flex;
  /deep/.el-form-item__content {
    flex: 1;
  }
}
</style>