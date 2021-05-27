<template>
    <div class="mainBox">
        <rghxorderdetailmainleft></rghxorderdetailmainleft>
        <rghxorderdetailmainright></rghxorderdetailmainright>
    </div>
</template>
<script>
import rghxorderdetailmainleft from "./mainleft";
import rghxorderdetailmainright from "./mainright";

export default {
    name: "orderDetailMain",
    data(){
        return{

        }
    },
    components:{
        rghxorderdetailmainleft,
        rghxorderdetailmainright,
    },
    methods:{

    },
}
</script>
<style scoped>
.mainBox{
    height: calc(100% - 60px);
    width: 100%;
}
</style>