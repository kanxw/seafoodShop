<template>
  <div class="content-box flexdirection">
    <div class="left">
      <rghxTree :treeData="treeData" :defaultExpanded="defaultExpanded" @treeClick="treeClick"></rghxTree>
    </div>
    <div class="right">
      <tableList
        :toolbar="toolbar"
        :listData="listData"
        @tableClick="tableClick"
        @tableTopBtnClick="tableTopBtnClick"
      ></tableList>
      <rghxshopdialog
        ref="shopdialog"
        :dialogdata="dialogdata"
        @dialogdetermine="dialogdetermine"
      ></rghxshopdialog>
      <rghxdialog ref="dialog"></rghxdialog>
    </div>
  </div>
</template>
<script>
import {
  getLayoutData,
  getListData,
  setShoPoperation,
  getUserID,
} from "@/api/mange/product/prodData";
import tableList from "@/components/mange/tableList";
import rghxdialog from "@/components/mange/dialog";
import rghxshopdialog from "../../components/dialog";
import rghxTree from "@/components/mange/tree";

export default {
  name: "prodData",
  data() {
    return {
      listData: {},
      toolbar: [],
      pageData: {
        pageindex: 1,
        pagesize: 30,
      },
      paginData: {},
      dialogVisible: false,
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
      treeData: [],
      formData: {},
      defaultExpanded: [],
    };
  },
  components: {
    tableList,
    rghxdialog,
    rghxshopdialog,
    rghxTree,
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
          let screenData = res.data.data.query[0];
          let formData = {};
          if (screenData["datatype"] == "singletree") {
            let defaultvalue = '';
            if (screenData["defaultvalue"] == "") {
              defaultvalue = screenData["data"][0]["value"];
            } else {
              defaultvalue = screenData["defaultvalue"];
            }

            formData[screenData.group] = Object.assign(
              {},
              formData[screenData.group]
            );

            let defaultExpanded = [];
            defaultExpanded.push(defaultvalue);
            formData[screenData.group][screenData.columnname] = defaultExpanded;
            let data = screenData["data"];
            data[0]["group"] = screenData.group;
            data[0]["columnname"] = screenData.columnname;

            this.treeData = data;
            this.defaultExpanded = defaultExpanded;
          }

          this.formData = formData;
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
    tableClick(option) {
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
      let title = "新增",
        btntype = 0,
        isLogin = false,
        isLink = false;
      console.log(btnName);
      switch (btnName) {
        case "new":
          this.shopEdit("");
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
      console.log('')
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

      // getUserID(parmas).then((res) => {
      //   this.$refs.shopdialog.dialogDataUpdate(res, type);
      // });
    },
    componentshow() {},
    treeClick(option){
      let formData = this.formData;
      for(let key in formData){
        if(key == option["group"]){
          for(let key2 in formData[key]){
            if(key2 == option.columnname){
              let newVal = [];
              newVal.push(option.value);
              formData[key][key2] = newVal;
            }
          }
        }
      }

      this.getList();
    }
  },
};
</script>
<style lang="scss" scoped>
.flexdirection {
  flex-direction: unset;
}

.right {
  height: 100%;
  flex: 1;
  background-color: #fff;
}

</style>