<template>
  <ul class="user-info-ul">
    <li>账号：{{ userInfoList.account }}</li>
    <li>昵称：{{ userInfoList.nickname }}</li>
    <li>电话：{{ userInfoList.phone }}</li>
    <li>邮箱：{{ userInfoList.email }}</li>
    <li>个性签名：{{ userInfoList.signature }}</li>
  </ul>
  <el-button @click="addFriend">添加好友</el-button>
</template>

<script setup lang="ts">
// 用户信息
import { reactive } from "vue";
import {useRoute, onBeforeRouteUpdate } from "vue-router";
const route = useRoute();
const userInfoList: any = reactive({
  account:route.query.account,
  nickname: route.query.nickname,
  phone:route.query.phone,
  email: route.query.email,
  profile:route.query.profile,
  signature: route.query.signature
});

onBeforeRouteUpdate(to => {
  userInfoList.account = to.query.account,
    userInfoList.nickname = to.query.nickname,
    userInfoList.phone = to.query.phone,
    userInfoList.email = to.query.email,
    userInfoList.profile = to.query.profile,
    userInfoList.signature = to.query.signature;
});
const addFriend = () => {
  console.log("添加好友");
};
</script>

<style scoped lang="scss">
.user-info-ul {
  text-align: left;
  color: #000000;
}
</style>