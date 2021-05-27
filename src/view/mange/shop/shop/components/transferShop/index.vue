<template>
  <el-dialog
    :title="title"
    width="40%"
    append-to-body
    lock-scroll
    :show-close="false"
    :visible.sync="isShow"
  >
    <el-form>
      <el-form-item label="经销商">
        <el-tooltip content="把店铺转移到其他经销商">
          <rghxClientSelect ref="clientSelect"></rghxClientSelect>
        </el-tooltip>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogCancel">取 消</el-button>
      <el-button type="primary">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import rghxClientSelect from "@/components/mange/clientSelect";
export default {
  name: "transferShop",
  props: {},
  data() {
    return {
      dialogVisible: false,
      isShow: false,
      title: "",
    };
  },
  methods: {
    show(option) {
      let { row } = option;
      this.title = "转移层级【" + row["店铺名称"].split("|")[4] + "】";
      this.$nextTick(() => {
        this.$refs.clientSelect.show({ type: 1, row });
      });
      this.isShow = true;
    },
    dialogCancel() {
      Object.assign(this.$data, this.$options.data());
    },
  },
  mounted() {},
  components: {
    rghxClientSelect,
  },
};
</script>