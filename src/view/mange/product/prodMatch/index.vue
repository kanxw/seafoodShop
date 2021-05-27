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
      @tableClick="shopTableClick"
      @tableTopBtnClick="tableTopBtnClick"
    >
      <template #tableTabs>
        <rghxtabletabs
          :tabsData.sync="tableTabsData"
          @tabClick="tableTabsClick"
        ></rghxtabletabs>
      </template>
    </rghxtableList>
    <rghximport ref="import" title="导入店铺资料"></rghximport>
    <rghxdialog
      ref="shopdialog"
      :dialogdata="dialogdata"
      @dialogdetermine="dialogdetermine"
    ></rghxdialog>
    <rghxtabelPagin
      :paginData="paginData"
      :pageData="pageData"
    ></rghxtabelPagin>
    <rghxdialog ref="dialog"></rghxdialog>
  </div>
</template>
<script>
import {
  getLayoutData,
  getListData,
  getUserID,
} from "@/api/mange/product/prodMatch";
import rghxScreen from "@/components/mange/screen";
import rghxtableList from "@/components/mange/tableList";
import rghxtabelPagin from "@/components/mange/tablepagin";
import rghximport from "@/components/mange/import";
import rghxdialog from "@/components/mange/dialog";
import rghxtabletabs from "@/components/mange/tabs";

export default {
  name: "prodMatch",
  data() {
    return {
      searchData: {},
      layoutData: {},
      listData: {},
      toolbar: [],
      shopChoiceCount: 0,
      pageData: {
        pageindex: 1,
        pagesize: 30,
      },
      paginData: {},
      dialogVisible: false,
      rghxshopcomponent: "",
      dialogdata: {
        type: "text",
        fullscreen: false,
        title: "提示",
        width: "420px",
        center: false,
        data: {},
        icon: "el-icon-warning-outline",
        footshow: true,
      },
      screenData: [],
      formData: {},
      tableTabsData: "",
    };
  },
  components: {
    rghxScreen,
    rghxtableList,
    rghxtabelPagin,
    rghxdialog,
    rghximport,
    rghxtabletabs,
  },
  created() {
    this.init();
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
      return getListData(Object.assign(this.formData, this.pageData))
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
      this.formData = val;
      this.getList();
    },
    shopTableClick(option) {
      this.dialogdata = Object.assign({}, this.$options.data().dialogdata); //初始化数据
      let { type, row } = option;
      console.log(option);
      switch (type) {
        case "删除":
          this.dialogSimpleTips({ selectRow: [row], title: type });
          break;
        case "编辑":
          this.shopEdit(row["Key"]);
          break;
        default:
          break;
      }
    },
    //表格头部工具栏点击
    tableTopBtnClick(option) {
      this.dialogdata = Object.assign({}, this.$options.data().dialogdata); //初始化数据
      let { btnName } = option;
      let title = "删除",
        btntype = 0,
        isLogin = false,
        isLink = false;
      console.log(btnName);
      switch (btnName) {
        case "new":
          this.shopEdit("");
          break;
        case "import":
          this.$refs.import.show();
          break;
        case "export":
          break;
        case "setting":
          this.$refs.regionalSettings.init();
          break;
        case "delete":
          isLink = true;
          break;
        case "start":
          isLink = true;
          title = "启用";
          btntype = 1;
          break;
        case "stop":
          isLink = true;
          title = "禁用";
          btntype = 2;
          break;
        case "offline":
          isLink = true;
          title = "禁止";
          isLogin = true;
          break;
        case "online":
          isLink = true;
          title = "恢复";
          isLogin = true;
          break;
        default:
          break;
      }

      if (isLink) {
        option = Object.assign(option, { title, btntype, isLogin });
        //this.dialogSimpleTips(option);
      }
    },
    dialogdetermine() {
      let { clientcode, btnType } = this.dialogdata.data;
      this.dialogdata.dialogVisible = false;
      setShoPoperation({ clientcode, type: btnType })
        .then((res) => {
          if (res.data.errormsg == "") {
            this.$message({
              type: "success",
              message: "操作成功",
            });

            this.getList();
          } else {
            this.$message({
              type: "warning",
              message: res.data.errormsg,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tableTabsClick(val) {
      let tableTabsData = this.tableTabsData.split("|");
      let index = tableTabsData.findIndex((item, i) => {
        return item == val;
      });
      this.formData["other"]["tabindex"] = index;
      this.getList();
    },
    componentshow() {},
  },
};
</script>
<style lang="scss" scoped>
</style>