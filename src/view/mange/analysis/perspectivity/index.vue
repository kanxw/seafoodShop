<template>
  <div class="content-box">
    <rghxScreen
      ref="search"
      :screenData="screenData"
      :formData="formData"
      @screenSearch="screenSearch"
    >
    </rghxScreen>
    <div class="conent-body">
      <rghxtableList
        :toolbar="toolbar"
        :listData="listData"
        @tableClick="shopTableClick"
        @tableTopBtnClick="tableTopBtnClick"
        style="flex: 1"
      >
        <template #printTemplate>
          <el-select v-model="value" placeholder="请选择模板" @change="templateselected" size="small">
            <el-option
              v-for="item in printlayoutData"
              :key="item.LayoutName"
              :label="item.LayoutName"
              :value="item.LayoutName">
              <span>{{item.LayoutName}}</span>
              <el-button v-if="item.LayoutName != ''" icon="el-icon-delete" type="text" @click="templatedelete(item)"></el-button>
            </el-option>
          </el-select>
          <el-button type="primary" size="small">保存</el-button>
        </template>
      </rghxtableList>
      <rghxSelectProperties ref="tree" :layoutTreeData="treeData" @selectedUpdate="selectedUpdate"></rghxSelectProperties>
    </div>
  </div>
</template>
<script>
import { getLayout, getData } from "@/api/mange/analysis/perspectivity";
import { getPrintLayout, savePrintLayout } from "@/api/mange/print";
import rghxScreen from "@/components/mange/screen";
import rghxtableList from "@/components/mange/tableList";
import rghxtabletabs from "@/components/mange/tabs";
import rghxSelectProperties from "./components/selectProperties";

export default {
  name: "perspectivity",
  props: {},
  data() {
    return {
      searchData: {},
      printlayoutData: [],
      listData: {},
      toolbar: [],
      //   shopChoiceCount: 0,
      treeData: [],
      pageData: {
        pageindex: 1,
        pagesize: 30,
      },
      screenData: [],
      formData: {},
      tableTabsData: "",
      value: [],
    };
  },
  methods: {
    async init() {
      await this.getLayout();
      //await this.getListData();
    },
    getLayout() {
      return getLayout()
        .then((res) => {
          this.toolbar = res.data.data.toolbar;

          // 处理数据
          let screenData = res.data.data.query;
          this.treeData = res.data.data.data4[0].data;
          let formData = {};
          screenData.forEach((item) => {
            if (item["datatype"] == "tab") {
              this.tableTabsData = item["data"];
              formData[item.group] = Object.assign({}, formData[item.group]);
              formData[item.group][item.columnname] = item.defaultvalue;
            } else {
              formData[item.group] = Object.assign({}, formData[item.group]);
              formData[item.group][item.columnname] = item.defaultvalue;
            }
          });

          this.formData = formData;
          this.screenData = screenData;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getLayoutData() {
      return getPrintLayout({ reportname: "订单透视" })
        .then((res) => {
          if (res.data.errormsg == "") {
            this.printlayoutData  = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListData() {
      return getData(Object.assign(this.formData, this.pageData))
        .then((res) => {
          if (res.data.errormsg == "") {
            this.listData = res;
            this.paginData = {
              rowcount: res.data.rowcount,
              msg: res.data.msg,
            };
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    templatedelete(option){
      console.log(option)
    },
    templateselected(val){
      let activeTemplate = this.printlayoutData.filter(item =>{
        return item.LayoutName == val;
      })

      console.log(activeTemplate)
      if(val == ''){

      }

      this.$refs.tree.activeUpdat(activeTemplate[0]);
      let formData = this.formData;
      console.log(activeTemplate[0].colFields)
      formData.other.colFields = activeTemplate[0].ColumnField.split(',');
      formData.other.rowFields = activeTemplate[0].RowField.split(',');
      formData.other.valueFields = activeTemplate[0].DataField.split(',');
      this.getListData();
    },
    screenSearch(option) {
      console.log(option,'this is search')
      this.getListData();
    },
    selectedUpdate(option){
      let formData = this.formData;
      for(let key in option){
        console.log(key)
        if(key == 'row'){
          formData.other.rowFields = option[key].value;
          console.log(option[key].value)
        }else if(key == 'col'){
          formData.other.colFields = option[key].value;
        }else{
          formData.other.valueFields = option[key].value;
        }
      }
    },
    shopTableClick() {},
    tableTopBtnClick() {},
    tableTabsClick() {},
  },
  created() {
    this.init();
    this.getLayoutData();
  },
  components: {
    rghxScreen,
    rghxtableList,
    rghxtabletabs,
    rghxSelectProperties,
  },
};
</script>
<style lang="scss" scoped>
.conent-body {
  display: flex;
  flex: 1;
  background-color: #f0f2f5;
  overflow: hidden;
  .table-box {
    flex: 1;
    background-color: #fff;
  }
}
</style>