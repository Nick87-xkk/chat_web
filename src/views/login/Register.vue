<template>
  <div class="login">
    <div class="login-box">
      <el-form
        :label-position="'top'"
        label-width="100px"
        :model="registerInfo"
        style="max-width: 460px"
      >
        <el-form-item label="Account">
          <el-input v-model="registerInfo.account" clearable></el-input>
        </el-form-item>
        <el-form-item label="PassWord">
          <el-input
            type="password"
            v-model="registerInfo.passWord"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="Nickname">
          <el-input
            type="nickname"
            v-model="registerInfo.nickname"
          ></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input
            type="Phone"
            v-model="registerInfo.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input
            type="Email"
            v-model="registerInfo.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="Profile">
            <el-input type="profile" v-model="registerInfo.profile">
            </el-input>
        </el-form-item>
        <el-form-item label="Signature">
          <el-input
            type="signature"
            v-model="registerInfo.signature"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register">Register</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {  reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Md5 } from "ts-md5/dist/md5";
import { login, userRegister } from "../../api/modules/index.api";
import { app } from "../../main";
import socketIO from "socket.io-client";
import avatarList from "../../components/avatar/avatar.json"
import router from "../../router";
// import IdentityCode from "../../components/IdentityCode.vue";

// console.log(Md5.hashStr('a123456'))

const registerInfo = reactive({
  account: "", //账户
  passWord: "", //密码
  create_time:"", // 数据库生成，不用添加
  nickname:"", // 昵称
  phone:"",
  email:"",
  profile:"", // 头像地址
  signature:"" // 个性签名
});

// 注册按钮
const register = () =>{
  if (registerInfo.account && registerInfo.passWord){
    let info = {
      account: registerInfo.account, //账户
      password:Md5.hashStr(registerInfo.passWord) , //密码
      nickname:registerInfo.nickname, // 昵称
      phone:registerInfo.phone,
      email:registerInfo.email,
      profile:registerInfo.profile, // 头像地址
      signature:registerInfo.signature, // 个性签名
    }
    userRegister(info).then((res:any)=>{
      alert('注册成功');
      router.push('/');
    })
  }

}

</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: inherit;

  .login-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;

    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    border-radius: 10px;
  }
}

//noinspection CssInvalidPseudoSelector
:deep(.el-form-item__label) {
  color: black;
}

//noinspection CssInvalidPseudoSelector
:deep(.el-input__inner::-ms-reveal) {
  display: none;
}
</style>
