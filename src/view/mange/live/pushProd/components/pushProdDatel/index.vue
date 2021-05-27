<template>
    <el-table 
    :data="tableData"
    border
    >
        <el-table-column
        label="图片"
        >
        <template v-slot="scope">
            <el-image :src="scope.row.PictureCode"></el-image>
        </template>
        </el-table-column>
        <el-table-column
        prop="GuideContent"
        label="短号或搭配号"
        ></el-table-column>
        <el-table-column
        prop="ProdCode"
        label="款号"
        ></el-table-column>
        <el-table-column
        prop="State"
        label="状态"
        
        >
        <template v-slot="scope">
            <div :class="scope.row.State == '已推送' ? 'explanation':'pushed'">{{ scope.row.State }}</div>
        </template>
        </el-table-column>
        <el-table-column
        label="操作"
        >
        <el-button type="text">移除</el-button>
        </el-table-column>
    </el-table>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

export default{
    name: 'pushProdDatel',
    props:{
        pushProdData:{
            type:Array,
            default:() =>{
                return []
            }
        }
    },
    data(){
        return{
            tableData: [],
        }
    },
    methods:{
        tableDataUpdate(){
            let tableData = this.pushProdData;
            let newtableData = [];
            tableData.forEach(item =>{
                newtableData.push(item)
                console.log(item)
                if(item["PictureCode"] && item["PictureCode"] != ''){
                    item["PictureCode"] = 'http://ipad.lenxdt.com/ProductImages/PictureSmaller/' + item["PictureCode"] + '.png'
                }
            })

            this.tableData = newtableData;
        },
        ceshi(val){
            console.log(val)
        }
    },
    watch:{
        pushProdData(){
            this.tableDataUpdate();
        }
    },
}
</script>
<style lang="scss" scoped>
.explanation{
    color: #f56c6c;
}
.pushed{
    color: #67c23a;
}
</style>
