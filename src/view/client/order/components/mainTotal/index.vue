<template>
    <el-row>
        <ul>
            <li class="qtysum order">
                <span>总订量</span>
                <span>0</span>
            </li>
            <li class="amount order">
                <span>吊牌额</span>
                <span>0</span>
                </li>
            <li class="discount order">
                <span>折后额</span>
                <span>0</span>
                </li>
            <li>
                <el-button round>提交订单</el-button></li>
            <li>
                <el-button round>打印订单</el-button></li>

        </ul>
    </el-row>
</template>
<style lang="scss" scoped>
.el-row{
    height: 115px;
    background-color: #5A5A66;
    ul{
        line-height: 75px;
    }
    li{
        margin-right: 20px;
        display: inline-block;
    }
    .order{
        width: 100px;
        height: 65px;
        text-align: center;
        background-color: #757585;
        vertical-align: middle;
        span{
            color: #e4e4e6;
            display: block;
            width: 100%;
            height: 50%;
            line-height: 32.5px;
        }
        span:first-child{
            font-size: 14px;
        }
        span:last-child{
            font-size: 20px;
            color: #58B5F0;
        }
    }
    .el-button{
        background-color: #58B5F0;
        color: #fff;
        border: 0;
    }

}
</style>