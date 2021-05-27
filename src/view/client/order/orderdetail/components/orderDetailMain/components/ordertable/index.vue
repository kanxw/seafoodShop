<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column
      fixed
      class-name="shop"
      align="center"
      prop="date"
      label="店铺"
      width="100"
    >
    </el-table-column>
    <el-table-column
      fixed
      align="center"
      class-name="color"
      prop="name"
      label="颜色"
      width="100"
    >
    </el-table-column>
    <el-table-column
      fixed
      align="center"
      class-name="edition"
      prop="province"
      label="版型"
      width="100"
    >
    </el-table-column>
    <el-table-column align="center" prop="city" label="X" width="80">
    </el-table-column>
    <el-table-column align="center" prop="address" label="M" width="80">
    </el-table-column>
    <el-table-column align="center" prop="zip" label="L" width="80">
    </el-table-column>
    <el-table-column align="center" prop="zip" label="L" width="80">
    </el-table-column>
    <el-table-column align="center" prop="zip" label="L" width="80">
    </el-table-column>
    <el-table-column align="center" prop="zip" label="L" width="80">
    </el-table-column>
    <el-table-column align="center" prop="zip" label="L" width="80">
    </el-table-column>
    <el-table-column
      align="center"
      class-name="qtysum"
      fixed="right"
      label="订量"
      width="80"
      prop="sumqty"
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },

  data() {
    return {
      tableData: [
        {
          date: "北京路2",
          name: "黄色",
          province: "修身",
          city: "110",
          address: " 1518",
          zip: 120,
          sumqty: 13,
        },
        {
          date: "北京路4",
          name: "黄色",
          province: "修身",
          city: "110",
          address: " 1517",
          zip: 120,
          sumqty: 13,
        },
        {
          date: "北京路1",
          name: "黄色",
          province: "修身",
          city: "110",
          address: " 1519",
          zip: 120,
          sumqty: 13,
        },
        {
          date: "北京路3",
          name: "黄色",
          province: "修身",
          city: "110",
          address: " 1516",
          zip: 120,
          sumqty: 13,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.el-table {
  padding: 0 20px;
  /deep/ .shop,
  /deep/.color,
  /deep/.edition,
  /deep/.qtysum {
    background-color: #f1f1f1;
    font-weight: bold;
    border: 1px solid #ddd;
    border-bottom: 0;
    border-right: 0;
  }
}
</style>
