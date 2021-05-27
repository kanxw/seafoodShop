<template>
  <div class="content-box">
    <rghxScreen
      ref="search"
      :screenData="screenData"
      :formData="formData"
      @searchDataUpdata="searchDataUpdata"
    >
    </rghxScreen>
    <rghxTableList
      :toolbar="toolbar"
      :listData="listData"
      @tableClick="shopTableClick"
      @tableTopBtnClick="tableTopBtnClick"
    ></rghxTableList>
    <rghximport ref="import" title="导入店铺资料"></rghximport>
    <rghxshopdialog
      ref="shopdialog"
      :dialogdata="dialogdata"
      @dialogdetermine="dialogdetermine"
    ></rghxshopdialog>
    <rghxTabelPagin :paginData="paginData" :pageData="pageData"></rghxTabelPagin>
    <rghxforbidden ref="forbidden"></rghxforbidden>
    <rghxdialog ref="dialog"></rghxdialog>
    <rghxbatchSetting ref="batchSetting"></rghxbatchSetting>
    <rghxtransfershop ref="transfershop"></rghxtransfershop>
    <rghxRegionalSettings ref="regionalSettings"></rghxRegionalSettings>
  </div>
</template>
<script>
import {
  shopLayout,
  shopSearch,
  getShopList,
  setShoPoperation,
  getUserID,
  getShopForbidden,
} from "@/api/mange/shop/shop";
import rghxScreen from "@/components/mange/screen";
import rghxTableList from "@/components/mange/tableList";
import rghxTabelPagin from "@/components/mange/tablepagin";
import rghximport from "@/components/mange/import";
import rghxdialog from "@/components/mange/dialog";
import rghxbatchSetting from "../components/batchSetting";
import rghxRegionalSettings from "./components/regionalSettings";
import rghxtransfershop from "./components/transferShop";
import rghxshopdialog from "../../components/dialog";
import rghxforbidden from "./components/forbidden";

export default {
  name: "shoplist",
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
    };
  },
  components: {
    rghxScreen,
    rghxTableList,
    rghxTabelPagin,
    rghxdialog,
    rghxtransfershop,
    rghxRegionalSettings,
    rghxshopdialog,
    rghxforbidden,
    rghximport,
    rghxbatchSetting,
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
      return shopLayout()
        .then((res) => {
          this.toolbar = res.data.data.toolbar;

          // 处理数据
          let screenData = res.data.data.query;
          let formData = {};
          screenData.forEach((item) => {
            if (item["datatype"] == "tab") {
              let tabs = item["data"].split("|");
              let i = 0;
              let tabArray = [];
              tabs.forEach((item) => {
                tabArray.push({
                  label: i.toString(),
                  name: item,
                });

                i++;
              });

              this.tableTabsData = {
                tabs: tabArray,
              };

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
      return getShopList(Object.assign(this.searchData, this.pageData))
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
      this.searchData = val;
      this.getList();
    },
    shopTableClick(option) {
      this.dialogdata = Object.assign({}, this.$options.data().dialogdata); //初始化数据
      let { type, row } = option;
      console.log(option);
      switch (type) {
        case "把店铺转移到其他经销商":
          this.$refs.transfershop.show({ row });
          break;
        case "该店铺还没设置指标":
          let data = {
            clientLevel: 0,
            type: 0,
            row: row,
          };
          this.$refs.batchSetting.show(data);
          break;
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
        this.dialogSimpleTips(option);
      }
    },
    dialogSimpleTips(option) {
      let { selectRow, title, btntype, isLogin } = option;
      let tipscontent = "";
      if (selectRow.length == 0) {
        this.$message({
          type: "warning",
          message: "请至少选择一个店铺！",
        });
        return;
      }

      let shopname = "",
        clientcode = [];
      selectRow.forEach((val) => {
        shopname += val["店铺名称"].split("|")[4] + "，";
        clientcode.push(val["Key"]);
      });

      if (isLogin) {
        shopname = shopname.substr(0, shopname.length - 1);
        tipscontent = `将${title}【${shopname}】的登录，是否继续？`;
      } else {
        tipscontent = `将${title}已选中的 ${shopname}是否继续？`;
      }

      this.$refs.dialog.show(tipscontent);
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
    shopEdit(shop) {
      let type = shop == "" ? "new" : "edit";
      this.dialogdata = Object.assign(this.dialogdata, {
        title: shop == "" ? "新增店铺" : "编辑店铺",
        center: true,
        type: "collapse",
        width: "50%",
      });

      let parmas = {
        Clientcode: shop,
      };

      getUserID(parmas).then((res) => {
        this.$refs.shopdialog.dialogDataUpdate(res, type);
      });
    },
    componentshow() {},
  },
};
</script>
<style lang="scss" scoped>
</style>