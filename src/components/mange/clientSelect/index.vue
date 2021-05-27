<template>
<el-form>
  <el-form-item :label="clientLevelTitle">
  <el-cascader
    size="small"
    :visible.sync="isShow"
    v-model="value"
    :options="cascaderData"
    :props="{ expandTrigger: 'hover',multiple: true, emitPath: false }"
    :show-all-levels="false" 
    style="width:100%;"
    :placeholder='tipTitles'
  ></el-cascader>
  </el-form-item>
</el-form>
</template>
<script>
import { GetClientLevel } from "@/api/mange/shop/publicMethod";

export default {
  name: "clientSelect",
  data() {
    return {
      isShow: false,
      cascaderData: [],
      value: [],
      tipTitles:'',
      clientLevel:{
        0: '店铺',
        1: '经销商',
        2: '总代',
        3: '大区',
        4: '总部',
      },
      clientLevelTitle: '',
    };
  },
  methods: {
    show(option) {
      let {clientLevel, row} = option;
      let clientLevelTitle = this.clientLevel[clientLevel];
      this.tipTitles = '请输入' + clientLevelTitle +'编号或' + clientLevelTitle + '名称'
      this.clientLevelTitle = clientLevelTitle;
      let params = {
        flag: clientLevel,
      };

      GetClientLevel(params)
        .then((res) => {
          if (res.data.errormsg == "") {
            let data = res.data.data;
            this.cascaderData = data;
          }

          if(row){
            this.value.push(row['Key'])
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    valueClear(){
      this.value = [];
    },
  },
};
</script>