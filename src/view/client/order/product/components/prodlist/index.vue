<template>
  <div
    class="prodlist"
    
  >
    <template 
    v-infinite-scroll="updateproList"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
    >
      <div
        v-for="(item, index) in prodlist"
        class="product"
        @click="openproddetail"
        :key="index"
      >
        <el-image :src="src"></el-image>
        <el-row>
          <el-row :gutter="10" class="p1">
            <el-col class="recommend">{{ item.recommendtype }}</el-col>
            <el-col class="mustprod">{{
              item.mustorder ? "必订款" : ""
            }}</el-col>
            <el-col class="imageprod">{{
              item.IsDisplayWindow ? "形象款" : ""
            }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="20">{{ item.prodcode }}</el-col>
            <el-col :span="4">{{ item.prodid }}</el-col>
          </el-row>
          <el-row>￥1999.00</el-row>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script>
import { productList } from "@/api/terminal/order/product";

export default {
  name: "prodlist",
  data() {
    return {
      showMenu: false,
      productData: [],
      prodlist: [],
      prodsize: 20,
      pageindex: 0,
      prodsizenew: 20,
      busy: false,
      src: require("small/CDL1V027W10.png"),
    };
  },
  components: {},
  methods: {
    async init() {
      productList()
        .then((res) => {
          if (res.data.msg == "操作成功") {
            this.productData = res.data.data;
            this.updateproList();
          } else {
            this.$message({
              type: "error",
              message: res.data.msg,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openproddetail() {
      console.log(1);
      this.$router.push("/orderDetail");
    },
    updateproList() {
      console.log(this.pageindex);
      this.busy = true;

      setTimeout(() => {
      for (
        let i = 0 + this.prodsize * this.pageindex;
        i < this.prodsizenew;
        i++
      ) {
        //console.log(i)
        this.prodlist.push(this.productData[i]);
      }

      this.pageindex++;
      this.prodsizenew = this.pageindex * this.prodsize;
        //console.log(this.data);
        this.busy = false;
      }, 1000);
      // for (
      //   let i = 0 + this.prodsize * this.pageindex;
      //   i < this.prodsizenew;
      //   i++
      // ) {
      //   //console.log(i)
      //   this.prodlist.push(this.productData[i]);
      // }

      // this.pageindex++;
      // this.prodsizenew = this.pageindex * this.prodsize;
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang='scss' scoped>
.prodlist {
  padding-right: 15px;
  .product {
    display: inline-block;
    width: calc(25% - 20px);
    margin: 20px 0 0 20px;
    background-color: #fff;
  }
  .el-image {
    display: block;
  }
  .el-row {
    margin: 5px;
    font-size: 14px;
  }
  .p1 {
    font-size: 12px;
    color: #fff;
    .el-col-24 {
      margin-left: 8px;
      padding: 1px 5px;
      text-align: center;
      width: unset;
    }
  }
  .mustprod,
  .imageprod {
    background-color: red;
  }
  .recommend {
    background-color: #58b5f0;
  }
}
</style>