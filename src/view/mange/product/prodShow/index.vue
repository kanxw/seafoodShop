<template>
  <div class="content-box">
    <rghxScreen
      ref="search"
      :screenData="screenData"
      :formData="formData"
      @searchDataUpdata="searchDataUpdata"
    >
    </rghxScreen>
    <tableList
      :toolbar="toolbar"
      :listData="listData"
      @tableClick="shopTableClick"
      @tableTopBtnClick="tableTopBtnClick"
    ></tableList>
    <rghximport ref="import" title="导入店铺资料"></rghximport>
    <rghxdialog
      ref="shopdialog"
      :dialogdata="dialogdata"
      @dialogdetermine="dialogdetermine"
    ></rghxdialog>
    <tabelPagin :paginData="paginData" :pageData="pageData"></tabelPagin>
    <rghxdialog ref="dialog"></rghxdialog>
  </div>
</template>
<script>
import {
  getLayoutData,
  getListData,
  getUserID,
} from "@/api/mange/product/prodShow";
import rghxScreen from "@/components/mange/screen";
import tableList from "@/components/mange/tableList";
import tabelPagin from "@/components/mange/tablepagin";
import rghximport from "@/components/mange/import";
import rghxdialog from "@/components/mange/dialog";

export default {
  name: "prodShow",
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
    tableList,
    tabelPagin,
    rghxdialog,
    rghximport,
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
      return getListData(Object.assign(this.searchData, this.pageData))
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
    componentshow() {},
  },
};
</script>
<style lang="scss" scoped>
</style>