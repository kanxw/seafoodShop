<template>
  <div class="div-box">
    <div class="menu-box">
      <el-scrollbar style="height: 100%">
        <div class="rghxlogo">荣哥豪华海鲜订货程序</div>
        <el-menu
          v-for="(item, index) in menuData"
          :key="index"
          text-color="hsla(0,0%,100%,.7)"
          active-text-color="#fff"
          :default-active="menuActive"
          :default-openeds="submenuopeneds"
          @open="handleOpen"
          @close="handleClose"
          @select="menuselect"
        >
          <el-menu-item
            v-if="typeof item.Child == 'undefined'"
            :index="item.pagename"
          >
            <i :class="item.icon"></i>
            {{ item.pagename }}</el-menu-item
          >
          <el-submenu v-else :index="item.pagename">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.pagename }}</span>
            </template>
            <template v-for="(item2, index2) in item.Child">
              <el-menu-item
                :index="item2.pagename"
                :key="index2"
              >
                {{ item2.pagename }}</el-menu-item
              >
            </template>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="main-box">
       <rghxtoptabs
        :tabsData.sync="menuActive"
        :isShowMange.sync="isShowMange"
        :isAllowRemove.sync="isAllowRemove"
        ref="toptabs"
        @tabClick="topTabClick"
        @tabsRemove="topTabClick"
      ></rghxtoptabs>
      <rghxMainIndex :path="pageComponentPath" v-if="showComponents"></rghxMainIndex>
    </div>
  </div>
</template>
<script>
import rghxtoptabs from "@/components/mange/tabs";
import myMenu from "@/router/menu"
import rghxMainIndex from "@/components/mange/mainIndex"
// import { component } from 'vue/types/umd';

export default {
  name: "mangemenu",
  data() {
    return {
      menuActive: '',
      menuData: {},
      submenuopeneds: [],
      pageComponentPath: '',
      isShowMange: true,
      isAllowRemove: true,
      showComponents: false,
    };
  },
  components: {
    rghxtoptabs,
    rghxMainIndex,
  },
  methods: {
    init(){
      this.menuData = myMenu;
      let name = myMenu[0]['pagename'];
      let lable = myMenu[0]['path'];
      this.menuActive = name;
      this.submenuopeneds = [];
      this.pageComponentPath = lable;
      this.$nextTick(() =>{
        this.showComponents = true;
      })
    },
    handleOpen(key, keyPath) {
      this.submenuopeneds.length = 0;
      this.submenuopeneds.push(key);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);关闭菜单
    },
    menuselect(key, keyPath) {
      this.menuActive = key;
      this.showComponents = false;
      this.changepage(keyPath);
    },
    changepage(option) {
      let menuData = this.menuData;
      let array = menuData.filter(item =>{
        return item.pagename == option[0]
      })

      let path = array[0].path;
      let componentPath = '';
      if(path){
        componentPath = path;
      }else{
        let Child = array[0].Child;
        let array2 = Child.filter(item =>{
          return item.pagename == option[1];
        })
        
        componentPath = array2[0]['path'];
      }

      this.pageComponentPath = componentPath;
      this.$nextTick(() =>{
        this.showComponents = true;
      })
      // this.registerComponent(componentPath).then(component =>{
      //   //new Component().$mount(this.$refs.currentView)
      // this.showComponents = true;
      //   new component({
      //     el:this.$refs.testcomponents
      //   })
      // })
    },
    clearAllLabel(val) {
      //初始化数据
      this.showComponents = false;
      this.init();
    },
    topTabClick(val) {
      this.submenuopeneds.length = 0;
      this.menuActive = val;
      this.showComponents = false;
      this.$nextTick(()=>{
        let newArrray = this.submenuopeneds.concat([val]);
        this.changepage(newArrray);
      })
    },

    //注册组件
    registerComponent(componentName){
      return import(`@/view/mange/${componentName}`)
      .then(component =>{
        console.log(component)
        return Vue.extend(component.default);
      })
    },
  },
  mounted() {
  },
  created(){
    this.init();
  },
  computed:{
    // pageComponent: function(){
    //     return import(this.pageComponentPath).then((component) =>{
    //       // return Vue.extend(component)
    //       return Vue.component(this.menuActive, component)
    //     })
    //     // return Vue.component(this.pageComponentPath,require(this.pageComponentPath).default);
    //     return

    //   //let component = () =>import(this.pageComponentPath);
    //   let component = (resolve) => require([this.pageComponentPath] ,resolve)
    //   return component;
    // }
  },
};
</script>
<style >
.div-box {
  height: 100%;
  display: flex;
  overflow: hidden;
}
.main-box {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: #f0f2f5;
  position: relative;
  height: 100%;
}

.rghxlogo {
  font-size: 14px;
  color: #fff;
}
.menu-box {
  height: 100%;
  width: 150px;
  background-color: #2a266d;
  display: inline-block;
  overflow-y: auto;
}
.el-submenu .el-menu-item {
  min-width: 100px;
}
.el-menu {
  background-color: unset;
  border: unset;
}
.el-menu-item.is-active {
  background-color: #409eff !important;
}
.is-opened .el-menu--inline {
  background-color: rgba(0, 0, 0, 0.1);
}
.el-submenu__title:hover,
.el-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>