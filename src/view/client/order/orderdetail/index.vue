<template>
    <div style="height:100%;width:100%">
        <rghxOrderDetailTopNav></rghxOrderDetailTopNav>
        <rghxOrderDetailMain></rghxOrderDetailMain>
    </div>
</template>
<script>
import rghxOrderDetailTopNav from "./components/orderDetailTop";
import rghxOrderDetailMain from "./components/orderDetailMain";

export default {
    name: "orderDetail",
    data(){
        return{

        }
    },
    components:{
        rghxOrderDetailTopNav,
        rghxOrderDetailMain,
    },
    methods:{

    }
}
</script>