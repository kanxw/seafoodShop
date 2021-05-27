<template>
  <el-container>
    <el-header v-if="isshow"
    class="orderTotal"
    >
      <rghxMainNav @isShowTotal="isShowTotal" @changeView="mainNavClick"></rghxMainNav>
      <rghxMainTotal v-if="totalShow"></rghxMainTotal>
      <rghxScreen :token="token" :orderCurrentView="orderCurrentView"></rghxScreen>
    </el-header>
    <el-main>
      <component :is="orderCurrentView"></component>
    </el-main>
  </el-container>
</template>

<script>
import rghxMainNav from "./components/mainnav";
import rghxMainTotal from "./components/mainTotal";
import rghxScreen from "./components/screen";
import rghxProduct from "./product";
import rghxProductShow from "./productShow";
import rghxProductDisplay from "./productDisplay";
import rghxProductTheme from "./productTheme";
import rghxProductTest from "./productTest";

export default {
  name: "index",
  data() {
    return {
      isshow: true,
      token: "",
      totalShow: true,
      orderCurrentView: "rghxProduct",
    };
  },

  components: {
    rghxMainNav,
    rghxScreen,
    rghxMainTotal,
    rghxProduct,
    rghxProductShow,
    rghxProductDisplay,
    rghxProductTheme,
    rghxProductTest,
  },
  methods: {
    getroutetoken() {
      console.log(this.$route.params, 1);
      this.token = this.$route.params.usertoken;
      console.log(this.token, 2);
    },
    isShowTotal() {
      this.totalShow = !this.totalShow;
    },
    mainNavClick(val){
      if(val!='rghxProduct'){
        this.totalShow = false;
      }else{
        this.totalShow = true;
      }
      this.orderCurrentView = val;
    }
  },
  created() {
    
  },
  watch:{

  }
};
</script>
<style lang='scss' scoped>
.el-container {
  .el-header {
    padding: 0;
  }
  .orderTotal {
    // height: 321px !important ;
    height: unset !important;
  }
}
</style>