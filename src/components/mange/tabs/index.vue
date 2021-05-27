<template>
  <div class="tabs-box">
    <el-tabs
      v-if="tabArray.length > 0"
      v-model="tabActive"
      type="card"
      @tab-remove="removeTab"
      @tab-click="tabClick"
    >
      <el-tab-pane
        v-for="(item, index) in tabArray"
        :key="index"
        :label="item"
        :name="item"
        :closable="item != '首页' && isAllowRemove? true : false"
      >
      </el-tab-pane>
    </el-tabs>
    <div class="tabsright" v-if="isShowMange">
      <el-button
        icon="el-icon-close"
        type="text"
        title="清除所有标签"
        @click="clearAllLabel"
      ></el-button>
      <el-button type="text" style="margin-right: 20px">
        <i class="el-icon-guide"></i>新手指引
      </el-button>
      <el-dropdown @command="tabsCommandClick">
        <span>超级管理员<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home"
            ><i class="el-icon-s-home"></i>首页</el-dropdown-item
          >
          <el-dropdown-item command="bowOut" divided
            ><i class="el-icon-switch-button"></i>退出系统</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabs",
  props: {
    // tabsData: {
    //   type: Array,
    //   default: () => {
    //     return [];
    //   },
    // },
    tabsData: {
      type: String,
      default: "",
    },
    addTab: {
      type: String,
      default: "",
    },
    isShowMange: {
      type: Boolean,
      default: false,
    },
    isAllowRemove:{
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      isTop: false,
      tabActive: "",
      tabArray: [],
    };
  },
  methods: {
    removeTab(tabname) {
      let tabArray = this.tabArray;
      let tabActive = this.tabActive;
      let index = tabArray.findIndex((value, i) => {
        return value == tabname;
      });

      if (tabActive == tabname) {
        tabActive = tabArray[index - 1];
        this.$emit("tabsRemove", tabActive);
      }

      this.tabArray = tabArray.filter((item) => item != tabname);
    },
    tabClick(tab, event) {
      let name = tab.paneName;
      this.$emit("tabClick", name);
    },
    clearAllLabel() {
      this.tabArray.length = 0;
      this.$parent.clearAllLabel();
    },
    tabsCommandClick(command) {
      if (command == "home") {
      } else {
        this.$router.push({ name: "login" });
        this.$store.commit("user_token", "");
      }
    },
    tabsDataUpdate() {
      let tabArray = this.tabArray;
      let val = this.tabsData;
      let newArray = val.split("|");
      if (newArray.length > 1) {
        newArray.forEach((item) => {
          tabArray.push(item);
        });

        this.tabActive = tabArray[0];
      } else {
        if (!tabArray.includes(val)) {
          tabArray.push(val);
        }

        this.tabActive = val;
      }

    },
    tabsChange(option) {
      console.log(123);
      this.tabActive = option.label;
      let tabArray = this.tabArray;
      let index = tabArray.findIndex((item) => item.label == option.label);
      if (index < 0) {
        tabArray.push(option);
      }
    },
  },
  created() {
    if(this.tabsData !=''){
      this.tabsDataUpdate();
    }
  },
  mounted() {},
  computed: {},
  watch: {
    tabsData(newVal) {
      this.tabsDataUpdate();
    },
  },
};
</script>
<style lang="scss" scoped>
.tabs-box {
  height: 40px;
  width: 100%;
  overflow: hidden;
  line-height: 40px;
  display: flex;
  margin-bottom: 2px;
  background-color: #fff;
  .tabsright {
    margin: 0 10px 0 25px;
    /deep/.el-submenu__title {
      height: unset;
      line-height: unset;
      border: 0;
    }
  }
  .el-tabs {
    flex: 1;
    overflow-x: auto;
    /deep/.el-tabs__header {
      margin: 0;
      border: 0;
    }
    /deep/.el-tabs__nav {
      border: 0;
    }
    /deep/.el-tabs__item {
      border: 0;
      vertical-align: top;
    }
    /deep/.is-active {
      border-bottom: 2px solid;
    }
    /deep/.el-tabs__item:hover {
      color: unset;
    }
  }
}
.el-tabs,
.tabsright,
.el-button {
  display: inline-block;
  border: 0;
}
</style>