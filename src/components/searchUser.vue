<template>
  <div>
    <el-input placeholder="输入昵称、账号" v-model="userInfo"></el-input>
    <ul>
      <li v-for="item in userList" class="search-user-li" @click="clickUser(item)">
        <el-avatar
          :fit="'fill'"
          :src="item.profile"
          class="search-user-avatar"
        ></el-avatar>
        <div class="search-user-div">
          <h2>{{ item.nickname }}</h2>
          <span>{{ item.signature }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// 检索好友
import { ref, watch } from "vue";
import { searchUser } from "../api/modules/index.api";
import router from "../router";


const userInfo = ref();
const userList = ref();
// 输入完成后执行搜索
let timeout: NodeJS.Timeout;
watch(userInfo, (newVal: string | number, oldVal: any) => {
  clearTimeout(timeout);
  timeout = setTimeout(()=>{
      searchUser({ "user":newVal }).then((data:any)=>{
        if (data.userInfoByAccount.length){
          userList.value = data.userInfoByAccount
        }else{
          userList.value = data.userInfoByNickname
        }

      })
  }, 500);
});

// 点击检索出来的用户操作
const clickUser=(item:any)=>{
  router.push({path:'/index/userInfo',query:item})
}
</script>

<style scoped>
.search-user-li{
  max-width: 100%;
  display: flex;
  flex-direction: row;
  text-align: left;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px;
  box-shadow: 0 0 0 1px;
}
.search-user-li:hover{
  background: rgba(167, 164, 164, 0.2);
}
.search-user-div{
  margin-left: 1rem;
}
.search-user-avatar{
  margin-left: 0.5rem;
}
</style>