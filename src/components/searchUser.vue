<template>
  <div>
    <el-input placeholder="输入昵称、账号" v-model="userInfo"></el-input>
    <ul>
      <li>1231231</li>
      <li>1231231</li>
      <li>1231231</li>
      <li>1231231</li>
      <li>1231231</li>
      <li>1231231</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// 检索好友
import { ref, watch } from "vue";
import { searchUser } from "../api/modules/index.api";


const userInfo = ref();
// 输入完成后执行搜索
let timeout: NodeJS.Timeout;
watch(userInfo, (newVal: string | number, oldVal: any) => {
  clearTimeout(timeout);
  timeout = setTimeout(()=>{
      searchUser({ "user":newVal }).then((data)=>{
        console.log(data);}
      )
  }, 500);
});

</script>

<style scoped>

</style>