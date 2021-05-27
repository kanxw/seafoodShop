<template>
  <div class="content-box">
    <div class="content-body">
      <el-row class="header">
        <el-select size="mini"
          v-model="liveRoomSelect"
          placeholder="请选择直播间"
          @change="liveRoomChange"
        >
          <el-option
            v-for="(item, index) in liveRoomData"
            :key="index"
            :label="item.RoomName"
            :value="item.ID"
          ></el-option>
        </el-select>
        <el-checkbox
          v-model="isTimedRefresh"
          label="启用定时刷新"
          :disabled="isDisabled"
        ></el-checkbox>
        <el-button-group>
          <el-button
            size="small"
            type="primary"
            :disabled="isDisabled"
            icon="el-icon-goods"
            >导出推送款</el-button
          >
          <el-button
            size="small"
            type="primary"
            :disabled="isDisabled"
            icon="el-icon-chat-line-square"
            >导出聊天记录</el-button
          >
        </el-button-group>
        <el-checkbox
          v-model="isShieldPush"
          label="订货端屏蔽推送款"
        ></el-checkbox>
      </el-row>
      <el-row :gutter="20" class="body">
        <el-col class="col-push">
          <div class="col-box">
            <el-row class="push-hearder"></el-row>
            <el-row class="push-body">
              <el-row type="flex">
                <el-radio-group
                  v-model="pushType"
                  size="mini"
                  :disabled="isDisabled"
                >
                  <el-radio border label="0">按单款</el-radio>
                  <el-radio border label="1">按搭配</el-radio>
                  <el-radio border label="2">按推演</el-radio>
                </el-radio-group>
              </el-row>
              <el-row type="flex" :gutter="15">
                <el-col :span="18">
                  <el-input
                    size="mini"
                    v-model="pushProd"
                    :placeholder="pushType == 0? '请输入款号或序号':pushType==1? '请输入搭配号':'请输入推演号'"
                    :disabled="isDisabled"
                /></el-col>
                <el-col :span="6"
                  ><el-button size="mini" type="primary" :disabled="isDisabled"
                    >搜索</el-button
                  ></el-col
                >
              </el-row>
              <el-row
                ><el-button
                  size="mini"
                  type="primary"
                  style="width: 100%"
                  :disabled="pushProd == '' ? true : false"
                  >推送</el-button
                ></el-row
              >
            </el-row>
          </div>
        </el-col>
        <el-col class="col-prodDatel" :span="1"
          ><div class="col-box">
            <rghxPushProdDatel :pushProdData="pushProdData"></rghxPushProdDatel>
          </div>
        </el-col>
        <el-col class="col-chatrecord">
          <div class="col-box">
            <el-row class="chatRecord-body"></el-row>
            <el-row class="chatRecord-btn">
              <el-row type="flex" :gutter="15">
                <el-col :span="18">
                  <el-input
                    size="mini"
                    v-model="pushProd"
                    placeholder="请输入内容"
                    :disabled="isDisabled"
                  />
                </el-col>
                <el-col :span="6">
                  <el-button
                    size="mini"
                    type="primary"
                    :disabled="pushProd == '' ? true : false"
                    >发送</el-button>
                </el-col>
              </el-row>
              <el-row
                ><el-button size="mini" type="primary" style="width: 100%"
                  >设置禁言店铺</el-button
                ></el-row
              >
            </el-row>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>
<script>
import {
  getRoomList,
  getSingleProduct,
  getGuideContentList,
} from "@/api/mange/live/pushProd";
import rghxPushProdDatel from "./components/pushProdDatel";

export default {
  name: "pushProd",
  data() {
    return {
      liveRoomData: [],
      liveRoomSelect: "",
      isDisabled: true,
      isTimedRefresh: false,
      isShieldPush: false,
      pushType: "0",
      pushProd: "",
      currchatcontentid: -1,
      pushProdData: [],
      chatRecord: [],
    };
  },
  components: {
    rghxPushProdDatel,
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      await this.getLayout();
      //await this.getList();
    },
    getLayout() {
      return getRoomList()
        .then((res) => {
          if (res.data.errormsg == "") {
            let roomListData = res.data.data;
            this.liveRoomData = roomListData;
            console.log(roomListData);
          }
        })
        .catch((err) => {
          console.log(err, 2);
        });
    },
    liveRoomChange(val) {
      if (this.liveRoomSelect != "") {
        this.isDisabled = false;
        this.isTimedRefresh = true;
        let params = {
          id: val,
          guesscode:
            this.pushType === 2 && this.pushProd != "" ? this.pushProd : "",
          currchatcontentid: this.currchatcontentid,
        };
        getGuideContentList(params).then((res) => {
          if (res.data.errormsg == "") {
            this.pushProdData = res.data.data1;
            this.chatRecord = res.data.data2;
          }
        });
      }
      console.log(val);
    },
  },
};
</script>
<style lang="scss" scoped>
.content-box {
  background-color: unset;
  .content-body {
    width: calc(100% - 50px);
    height: calc(100% - 30px);
    margin: 15px;
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    .el-checkbox {
      margin-left: 15px;
    }
    .header {
      margin-bottom: 10px;
    }
    .body {
      flex: 1;
      display: flex;
      .el-col {
        height: 100%;
      }
      .push-hearder {
        flex: 6;
      }
      .chatRecord-body{
        flex: 8;
        background-color: #f0f0f0;
      }
      .push-body,.chatRecord-btn {
        flex: 1;
        border-top: 1px solid #dcdfe6;
        padding: 10px;
        .el-row {
          margin: 10px 0;
        }
      }
      .col-push {
        width: 320px;
        /deep/.el-radio {
          margin-right: 0;
        }
      }
      .col-prodDatel {
        flex: 1;
      }
      .col-chatrecord {
        width: 300px;
        // background-color: #f0f0f0;
      }
    }
  }
  .col-box {
    height: 100%;
    border: 1px solid #dcdfe6;
    display: flex;
    flex-direction: column;
  }
}
</style>