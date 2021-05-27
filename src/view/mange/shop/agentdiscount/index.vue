<template>
  <div class="content-box">
    <rghxScreen
      ref="search"
      :screenData="screenData"
      :formData="formData"
      @searchDataUpdata="searchDataUpdata"
    >
    </rghxScreen>
    <rghxtableList
      :toolbar="toolbar"
      :listData="listData"
      @tableClick="tableClick"
      @tableTopBtnClick="tableTopBtnClick"
    >
      <template #tableTabs v-if="tableTabsData.tabs">
        <rghxtabletabs
          :tabsData="tableTabsData"
          @tabClick="tableTabsClick"
        ></rghxtabletabs>
      </template>
    </rghxtableList>
    <rghxtabelPagin
      :paginData="paginData"
      :pageData="pageData"
    ></rghxtabelPagin>
    <rghxdialog ref="dialog"></rghxdialog>
    <rghximport ref="import"></rghximport>
    <rghxsetting ref="setting"></rghxsetting>
    <rghxbatchSetting ref="batchSetting"></rghxbatchSetting>
  </div>
</template>
<script>
import {
  getLayoutData,
  getListData,
} from "@/api/mange/shop/agentDiscount";
import rghxScreen from "@/components/mange/screen";
import rghxtableList from "@/components/mange/tableList";
import rghxdialog from "@/components/mange/dialog";
import rghximport from "@/components/mange/import";
import rghxtabelPagin from "@/components/mange/tablepagin";
import rghxtabletabs from "@/components/mange/tabs";
import rghxbatchSetting from "../components/batchSetting";
import rghxsetting from "../components/set";

export default {
  name: "agentdiscount",
  data() {
    return {
      layoutData: {},
      listData: {},
      searchData: {},
      pageData: {
        pageindex: 1,
        pagesize: 30,
      },
      paginData: {},

      screenData: [],
      formData: {},
      tableTopBtnData: {},
      tableTabsData: '',
      toolbar:[],
    };
  },
  methods: {
    async init() {
      await this.getLayout();
      await this.getList();
    },
    getLayout() {
      return getLayoutData()
        .then((res) => {
          this.toolbar = res.data.data.toolbar;

          // 处理数据
          let screenData = res.data.data.query;
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
          console.log(err, 2);
        });
    },
    getList() {
      return getListData(Object.assign(this.pageData, this.formData))
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
    searchDataUpdata(val) {
      this.getList();
    },
    tableTopBtnClick(option) {
      let { btnName, selectRow } = option;
      switch (btnName) {
        case "delete": {
          if (selectRow.length == 0) {
            this.$message({
              type: "warning",
              message: "请至少选择一个总代！",
            });
            return;
          }

          let tips = "";
          let shops = "";
          selectRow.forEach((item) => {
            tips +=
              item["总代名称"] + ": 指标类别为" + item["指标类别"];
            shops += item["Key"] + ",";
          });

          let tipscontent = `<span>将删除已选中的</span><br/><span>${tips} ${selectRow.length}个指标，是否继续</span>`;
          this.$refs.dialog.show(tipscontent);
          break;
        }
        case "import": {
          this.$refs.import.show();
          break;
        }
        case "batchset": {
          let data = {
            clientLevel: 2,
            tabindex: this.formData["other"]["tabindex"],
            type: 1,
          };
          this.$refs.batchSetting.show(data);
          break;
        }
      }
    },
    tableClick(option) {
      let { type, row } = option;
      let data = {
        clientLevel: 0,
        type,
        row,
        pagetype: 0,
      };
      switch (type) {
        case "编辑": {
          this.$refs.setting.show(data);
          break;
        }
        case "复制": {
          this.$refs.setting.show(data);
          break;
        }
      }
    },
    tableTabsClick(val) {
      let tableTabsData = this.tableTabsData.split('|');
      let index = tableTabsData.findIndex((item, i) =>{
        return item == val;
      })
      this.formData["other"]["tabindex"] = index;
      this.getList();
    },
  },
  computed: {},
  components: {
    rghxScreen,
    rghxtableList,
    rghxdialog,
    rghximport,
    rghxtabletabs,
    rghxtabelPagin,
    rghxbatchSetting,
    rghxsetting,
  },
  created() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
</style>