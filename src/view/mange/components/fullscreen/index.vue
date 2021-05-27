<template>
  <div class="dialog-box">
    <el-steps :active="active" finish-status="success">
      <el-step title="下载模板"></el-step>
      <el-step title="上传EXCEL表"></el-step>
      <el-step title="选择工作薄"></el-step>
      <el-step title="导入预览"></el-step>
      <el-step title="导入完成"></el-step>
    </el-steps>
    <div>1、导入{{title}}模板:点击下载模板</div>
    <div>2、上传EXCEL表：</div>
  </div>
</template>
<script>
export default {
  name: "fullscreen",
  data() {
    return {
      fullScreenData: {},
      active: 0,
    };
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>