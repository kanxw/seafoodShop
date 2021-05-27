<template>
  <div class="table-box" :style="tableData.length > 0 ? '' : 'flex:unset;'">
    <template v-if="toolBarData.length > 0">
      <div class="toolBar-box">
        <el-button-group>
          <template v-for="item in toolBarData">
            <el-button
              v-if="item.datatype == 'button'"
              :icon="item.icon"
              :key="item.columnname"
              type="primary"
              @click="tabletopbtnclick(item.columnname)"
              size="small"
              >{{ item.chinesename }}</el-button
            >
          </template>
        </el-button-group>
        <template v-for="item in toolBarData">
          <label v-if="item.datatype == 'label'" :key="item.columnname"
            >{{ item.chinesename + " "
            }}<span>{{ selectRow.length }}</span></label
          >
          <el-link
            v-else-if="item.datatype == 'hyperlink'"
            :key="item.columnname"
            :underline="false"
            type="primary"
            @click="tabletopbtnclick(item.columnname)"
            >{{ item.chinesename }}</el-link
          >
        </template>
        <slot name="printTemplate"></slot>
      </div>
    </template>
    <slot name="tableTabs"></slot>
    <slot name="template"></slot>
    <slot name="tableType"></slot>
    <el-table
      v-if="isShowTable"
      ref="table"
      @row-click="rowClick"
      @header-click="headerClick"
      :data="tableData"
      border
      stripe
      size="mini"
      :style="tableData.length > 0 ? '' : 'flex:unset;'"
      :height="tableData.length == 0 ? 65 : tableheight"
    >
      <el-table-column
        v-if="tableData.length > 0 && showTableSelection"
        type="selection"
        class-name="rowSelect"
      ></el-table-column>
      <template v-for="item in tableHeardData">
        <el-table-column
          v-if="item.isshow"
          :label="item.label"
          :prop="item.prop"
          :key="item.label"
          :fixed="item.fixed"
          resizable
          show-overflow-tooltip
          :width="item.width"
          :align="item.align"
        >
          <template v-slot="scope">
            <rghxtable-slot
              v-if="item.render"
              :render="item.render"
              :row="scope.row"
              :index="scope.$index"
              :column="item"
            />
            <span v-else> {{ scope.row[scope.column.property] }}</span>
          </template>
          <template v-if="item.children">
            <el-table-column
              v-for="item2 in item.children"
              :key="item2.label"
              :label="item2.label"
              :prop="item2.prop"
              :fixed="item2.fixed"
              resizable
              show-overflow-tooltip
              :align="item2.align"
            >
              <template #header="scope">
                <span v-html="scope.column.label"></span>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
import rghxtableSlot from "./slot";

export default {
  name: "tableList",
  props: {
    layoutData: {
      type: Object,
      default: null,
    },
    listData: {
      type: Object,
      default: null,
    },
    toolbar: {
      type: Array,
      default: () => {
        return [];
      },
    },
    showTable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      toolBarData: [],
      tableHeardData: [],
      tableData: [],
      selectRow: [],
      tableheight: 0,
      showTableSelection: false,
      isShowTable: true,
      dialogdata: {
        type: "dialog",
        title: "提示",
        dialogVisible: false,
        width: "420px",
        center: false,
        data: {},
        icon: "el-icon-warning-outline",
      },
    };
  },
  components: {
    rghxtableSlot,
  },
  methods: {
    ceshi(option) {
      console.log(option, "this is option");
    },
    toolBarDataUpdate(val) {
      this.toolBarData = val;
      this.showTableSelection =
        val.filter((item) => {
          return item["datatype"] == "label";
        }).length > 0
          ? true
          : false;
    },
    listDataUpdate(newVal) {
      if (this.tableData.length > 0) {
        this.tableData = [];
        this.tableHeardData = [];
      }

      let datalist = newVal.data.data;
      let hidecolumn = newVal.data.hidecolumn ? newVal.data.hidecolumn : '';
      let left = newVal.data.fixleft ? newVal.data.fixleft : '';
      let right = newVal.data.fixright ? newVal.data.fixright : '';
      let hearddata = [],
        tableData = [],
        i = 0;
      for (let val of datalist) {
        let obj = {};
        for (let key in val) {
          if (i == 0) {
            let headValArray = val[key].split("|");
            if (headValArray.length > 1 && key != "操作") {
              hearddata.push({
                isshow: hidecolumn.indexOf(key.trim()) < 0 ? true : false,
                prop: key.trim(),
                fixed: left.indexOf(key.trim()) > 0 ? true : false,
                label: key.trim(),
                width:
                  stringLength(key) * 12 < 100 ? 100 : stringLength(key) * 12,
                render: (h, params) => {
                  let valArray = params.row[key.trim()].split("|");
                  let handle = Number(valArray[0]) === 1 ? false : true; // 是否允许点击
                  let colorType = valArray[1]; // 颜色类型或者图标类型
                  let icon = valArray[2]; // icon
                  let tooltip = valArray[3]; // 提示语
                  let text = valArray[4]; // 数据内容
                  return h("div", [
                    h(
                      "el-tooltip",
                      {
                        attrs: {
                          content: tooltip,
                          effect: "light",
                          popperClass: "tooltipcolor",
                        },
                      },
                      [
                        h("el-link", {
                          attrs: {
                            underline: handle,
                            type: handle ? "info" : "primary",
                            icon: icon,
                            disabled: handle,
                          },
                          style: {
                            fontSize: "12px",
                            cursor: handle ? "pointer" : "default",
                          },
                          on: {
                            click: (e) => {
                              e.stopPropagation();
                              this.tableClick(tooltip, params.row);
                            },
                          },
                        }),
                      ]
                    ),
                    text,
                  ]);
                },
              });
            } else if (key == "操作") {
              hearddata.push({
                isshow: hidecolumn.indexOf(key) ? true : false,
                prop: key.trim(),
                label: key.trim(),
                fixed: right.includes(key.trim()) ? "right" : false,
                align: "center",
                width: 150,
                //stringLength(key) * 12 < 100 ? 100 : stringLength(key) * 12,
                render: (h, params) => {
                  let btnArray = [];
                  let valArray = params.row[key.trim()].split("|");
                  valArray.forEach((element) => {
                    let elArray = element.split("@");
                    let disabled = elArray[2] ? true : false;
                    btnArray.push(
                      h(
                        "el-button",
                        {
                          style: {
                            border: 0,
                            padding: 0,
                          },
                          attrs: {
                            icon: elArray[1],
                            size: "mini",
                            disabled,
                            type: "text",
                          },
                          on: {
                            click: (e) => {
                              e.stopPropagation();
                              this.tableClick(elArray[0], params.row);
                            },
                          },
                        },
                        elArray[0]
                      )
                    );
                  });

                  return h("div", btnArray);
                },
              });
            } else if (key.toUpperCase() == "KEY" || key == "num") {
              obj[key.trim()] = val[key];
              continue;
            } else if (key.includes("@")) {
              let keyArray = key.trim().split("@");
              if (
                keyArray[1] == "尺码" ||
                keyArray[1].endsWith("量") ||
                keyArray[1].endsWith("额") ||
                keyArray[1].endsWith("数") ||
                keyArray[1].endsWith("性")
              ) {
                let sizeArray = hearddata.filter((item) => {
                  return item["label"] == keyArray[1];
                });

                if (sizeArray.length == 0) {
                  let children = [];
                  children.push({
                    isshow: hidecolumn.indexOf(key) < 0 ? true : false,
                    label: keyArray[0],
                    prop: key.trim(),
                    fixed: left.includes(key.trim()) ? true : false,
                  });

                  hearddata.push({
                    isshow: hidecolumn.indexOf(key) < 0 ? true : false,
                    label: keyArray[1],
                    prop: keyArray[1],
                    fixed: left.includes(key.trim()) ? true : false,
                    width:
                      stringLength(key) * 12 < 100
                        ? 100
                        : stringLength(key) * 12,
                    children,
                  });
                } else {
                  let children = sizeArray[0].children;
                  children.push({
                    isshow: hidecolumn.indexOf(key) < 0 ? true : false,
                    label: keyArray[0],
                    prop: key.trim(),
                    fixed: left.includes(key.trim()) ? true : false,
                    width:
                      stringLength(key) * 12 < 100
                        ? 100
                        : stringLength(key) * 12,
                  });
                }
              } else if (
                keyArray[0].endsWith("量") ||
                keyArray[0].endsWith("额") ||
                keyArray[0].endsWith("数") ||
                keyArray[0].endsWith("比")
              ) {
                let array = hearddata.filter((item) => {
                  return item["label"] == keyArray[0];
                });

                if (array.length == 0) {
                  let children = [];
                  children.push({
                    isshow: hidecolumn.indexOf(key) < 0 ? true : false,
                    label: keyArray[1],
                    prop: key.trim(),
                    fixed: left.includes(key.trim()) ? true : false,
                  });

                  hearddata.push({
                    isshow: hidecolumn.indexOf(key) < 0 ? true : false,
                    label: keyArray[0],
                    prop: keyArray[0],
                    fixed: left.includes(key.trim()) ? true : false,
                    width:
                      stringLength(key) * 12 < 100
                        ? 100
                        : stringLength(key) * 12,
                    children,
                  });
                } else {
                  let children = array[0].children;
                  children.push({
                    isshow: hidecolumn.indexOf(key) < 0 ? true : false,
                    label: keyArray[1],
                    prop: key.trim(),
                    fixed: left.includes(key.trim()) ? true : false,
                    width:
                      stringLength(key) * 12 < 100
                        ? 100
                        : stringLength(key) * 12,
                  });
                }
              } else {
                hearddata.push({
                  isshow: hidecolumn.indexOf(key.trim()) < 0 ? true : false,
                  prop: keyArray[0],
                  fixed: left.indexOf(key.trim()) > 0 ? true : false,
                  label: keyArray[0],
                  width:
                    stringLength(key) * 12 < 100 ? 100 : stringLength(key) * 12,
                  children: {},
                  render: (h, params) => {
                    let values = params.row[key.trim()];
                    if (values == "") {
                      return null;
                    } else if (keyArray[1] == "image") {
                      return h(
                        "div",
                        {
                          class: "image-box",
                        },
                        [
                          h("el-image", {
                            attrs: {
                              src:
                                "http://ipad.lenxdt.com/ProductImages/PictureSmaller/" +
                                values +
                                ".png",
                            },
                          }),
                        ]
                      );
                    } else if (keyArray[1] == "video") {
                      return h("el-button", {
                        attrs: {
                          icon: "el-icon-video-play",
                          type: "text",
                          size: "medium",
                        },
                        class: "videoPlay",
                      });
                    } else if (keyArray[1] == "json") {
                      values = JSON.parse(values);
                      let valuesArray = [];
                      values.forEach((item) => {
                        valuesArray.push(
                          h("div", { class: "item-box" }, [
                            h("div", { class: "left-img" }, [
                              h("el-image", {
                                attrs: {
                                  src:
                                    "http://ipad.lenxdt.com/ProductImages/PictureSmaller/" +
                                    item["图片"] +
                                    ".png",
                                },
                              }),
                            ]),
                            h("div", { class: "right-text" }, [
                              h("span", item["款色"]),
                              h("span", item["品名"]),
                            ]),
                          ])
                        );
                      });

                      return valuesArray;
                    }
                  },
                });
              }
            } else {
              hearddata.push({
                isshow: hidecolumn.indexOf(key) < 0 ? true : false,
                label: key.trim(),
                prop: key.trim(),
                fixed: left.includes(key.trim()) ? true : false,
                width:
                  stringLength(key) * 12 < 100 ? 100 : stringLength(key) * 12,
              });
            }
          }

          obj[key.trim()] = val[key];
        }

        i++;
        tableData.push(obj);
      }

      this.tableHeardData = hearddata;
      let thistableheight = tableData.length * 25;
      let offsetHeight = 0;

      this.$nextTick(() => {
        this.tableData = tableData;
      });

      setTimeout(() => {
        if (this.$refs.table) {
          // this.tableheight = 0;
          offsetHeight = this.$refs.table.$el.offsetHeight;
          if (thistableheight < offsetHeight) {
            this.tableheight = 0;
          } else {
            this.tableheight = 1;
          }

          if (tableData.length == 0) {
            this.tableheight = 65;
          }
        }
      }, 0);

      // 字符长度
      function stringLength(str) {
        if (str == null) return 0;
        if (typeof str != "string") {
          str += "";
        }
        return str.replace(/[^\x00-\xff]/g, "01").length;
      }
    },
    headerClick(column, event) {
      let { className } = column;
      if (className != "rowSelect") {
        return;
      }

      this.isSelectOrIsSelectAll(event, true);
    },
    selectDataReset() {
      let { tableData, showTableSelection, selectRow } = this;
      // 定义点击类名
      let className = "is-checked";
      if (!showTableSelection) {
        return;
      }

      // 获取左侧冻结列
      let table = this.$refs.componentsTable.$el;
      let tableLeftFixed = table.querySelectorAll(".el-table__fixed");
      if (tableLeftFixed.length === 0) {
        return;
      }

      //拆分表头表格、去除隐藏列
      let allSelection = tableLeftFixed[0].querySelectorAll(".rowSelect");
      let notHiddenSelection = [];
      let headSelection = [];
      Array.from(allSelection).forEach((item) => {
        if (
          !item["className"].includes("is-hidden") &&
          !item["className"].includes("is-leaf")
        ) {
          notHiddenSelection.push(item);
        } else if (item["className"].includes("is-leaf")) {
          headSelection.push(item);
        }
      });

      if (notHiddenSelection.length > 0) {
        for (let index in tableData) {
          let elCheckBox = notHiddenSelection[index].querySelectorAll(
            ".el-checkbox"
          )[0];
          let elCheckBoxInput = notHiddenSelection[index].querySelectorAll(
            ".el-checkbox__input"
          )[0];
          elCheckBox["className"] = elCheckBox["className"].replace(
            className,
            ""
          );
          elCheckBoxInput["className"] = elCheckBoxInput["className"].replace(
            className,
            ""
          );
        }
      }

      this.selectRow.length = 0;
      if (headSelection.length > 0) {
        let elCheckboxInput = headSelection[0].querySelectorAll(
          ".el-checkbox__input"
        );
        let elCheckboxOriginal = headSelection[0].querySelectorAll(
          ".el-checkbox__original"
        );
        elCheckboxInput[0]["className"] = elCheckboxInput[0]["className"]
          .replace(className, "")
          .replace("is-indeterminate", "");
        elCheckboxOriginal[0]["ariaHidden"] = "false";
        elCheckboxInput[0]["ariaChecked"] = null;
      }
    },
    rowClick(row, column, event) {
      this.isSelectOrIsSelectAll(event, false, row);
      // 查找点击行的index
      // let i = 0;
      // while ((event = event.previousSibling) != null) i++;
    },
    isSelectOrIsSelectAll(event, isSelectAll, row = {}) {
      let { tableData, showTableSelection, selectRow } = this;

      // 定义点击类名
      let className = "is-checked";
      if (!showTableSelection) {
        return;
      }

      // 获取当前table
      let table = this.$refs.table.$el;

      // 获取左侧冻结列
      let tableLeftFixed = table.querySelectorAll(".el-table__fixed");
      let allSelection = table.querySelectorAll(".rowSelect");
      if (tableLeftFixed.length !== 0) {
        allSelection = tableLeftFixed[0].querySelectorAll(".rowSelect");
      }

      //拆分表头表格、去除隐藏列
      let notHiddenSelection = [];
      let headSelection = [];
      Array.from(allSelection).forEach((item) => {
        if (
          !item["className"].includes("is-hidden") &&
          !item["className"].includes("is-leaf")
        ) {
          notHiddenSelection.push(item);
        } else if (item["className"].includes("is-leaf")) {
          headSelection.push(item);
        }
      });

      if (notHiddenSelection.length > 0) {
        let elCheckBoxArray = [];
        let elCheckBoxInputArray = [];
        if (isSelectAll) {
          //全选点击

          // 是否部分选择状态
          let isSkipClickRow = false;
          if (selectRow.length == tableData.length) {
            selectRow = [];
          } else {
            selectRow = Object.values(tableData);
            isSkipClickRow = true;
          }

          for (let index in tableData) {
            let thisInputBox = notHiddenSelection[index].querySelectorAll(
              ".el-checkbox"
            )[0];
            if (
              thisInputBox["className"].includes(className) &&
              isSkipClickRow
            ) {
              //跳过已选行
              continue;
            }

            elCheckBoxArray.push(
              notHiddenSelection[index].querySelectorAll(".el-checkbox")[0]
            );
            elCheckBoxInputArray.push(
              notHiddenSelection[index].querySelectorAll(
                ".el-checkbox__input"
              )[0]
            );
          }

          addOrRemoveClassName(elCheckBoxArray, className);
          addOrRemoveClassName(elCheckBoxInputArray, className);
        } else {
          //行点击 获取变更选中状态节点
          for (let index in tableData) {
            if (Object.is(tableData[index], row)) {
              elCheckBoxArray.push(
                notHiddenSelection[index].querySelectorAll(".el-checkbox")[0]
              );
              elCheckBoxInputArray.push(
                notHiddenSelection[index].querySelectorAll(
                  ".el-checkbox__input"
                )[0]
              );
              break;
            }
          }

          addOrRemoveClassName(elCheckBoxArray, className);
          addOrRemoveClassName(elCheckBoxInputArray, className);
          if (elCheckBoxArray[0]["className"].includes(className)) {
            // 增加当前行
            selectRow.push(row);
          } else {
            // 移除当前行
            selectRow = selectRow.filter((item) => !Object.is(item, row));
          }
        }

        this.selectRow = selectRow;
      }

      function addOrRemoveClassName(array, className) {
        array.forEach((item) => {
          if (item["className"].includes(className)) {
            item["className"] = item["className"].replace(className, "");
          } else {
            item["className"] = item["className"] + " " + className;
          }
        });
      }

      if (headSelection.length > 0) {
        // 处理全选状态 全部未选，部分选中，全部选中
        let elCheckboxInput = headSelection[0].querySelectorAll(
          ".el-checkbox__input"
        );
        let elCheckboxOriginal = headSelection[0].querySelectorAll(
          ".el-checkbox__original"
        );
        if (selectRow.length === 0) {
          // 未选
          elCheckboxInput[0]["className"] = elCheckboxInput[0]["className"]
            .replace("is-checked", "")
            .replace("is-indeterminate", "");
          elCheckboxOriginal[0]["ariaHidden"] = "false";
          elCheckboxInput[0]["ariaChecked"] = null;
        } else if (selectRow.length < tableData.length) {
          // 部分
          elCheckboxInput[0]["className"] =
            elCheckboxInput[0]["className"]
              .replace("is-checked", "")
              .replace("is-indeterminate", "") + " is-indeterminate";
          elCheckboxOriginal[0]["ariaHidden"] = "true";
          elCheckboxInput[0]["ariaChecked"] = "mixed";
        } else {
          // 全部
          elCheckboxInput[0]["className"] =
            elCheckboxInput[0]["className"]
              .replace("is-checked", "")
              .replace("is-indeterminate", "") + " is-checked";
          elCheckboxOriginal[0]["ariaHidden"] = "false";
          elCheckboxInput[0]["ariaChecked"] = null;
        }
      }
    },
    tableClick(type, row) {
      this.$emit("tableClick", { type, row });
    },
    tabletopbtnclick(btnName) {
      let selectRow = this.selectRow;
      this.$emit("tableTopBtnClick", { btnName, selectRow });
    },
    tableDataInit() {
      this.data = Object.assign({}, this.$options.data());
      // this.tableData = Object.assign({}, this.$options.data().tableData);
      // this.tableHeardData = Object.assign({}, this.$options.data().tableHeardData);
      // this.tableheight = Object.assign({}, this.$options.data().tableheight);
    },
    dateFormat(row, column, cellValue, index) {
      console.log(row, column, cellValue, index);
    },
  },
  watch: {
    listData(val) {
      this.listDataUpdate(val);
    },
    toolbar(val) {
      this.toolBarDataUpdate(val);
    },
    showTable(val) {
      this.isShowTable = val;
    },
  },
};
</script>
<style lang='scss' scoped>
.table-box {
  padding: 5px 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .toolBar-box {
    padding: 10px 0;
  }
  .el-button-group {
    margin-right: 10px;
  }
  .el-link {
    margin: 0 5px;
  }
  label {
    font-size: 12px;
    margin-right: 10px;
  }
  /deep/.el-table td,
  /deep/.el-table th {
    padding: 0;
  }
  /deep/.rowSelect {
    .el-checkbox {
      pointer-events: none;
    }
  }
}

/deep/ .tooltipcolor {
  color: #409eff;
}
.image-box,
.item-box {
  height: 40px;
  text-align: center;
  .el-image {
    height: 100%;
    /deep/img {
      width: unset;
    }
  }
}

.item-box {
  display: inline-block;
  .left-img {
    width: 50px;
    height: 100%;
    display: inline-block;
  }
  .right-text {
    display: inline-block;
    height: 100%;
    text-align: left;
    span {
      display: block;
    }
  }
}

.videoPlay {
  font-size: 32px;
  color: #aaa;
  display: block;
  margin: 0 auto;
}
</style>