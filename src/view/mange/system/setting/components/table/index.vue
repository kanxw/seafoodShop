<template>
  <div class="table-box">
    <template v-for="(value, key) in tableData">
      <el-row :key="key" style="overflow-x:auto;">
        <el-form-item size="mini">
          <el-button v-if="Object.keys(tableData).length > 1" type="text">{{ key }}</el-button>
          <el-button v-else>点击添加新行</el-button>
          <el-table :data="value" border size="mini">
            <template v-for="(item, index) in tableHead[key]">
              <el-table-column
                :key="index"
                :label="item.label"
                :prop="item.prop"
                :width="item.width"
              >
                <template v-if="item.slottype" v-slot="scope">
                  <el-input
                    v-if="item.slottype == 'input'"
                    v-model="scope['row'][scope.column.property]"
                    :disabled="item.disabled"
                  ></el-input>
                  <el-select v-else-if="item.slottype == 'select'" v-model="scope['row'][item.value]">
                    <el-option v-for="(item2, index2) in scope['row'][scope.column.property]" :key="index2" :label="item2.label" :value="item2.value"></el-option>
                  </el-select>
                  <el-switch v-else-if="item.slottype == 'switch'" v-model="scope['row'][scope.column.property]" inactive-value="false" active-value="True"></el-switch>
                  <el-button v-else-if="item.slottype == 'button'" icon="el-icon-delete" type="text">删除</el-button>
                  <!-- <el-button @click="test(scope)"></el-button> -->
                </template>
              </el-table-column>
            </template>
          </el-table>
        </el-form-item>
      </el-row>
    </template>
  </div>
</template>
<script>
export default {
  name: "settingTable",
  props: {
    tableData: {
      type: Object,
      default: null,
    },
    tableHead: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      newtabledata: {},
      selectActive: '',
      formData: {},
    };
  },
  methods: {
    test(val) {
      console.log(val);
      console.log(val['row'][val.column.property])
    },
    tabledataUpdate() {
      let tableData = this.tableData;
      let tableHead = this.tableHead;
      let newtabledata = {};
      tableData.forEach((el) => {});

      this.newtabledata = newtabledata;
    },
  },
  watch: {
    tableData(val) {
      console.log(this.tableData);
      this.tabledataUpdate();
    },
  },
  created() {
    //this.tabledataUpdate();
  },
  mounted() {
    console.log("789");
  },
};
</script>