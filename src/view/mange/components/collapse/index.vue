<template>
  <div class="option-box">
    <template v-if="item.datatype == 'text'">
      <span class="optionChineseName">{{ item.chinesename }}</span>
      <div class="optionValue-box">
        <el-input
          type="text"
          :placeholder="item.defaultvalue"
          :show-word-limit="item.hasOwnProperty('length')"
          :disabled="Boolean(item.readonly)"
          :maxlength="Number(item['length'])"
          @input="handleInput"
          :value="value"
        ></el-input>
      </div>
    </template>
    <template v-else-if="item.datatype == 'number'">
      <span class="optionChineseName">{{ item.chinesename }}</span>
      <div class="optionValue-box">
        <el-input
          type="text"
          :placeholder="item.defaultvalue"
          :show-word-limit="item.hasOwnProperty('length')"
          :disabled="item.readonly"
          :maxlength="Number(item['length'])"
          @input="handleInput"
          :value="value"
        ></el-input>
      </div>
    </template>
    <template v-else-if="item.datatype == 'select'"
      ><i v-if="item.required == '1'" class=""></i
      ><span class="optionChineseName">{{ item.chinesename }}</span>
      <div class="optionValue-box">
        <el-select placeholder="请选择" :value="value" @change="handleInput">
          <el-option
            v-for="item2 in item.data"
            :key="item2.value"
            :value="item2.value"
            :label="item2.label"
          ></el-option>
        </el-select>
      </div>
    </template>
    <template v-else-if="item.datatype == 'mutiselect'">
      <div class="brand">
        <i v-if="item.required == '1'" class=""></i
        ><span class="optionChineseName">{{ item.chinesename }}</span>
        <div class="optionValue-box">
          <el-select
            multiple
            placeholder="请选择"
            :value="value"
            @change="handleInput"
          >
            <el-option
              v-for="item2 in item.data"
              :key="item2.label"
              :value="item2.value"
              :label="item2.label"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="tip" v-if="item['columnname'] === 'Reserve1'">
        <i class="el-icon-warning"></i>限定后，该店铺只能订指定品牌的货品
      </div>
    </template>
    <template v-else-if="item.datatype == 'cascader'">
      <span class="optionChineseName">{{ item.chinesename }}</span>
      <div class="optionValue-box" >
        <el-cascader
          :options="item.data"
          @change="handleChange"
          :props="{ expandTrigger: 'hover' }"
          :value="value"
          :show-all-levels='false'
        ></el-cascader>
      </div>
    </template>
    <template v-else>
      <span class="optionChineseName">{{ item.chinesename }}</span>
      <el-switch :value="value" @change="handleInput"> </el-switch>
    </template>
  </div>
</template>
<script>
export default {
  name: "collapse",
  props: {
    item: {
      type: Object,
      default: null,
    },
    value: {
      type: [String, Array, Number, Boolean],
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleChange() {},
    handleInput(val) {
      this.$emit('input', val);
      this.$emit('change', val)
    },
  },
};
</script>
<style lang="scss" scoped>
.option-box {
  display: flex;
  .optionChineseName {
    display: inline-block;
    width: 71px;
    font-size: 12px;
    padding: 0 7px;
    text-align: right;
  }
  /deep/.optionValue-box {
    // width: 0;
    flex: 1;

    .el-tag.el-tag--info {
      color: #fff;
      background-color: #66b1ff;
      border-color: #66b1ff;
    }
    .el-select .el-tag__close.el-icon-close {
      background-color: unset;
      color: #fff;
    }
  }
  .tip {
    text-align: right;
    font-size: 12px;
    color: #f56c6c;
  }
  .brand {
    display: flex;
  }
}
</style>