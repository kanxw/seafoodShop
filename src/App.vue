<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    let newStore = sessionStorage.getItem("store");console.log(newStore,'this is newStore')
    if (newStore) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(newStore)
        )
      );
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  beforeUpdate(){}
};
</script>

<style >
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>
