<template>
  <div class="list-box">
    <el-form :model="seachData">
      <template v-for="(item, index) in screenArray">
        <el-form-item
          :key="index"
          size="mini"
          v-if="
            item['taboptions']
              ? item['taboptions'].includes(formData['other']['tabindex'])
              : true
          "
        >
          <el-select
            v-if="item.datatype.includes('select')"
            v-model="seachData[item.group][item.columnname]"
            :placeholder="item.chinesename"
          >
            <el-option
              v-for="(value, key) in item.data"
              :label="value"
              :value="key"
              :key="key"
            ></el-option>
          </el-select>
          <el-input
            v-else-if="item.datatype == 'text'"
            v-model="seachData[item.group][item.columnname]"
            :placeholder="item.chinesename"
          ></el-input>
          <el-cascader
            v-else-if="item.datatype == 'cascader'"
            v-model="seachData[item.group][item.columnname]"
            :placeholder="item.chinesename"
            :options="item.data"
            :props="{
              expandTrigger: 'hover',
              checkStrictly: true,
              multiple: true,
            }"
            :show-all-levels="false"
            collapse-tags
          ></el-cascader>
          <el-cascader
            v-else-if="item.datatype == 'advancedfilter'"
            v-model="seachData[item.group][item.columnname]"
            :placeholder="item.chinesename"
            :options="item.data"
            :props="{
              expandTrigger: 'hover',
              multiple: true,
              checkStrictly: false,
            }"
            :show-all-levels="true"
            collapse-tags
          ></el-cascader>
          <el-radio-group
            class=""
            v-else-if="item.datatype == 'radio'"
            size="mini"
            v-model="seachData[item.group][item.columnname]"
          >
            <el-radio-button
              v-for="(value, key) in item.data"
              :key="key"
              :label="key"
              >{{ value }}</el-radio-button
            >
          </el-radio-group>
          <el-date-picker
            v-model="seachData[item.group][item.columnname]"
            v-else-if="item.datatype == 'date'"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
          <el-button
            v-if="index == screenArray.length - 1"
            icon="el-icon-refresh-left"
            @click="searchClear"
            >重置</el-button
          >
          <el-button
            v-if="index == screenArray.length - 1"
            icon="el-icon-search"
            type="primary"
            @click="search"
            >搜索</el-button
          >
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "screen",
  props: {
    formData: {
      type: Object,
      default: null,
    },
    screenData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      screenArray: [],
      seachData: {},
    };
  },
  methods: {
    searchClear() {
      this.formDataCreate();
    },
    search() {
      this.$emit("screenSearch", this.seachData);
    },
    formDataCreate() {
      let fromData = this.formData;
      let seachData = {};
      for (let key in fromData) {
        let value = Object.assign({}, fromData[key]);
        seachData[key] = value;
      }

      this.seachData = seachData;
    },
  },
  watch: {
    screenData(newVal) {
      this.screenArray = newVal;
      this.formDataCreate();
    },
  },
};
</script>
<style lang='scss' scoped>
.list-box {
  background-color: #f0f2f5;
}
.el-form {
  background-color: #fff;
  margin-bottom: 10px;
  .el-form-item {
    margin: 5px;
    /deep/ .el-form-item__content {
      line-height: unset;
      white-space: nowrap;
    }
    /deep/.el-input--mini {
      max-width: 160px;
    }
    .el-button {
      margin-left: 10px;
    }
  }
  .el-select {
    line-height: unset;
  }
}
</style>