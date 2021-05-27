<template>
  <el-dialog
    :title="'导入' + title"
    :fullscreen="fullscreen"
    :visible.sync="isShow"
    center
    append-to-body
    lock-scroll
    :show-close="false"
  >
    <el-steps :active="active" finish-status="success">
      <el-step title="下载模板"></el-step>
      <el-step title="上传EXCEL表"></el-step>
      <el-step title="选择工作薄"></el-step>
      <el-step title="导入预览"></el-step>
      <el-step title="导入完成"></el-step>
    </el-steps>
    <div class="course-box">
      <el-row
        ><span class="tipstext1">1、导入店铺资料模板：</span
        ><el-link type="primary">点击下载模板</el-link></el-row
      >
      <el-row
        ><span class="tipstext2">2、上传EXCEL表：</span>
        <span class="upload-box">
          <i class="el-icon-upload"></i>
          <span class="tipstext1">将文件拖到此处，或</span><el-link type="primary">点击上传</el-link>
        </span>
      </el-row>
      <el-row class="tips"
        >提示：本导入只支持2007或以上格式【.xlsx】，如果您的文档是2003格式【.xls】，请另存为【.xlsx】格式！</el-row
      >
    </div>
    <span class="bottomBtn" slot="footer">
      <el-button size="small" @click="isShow = false">取 消</el-button>
      <el-button size="small">上一步</el-button>
      <el-button size="small">下一步</el-button>
      <el-button size="small" type="primary">完成</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "import",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      fullscreen: true,
      active: 0,
      isShow: false,
    };
  },
  methods: {
    show() {
      this.isShow = true;
      console.log("this is dialog show");
    },
  },
};
</script>
<style lang="scss" scoped>
.course-box {
  width: 500px;
  margin: 30px auto;
  font-size: 14px;
  .tips {
    width: 700px;
    color: #f56c6c;
  }
  span {
    display: inline-block;
  }
  .el-row {
    margin: 10px 0;
  }
  .upload-box {
    width: 360px;
    height: 180px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    text-align: center;
    i {
      font-size: 67px;
      color: #c0c4cc;
      margin: 40px 0 16px;
      line-height: 50px;
      display: block;
      text-align: center;
    }
  }
  .tipstext1{
    vertical-align: middle;
  }
  .tipstext2{
    vertical-align: top;
  }

}
/deep/.el-dialog__footer{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>