<template>
  <div class="list">
    <template v-for="(item, index) in tabData">
      <div class="list-item" :key="index">
        <el-row class="list-item-title">
          <span>第{{ index + 1 }}题：{{ item["题目"] }}</span>
          <span>【{{ item["答案"][0]["选项类型"] }}】</span>
        </el-row>
        <el-table :data="item['答案']" border>
          <template v-for="(item2, index2) in tabHead">
            <el-table-column v-if="item2['label'] == '比例'" :key="index2" :prop="item2['prop']" :label="item2['label']" show-overflow-tooltip>
              <template v-slot="scop">
                <el-progress v-if="scop.row[scop.column.property]" :percentage="scop.row[scop.column.property] * 100" :stroke-width="10"></el-progress>
              </template>
            </el-table-column>
            <el-table-column v-else-if="item2['label'] != '选项类型'" :key="index2" :prop="item2['prop']" :label="item2['label']" show-overflow-tooltip></el-table-column>
          </template>
        </el-table>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "meetingTemplate",
  data() {
    return {
      tabHead: [],
    };
  },
  props: {
    tabData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    tabDataHeadUpdate(){
      let tabHeadData = this.tabData[0]["答案"];
      let tabHead = Object.keys(tabHeadData[0]).map(key =>{
          return {
            label: key,
            prop: key,
          }
      })

      this.tabHead = tabHead;
    }
  },
  created(){
    this.tabDataHeadUpdate();
  },
  watch: {
    tabData(newVal) {
     // this.tabDataUpdate();
    },
  },
};
</script>
<style lang="scss" scoped>
.list{
  border: 1px solid #dadada;
  padding: 0 15px;
  overflow: auto;
  flex: 1;
  margin: 15px 0;
  .list-item{
    padding: 15px 0;
    .list-item-title{
      margin-bottom: 10px;
      color: #888;
      font-size: 14px;
    }
    /deep/th{
      background-color: #ccc;
    }
  }
  .list-item:nth-child(n+2){
    border-top: 1px dashed #dadada
  }
}
</style>