<template>
  <el-dialog title="批量设置折扣" :visible.sync="isShow">
    <el-form>
      <!-- <el-row> -->
       <el-form-item label="源店铺" size="small">
        <rghxClientSelect ref="sourceClientSelect"></rghxClientSelect>
      </el-form-item>
      <!-- </el-row>
      <el-row> -->
      <el-form-item label="目标店铺" size="small">
        <rghxClientSelect ref="targetClientSelect"></rghxClientSelect>
      </el-form-item>
      <!-- </el-row>
      <el-row> -->
      <el-form-item label="复制类型" size="small">
        <el-radio-group v-model="radio">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">类别折扣</el-radio>
          <el-radio :label="2">按款折扣、定价</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- </el-row> -->
    </el-form>
    <span slot="footer">
      <el-button size="small" @click="dialogCancel">取消</el-button>
      <el-button type="primary" size="small">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import rghxClientSelect from "@/components/mange/clientSelect";

export default {
  name: "batchCopy",
  data() {
    return {
      radio: 0,
      isShow: false,
      fromData: {},
    };
  },
  props: {},
  methods: {
    show(val) {
      let { row, clientLevel } = val;
      this.$nextTick(() => {
        this.$refs.sourceClientSelect.show({ clientLevel, row });
        this.$refs.targetClientSelect.show({ clientLevel, row });
      });

      this.isShow = true;
    },
    dialogCancel() {
      Object.assign(this.$data, this.$options.data());
    },
  },
  components: {
    rghxClientSelect,
  },
};
</script>