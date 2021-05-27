<template>
  <div class="tree-box">
    <el-tree
      :data="data"
      node-key="value"
      ref="mainTree"
      draggable
      check-strictly
      empty-text="暂无数据"
      :props="defaultProps"
      :current-node-key="treeActive"
      :default-expanded-keys="treeDefaultExpanded"
      @node-click="handleNodeClick"
      :class="isHidetree? 'hidetree': ''"
      highlight-current
    ></el-tree>
    <el-button :icon="isHidetree? 'el-icon-caret-right':'el-icon-caret-left'" type="text" @click="hidetree"></el-button>
  </div>
</template>
<script>
export default {
  name: "tree",
  props: {
    treeData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    // defaultChecked:{
    //   type: Array,
    //   default: function(){
    //     return [];
    //   }
    // },
    defaultExpanded:{
      type: Array,
      default: function(){
        return [];
      }
    },
    activeData: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      treeActive: '',
      singletree: false,
      treeDefaultExpanded: [],
      isHidetree: false,
    };
  },
  methods: {
    treeDataUpdate() {
      let data = this.treeData;
      let array = [];
      data.forEach((item) => {
        array.push(item);
      });

      this.data = array;
    },
    handleNodeClick(data) {
      this.treeActive = data.value;
      let group = this.treeData[0]["group"];
      let columnname = this.treeData[0]["columnname"];
      data.group = group;
      data.columnname = columnname;
      this.$emit("treeClick", data);
    },
    hidetree(){
      this.isHidetree = !this.isHidetree;
    },
    defaultExpandedUpdate(array){
      if(array.length > 0){
        let treeDefaultExpanded = this.treeDefaultExpanded;
        let defaultExpanded = this.defaultExpanded;
        defaultExpanded.forEach(item =>{
          treeDefaultExpanded.push(item);
        })

        let active = treeDefaultExpanded[0];
        this.treeActive = active;
        this.$nextTick(() =>{
          this.$refs.mainTree.setCurrentKey(active)
        })
      }
    },
  },
  watch: {
    treeData(newVal) {
      this.treeDataUpdate();
    },
    treeActive(newval){
      console.log(newval)
    },
    defaultExpanded(newVal){
      this.defaultExpandedUpdate(newVal);
    }
  },
};
</script>
<style lang="scss" scoped>
.tree-box {
  height: 100%;
  margin-right: 10px;
  background-color: #fff;
  display: flex;
  .el-tree {
    width: 260px;
    height: 100%;
    display: inline-block;
    overflow: hidden;
  }
  .hidetree{
    width: 0;
    transition: all .3s;
  }
  button {
    height: 100%;
    vertical-align: top;
  }
}
</style>