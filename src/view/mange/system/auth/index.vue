<template>
  <div class="content-box">
    <el-tabs
      v-model="tabActive"
      type="border-card"
      class="fullheight columnflex"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(item, index) in tabsData"
        :label="item"
        :key="index"
        :name="index"
        lazy
        class="fullheight"
      >
        <el-row type="flex" :gutter="10" class="fullheight">
          <el-col class="left columnflex">
            <el-row type="flex" class="border padding">
              <el-col>用户组管理</el-col>
              <el-button type="primary" size="mini">新增</el-button>
            </el-row>
            <el-row class="fullflex columnflex leftandright-border">
              <rghxAuthTable
                :layoutData="layoutData[index]"
                @updateUserGroup="updateUserGroup"
              ></rghxAuthTable>
            </el-row>
          </el-col>
          <el-col class="columnflex  no-width fullflex">
            <el-row class="border padding">
              <el-button-group>
                <el-button type="primary" size="mini" icon="el-icon-folder"
                  >保存</el-button
                >
                <el-button type="primary" size="mini" icon="el-icon-refresh"
                  >刷新</el-button
                >
                <template v-if="isShopPower">
                  <el-button type="primary" size="mini" icon="el-icon-download"
                    >导入权限</el-button
                  >
                  <el-button type="primary" size="mini" icon="el-icon-upload2"
                    >导出权限</el-button
                  >
                  <el-link type="primary" class="twelve-font"
                    >提示：导入格式请参考导出权限</el-link
                  >
                </template>
              </el-button-group>
            </el-row>
            <el-row
              class="fullflex leftandright-border bottom-border columnflex"
            >
              <template v-if="!isShopPower">
                <el-tree
                  :data="treeData"
                  show-checkbox
                  node-key="value"
                  :default-checked-keys="checkKeys"
                ></el-tree>
              </template>
              <template v-else>
                <el-row class="limit-box bottom-border">
                  <span class="limit-text">客户限定:</span>
                  <el-radio-group v-model="limitType" @change="userPowerChange">
                    <el-radio :label="0">不限定</el-radio>
                    <el-radio :label="1">按店铺限定</el-radio>
                    <el-radio :label="2">按经销商限定</el-radio>
                    <el-radio :label="3">按总代限定</el-radio>
                    <el-radio :label="4">按大区限定</el-radio>
                  </el-radio-group>
                </el-row>
                <el-row class="fullflex columnflex no-height">
                  <el-table :data="limitShopData" height="1" stripe>
                    <template v-if="limitShopTableHead.length > 0">
                      <el-table-column type="selection"></el-table-column>
                      <template v-for="(item, index) in limitShopTableHead">
                        <el-table-column
                          :key="index"
                          :label="item.label"
                          :prop="item.prop"
                          :fixed="limitShopTableHead.length > 2 && index < 2"
                          width="200"
                        >
                        <template #header="scope">
                          <span>{{scope.column.label}}</span>
                          <el-input v-model="seacherData[scope.column.label]" placeholder="请输入关键字搜索" size="mini" class="limit-seacher"></el-input>
                          <!-- <el-button @click="test(scope)"></el-button> -->
                        </template>
                        </el-table-column>
                      </template>
                    </template>
                  </el-table>
                </el-row>
              </template>
            </el-row>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  getUserGroup,
  getUserGroupItem,
  getUser,
  getUserPower,
} from "@/api/mange/system/auth";
import rghxAuthTable from "./components/table";

export default {
  name: "auth",
  data() {
    return {
      tabActive: 0,
      limitType: 0,
      tabsData: ["功能权限", "用户权限"],
      layoutData: [],
      isShopPower: false,
      userGroup: "",
      treeData: [],
      checkKeys: [],
      limitShopData: [],
      limitShopTableHead: [],
      seacherData: {}
    };
  },
  methods: {
    async init() {
      await this.getlayout();
    },
    getlayout() {
      return getUserGroup()
        .then((res) => {
          let data = res.data;
          if (data.errormsg == "") {
            let layoutData = this.layoutData;
            let userData = {};
            let tableHead = [
              { label: "用户组ID", prop: "GroupCode" },
              { label: "用户组名称", prop: "GroupDesc" },
            ];
            userData.tableHead = tableHead;
            userData.tableData = data.data;
            layoutData.push(userData);
          }
        })
        .catch((err) => {});
    },
    getAuthData() {
      let option = { groupcode: this.userGroup };
      return getUserGroupItem(option)
        .then((res) => {
          if (res.data.errormsg == "") {
            let data = res.data.data;
            this.checkKeys.length = 0;
            this.checkKeyUpdate(data);
            this.treeData = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //选中数组处理
    checkKeyUpdate(array) {
      array.forEach((item) => {
        let children = item.children;
        if (children) {
          this.checkKeyUpdate(children);
        } else if (item.IsCheck) {
          this.checkKeys.push(item.value);
        }
      });
    },
    updateUserGroup(val) {
      console.log(val, "this is updateUserGroup");
      if (this.tabActive == 1) {
        this.userGroup = val.UserCode;
      } else {
        this.userGroup = val.GroupCode;
      }
      this.getAuthData();
    },
    handleClick(tab, event) {
      this.isShopPower = !this.isShopPower;
      if (this.layoutData.length == 2) {
        return;
      }

      getUser()
        .then((res) => {
          if (res.data.errormsg == "") {
            console.log("123");
            let layoutData = this.layoutData;
            let userData = {};
            let tableHead = [
              { label: "用户账号", prop: "UserCode" },
              { label: "用户名称", prop: "UserDesc" },
            ];
            userData.tableHead = tableHead;
            userData.tableData = res.data.data;
            layoutData.push(userData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    userPowerChange(value) {
      this.limitShopTableHead.length = 0;
      this.limitShopData.length = 0;
      if (value == 0) {
        return;
      }
      let option = {
        usercode: this.userGroup,
        islimitshop: value,
      };
      getUserPower(option)
        .then((res) => {
          if (res.data.errormsg == "") {
            let data = res.data.data;
            let seacherData = {};
            let tableHead = Object.keys(data[0]).filter((item) => {
              return item.trim() != "IsCheck" && item.trim() != "key";
            });

            let limitShopTableHead = tableHead.map((item) => {
              seacherData[item.trim()] = "";
              let fixed = item.includes('编号')
              return {
                label: item.trim(),
                prop: item,
              };
            });

            this.seacherData = seacherData;
            this.limitShopData = data;
            this.limitShopTableHead = limitShopTableHead;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    test(val){
      console.log(val)
    },
  },
  mounted() {
    console.log("789");
  },
  components: {
    rghxAuthTable,
  },
  created() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.content-box {
  margin: 10px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  .left {
    width: 320px;
  }
  .fullheight {
    height: 100%;
  }
  .columnflex {
    display: flex;
    flex-direction: column;
    /deep/.el-tabs__content {
      flex: 1;
    }
  }
  .no-width{
    width: 0;
  }
  .no-height{
    height: 0;
  }
  .fullflex {
    flex: 1;
  }
  .twelve-font {
    font-size: 12px;
    margin-left: 15px;
  }
  .border {
    border: 1px solid #ebeef5;
  }
  .leftandright-border {
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
  }
  .bottom-border {
    border-bottom: 1px solid #ebeef5;
  }
  .padding {
    padding: 5px 10px;
  }
  .limit-box {
    padding: 10px;
    .limit-text {
      font-size: 14px;
      margin: 0 10px;
    }
  }
  .limit-seacher{
    width: 100px;
    /deep/ input{
      padding: 0;
    }
  }
}
</style>