<template>
    <div>这是搭配啊呀呀
        <rghxtest>
            <template #head>
                <p>这里是引入插槽? </p>
            </template>
        </rghxtest>
    </div>
</template>
<script>
import rghxtest from "./components/prodlist";

export default {
    name:"productShow",
    components:{
       rghxtest, 
    }
}
</script>