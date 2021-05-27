<template>
  <el-col class="selectproperties-box">
    <el-row class="row-box" type="flex">
      <el-row>选择属性</el-row>
      <el-row class="selectproperties whitebgc flex-one margintopdown10">
        <div class="tree-box">
          <el-tree
            :data="treeData"
            @node-click="handleNodeClick"
            default-expand-all
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span class="button-box">
                <el-button
                  type="text"
                  size="mini"
                  @click="addBtnClick(data, 'row')"
                  v-if="data.btn && data.btn.includes('Row')"
                  :disabled="fieldName2.col.value.includes(data.value)"
                  :class="{
                    activecolor: fieldName2.row.value.includes(data.value),
                  }"
                >
                  {{
                    fieldName2.row.value.includes(data.value)
                      ? "从行区移除"
                      : "添加到行区"
                  }}
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="addBtnClick(data, 'col')"
                  v-if="data.btn && data.btn.includes('Col')"
                  :class="{
                    activecolor: fieldName2.col.value.includes(data.value),
                  }"
                  :disabled="
                    fieldName2.row.value.includes(data.value) ||
                    (fieldName2.col.value.length == 1 &&
                      !fieldName2.col.value.includes(data.value))
                  "
                >
                  {{
                    fieldName2.col.value.includes(data.value)
                      ? "从列区移除"
                      : "添加到列区"
                  }}
                </el-button>
                 <el-button
                  type="text"
                  size="mini"
                  @click="addBtnClick(data, 'val')"
                  v-if="data.btn && data.btn.includes('Value')"
                  :class="{'activecolor':fieldName2.val.value.includes(data.value)}"
                >
                  {{ fieldName2.val.value.includes(data.value) ? "从数据区移除" : "添加到数据区" }}
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </el-row>
    </el-row>
    <el-row class="row-box" type="flex">
      <el-row>
        <el-col :span="12">行区</el-col>
        <el-col :span="12" class="paddingleft">列区</el-col>
      </el-row>
      <el-row class="attributeshow-box flex-one margintopdown10">
        <el-col class="col-box whitebgc">
          <!-- <pre>{{rowActive}}</pre> -->
          <el-tag v-for="tag in fieldName2.row.label" :key="tag" closable>
            {{ tag }}
          </el-tag>
        </el-col>
        <el-col class="col-box flex-column paddingleft">
          <el-row class="col-select whitebgc flex-one">
            <el-tag v-for="tag in fieldName2.col.label" :key="tag" closable>
              {{ tag }}
            </el-tag>
          </el-row>
          <el-row class="margintopdown10">数值区</el-row>
          <el-row class="value-select whitebgc flex-one">
            <el-tag v-for="tag in fieldName2.val.label" :key="tag" closable>
              {{ tag }}
            </el-tag>
          </el-row>
        </el-col>
      </el-row>
    </el-row>
  </el-col>
</template>
<script>
export default {
  name: "selectProperties",
  props: {
    layoutTreeData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      rowActive: {},
      colActive: {},
      valActive: [],
      treeData: [],
      fieldName: {},
      fieldName2: {
        row: {
          label: [],
          value: [],
        },
        col: {
          label: [],
          value: [],
        },
        val: {
          label: [],
          value: [],
        },
      },
    };
  },
  methods: {
    handleNodeClick(data) {
      //console.log(data);
    },
    layoutTreeDataUpdat() {
      let layoutTreeData = this.layoutTreeData;
      let fieldName = this.fieldName;
      let treeData = [];
      layoutTreeData.forEach((item) => {
        let children = item.children;
        let newChildren = [];
        children.forEach((obj) => {
          let name = obj.value;
          let newObj = Object.assign({}, obj);
          let labelArray = newObj.label.split("-");
          newObj.label = labelArray[0];
          newObj.btn = labelArray[1];
          newChildren.push(newObj);
          fieldName[name] = labelArray[0];
        });

        let newItem = Object.assign({}, item);
        newItem.children = newChildren;
        treeData.push(newItem);
      });

      this.treeData = treeData;
    },
    addBtnClick(data, btnType) {
      console.log(data);
      let addData = this.fieldName2[btnType];
      let { label, value } = addData;
      let index = value.indexOf(data.value);
      if (index > -1) {
        value.splice(index, 1);
        label.splice(index, 1);
      } else {
        label.push(data.label);
        value.push(data.value);
      }

      this.$emit('selectedUpdate', this.fieldName2);
    },
    activeUpdat(option) {
      let {row, col, val} = this.fieldName2;
      let fieldName = this.fieldName;
      row.label.length = 0;
      row.value.length = 0;
      col.label.length = 0;
      col.value.length = 0;
      val.label.length = 0;
      val.value.length = 0;
      for (let key in fieldName) {
        if (option.RowField.includes(key)) {
          row.label.push(fieldName[key]);
          row.value.push(key);
        } else if (option.DataField.includes(key)) {
          val.label.push(fieldName[key]);
          val.value.push(key);
        } else if (option.ColumnField.includes(key)) {
          col.label.push(fieldName[key]);
          col.value.push(key);
        }
      }
    },
  },
  watch: {
    layoutTreeData() {
      console.log("123");
      this.layoutTreeDataUpdat();
    },
  },
};
</script>
<style lang="scss" scoped>
.selectproperties-box {
  width: 400px;
  padding: 0 10px;
  .whitebgc {
    background-color: #fff;
    border-radius: 5px;
  }
  .flex-one {
    flex: 1;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
  }
  .paddingleft {
    padding-left: 15px;
  }
  .margintopdown10 {
    margin: 10px 0;
  }
  .selectproperties {
    overflow: hidden;
    height: 0;
    .tree-box {
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
  }
  .activecolor {
    color: rgb(245, 108, 108);
  }
  .button-box {
    display: inline-block;
    margin-left: auto;
  }
  .row-box {
    height: 50%;
    flex-direction: column;
    .col-box {
      width: 50%;
      height: 100%;
    }
    .custom-tree-node {
      width: 100%;
      display: flex;
    }
  }
}
</style>