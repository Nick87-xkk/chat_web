<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      draggable
      @close="showUserInfo=false"
      :show-close="false"
      :close-on-press-escape="false"
    >
      <ul class="user-info-ul">
        <el-avatar :src="userInfoList.profile"></el-avatar>
        <p>账号：{{ userInfoList.account }}</p>
        <p>昵称：{{ userInfoList.nickname }}</p>
        <p>电话：{{ userInfoList.phone }}</p>
        <p>邮箱：{{ userInfoList.email }}</p>
        <p>个性签名：{{ userInfoList.signature }}</p>
      </ul>
      <el-button @click="addFriend">添加好友</el-button>
    </el-dialog>
    <el-dialog
      v-model="dialogVisible1"
      width="30%"
      draggable
      :show-close="false"
      :close-on-press-escape="false"
    >
      <el-row>
        输入分组
        <el-input v-model="group"></el-input>
      </el-row>
      <el-row>
        附加消息
        <el-input v-model="requestMessage" type="textarea"></el-input>
      </el-row>
      <el-row justify="center">
        <el-button @click="sendRequest">发送申请</el-button>
      </el-row>
    </el-dialog>
  </div>

</template>

<script setup lang="ts">
// 用户信息
import { reactive, ref, defineProps } from "vue";
// import {useRoute, onBeforeRouteUpdate } from "vue-router";
import { showUserInfo } from "./ribbon";
import Avatar from "../avatar/Avatar.vue";
import { friendRequest } from "../../api/modules/index.api";
import { postCreateFriendRequest } from "../../api/modules/friend.api";

const prop: any = defineProps<{
  userInfo: {
    account: "",
    nickname: "",
    phone: "",
    email: "",
    profile: "",
    signature: ""
  }
}>();

// console.log(prop.userInfo[0]);
const userInfoList: any = reactive({
  account: prop.userInfo[0].account,
  nickname: prop.userInfo[0].nickname,
  phone: prop.userInfo[0].phone,
  email: prop.userInfo[0].email,
  profile: prop.userInfo[0].profile,
  signature: prop.userInfo[0].signature
});
const dialogVisible = true;
const dialogVisible1 = ref(false);

const addFriend = () => {
  // 弹出申请框
  dialogVisible1.value = true;
};


const group = ref();
const requestMessage = ref();

const sendRequest = () => {
  postCreateFriendRequest({
    apply_account: sessionStorage.getItem("account"),
    target_account: prop.userInfo[0].account,
    apply_group: group.value,
    message: requestMessage.value,
    state: 0
  }).then(() => {
    alert("申请已发送");
  }).catch(() => {
    alert("发送失败");
  });
};

</script>

<style scoped lang="scss">
.user-info-ul {
  text-align: left;
  color: #000000;
}
</style>