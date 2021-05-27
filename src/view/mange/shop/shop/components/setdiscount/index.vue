<template>
  <el-dialog
    title="提示"
    width="30%"
    append-to-body
    lock-scroll
    :show-close="false"
    :visible.sync="dialogVisible"
  >
    <span>这是设置折扣页面</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogIsVisible">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "setdiscount",
  props: {},
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    dialogIsVisible() {
      console.log(this.dialogVisible, 'this is setdiscount')

      this.dialogVisible = !this.dialogVisible;
    },

  },
    mounted(){
    // this.$emit('dialogShow');
    console.log('加载完成')
    this.dialogVisible = true;
  }
};
</script>