<template>
  <el-dialog
    :title="dialogData.title"
    :visible.sync="dialogVisible"
    append-to-body
  >
    <div class="tipsContent-box" v-if="dialogData.tips">
      <i :class="dialogData.tips.icon"></i>
      <!-- <i class="iconColor el-icon-warning"></i> -->
      <div class="tipsContent" v-html="dialogData.tips['content']"></div>
    </div>
    <el-input
      v-if="dialogData.input"
      :placeholder="dialogData.input['placeholder']"
      v-model="dialogData.input['default']"
      :type="dialogData.input['type']"
      :maxlength="dialogData.input['maxlength']"
      :minlength="dialogData.input['minlength']"
      :clearable="dialogData.input['clearable']"
      :disabled="dialogData.input['disabled']"
      :size="dialogData.input['size']"
      style="margin-top: 20px"
    ></el-input>
    <span slot="footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="determine">确定</el-button></span
    >
  </el-dialog>
</template>
<script>
export default {
  name: "simpleDialog",
  props: {},
  data() {
    return {
      dialogVisible: false,
      tipscontent: "",
      title: "提示",
      isShowTipsLogo: false,
      dialogData: {},
    };
  },
  methods: {
    show(option) {
      this.dialogData = option;
      this.dialogVisible = true;
    },
    determine(){
      this.dialogVisible = false;
      this.$parent.dialogUpdate(this.dialogData);
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.tipsContent-box {
  display: flex;
  .iconColor {
    color: #e6a23c;
    font-size: 24px;
    margin: auto 0;
  }
  .tipsContent {
    margin-left: 10px;
    line-height: 24px;
  }
}
</style>