<template>
  <el-dialog title="归属区域设置" :visible.sync="isShow" append-to-body width="60%">
    <el-row type="flex" style="height: 400px">
      <el-form>
        <el-form-item>
          <rghxTree
            :treeData="treeData"
            :defaultExpanded="defaultExpanded"
            @treeClick="treeClick"
          ></rghxTree>
        </el-form-item>
      </el-form>
      <rghxTableList
        ref="tableList"
        :layoutData="layoutData"
        :listData="listData"
      ></rghxTableList>
    </el-row>
  </el-dialog>
</template>
<script>
import { levelLayout, levelGetList } from "@/api/mange/shop/publicMethod";
import rghxTableList from "@/components/mange/tableList";
import rghxTree from "@/components/mange/tree";

export default {
  name: "regionalSettings",
  data() {
    return {
      isShow: false,
      formData: {},
      layoutData: {},
      listData: {},
      pageData: {
        pageindex: 1,
        pagesize: 30,
      },
      treeData: [],
      defaultExpanded: [],
    };
  },
  props: {},
  methods: {
    init() {
      this.getLayout();
      this.isShow = true;
    },
    getLayout() {
      return levelLayout()
        .then((res) => {
          if (res.data.errormsg == "") {
            let dataArray = res.data.data.query;
            let treeData = [];
            let defaultKeys = [];
            let formData = {};
            dataArray.forEach((item) => {
              let fromItemData = {};
              let itemData = item.data;
              itemData.forEach((val) => {
                val.group = item.group;
                val.columnname = item.columnname;
                treeData.push(val);
                defaultKeys.push(val.value);
              });
              fromItemData[item.columnname] = defaultKeys;
              formData[item.group] = fromItemData;
            });

            this.formData = formData;
            this.treeData = treeData;
            this.defaultExpanded = defaultKeys;
            this.layoutData = res;
            this.$nextTick(() => {
              this.getList();
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getList() {
      let params = Object.assign(this.pageData, this.formData);
      return levelGetList(params)
        .then((res) => {
          if (res.data.errormsg == "") {
            this.listData = res;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    treeClick(option) {
      let formData = this.formData;
      for (let key in formData) {
        if (key == option["group"]) {
          for (let key2 in formData[key]) {
            if (key2 == option.columnname) {
              let newVal = [];
              newVal.push(option.value);
              formData[key][key2] = newVal;
            }
          }
        }
      }

      this.getList();
    },
  },
  created() {},
  components: {
    rghxTableList,
    rghxTree,
  },
};
</script>
<style lang="scss" scoped>
.el-form {
  display: flex;
}
</style>