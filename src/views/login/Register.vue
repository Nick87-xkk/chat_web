<template>
  <div class="login">
    <div class="login-box">
      <el-form
        :label-position="'top'"
        label-width="100px"
        :model="userInfo"
        style="max-width: 460px"
      >
        <el-form-item label="Account">
          <el-input v-model="userInfo.account" clearable></el-input>
        </el-form-item>
        <el-form-item label="PassWord">
          <el-input
            type="password"
            v-model="userInfo.passWord"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="Verification Code">
          <el-input v-model="userInfo.verification" clearable></el-input>
          <!--          <IdentityCode></IdentityCode>-->
        </el-form-item>
        <el-form-item>
          <el-button>Register</el-button>
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
import { login } from "../../api/modules/index.api";
import { app } from "../../main";
import socketIO from "socket.io-client";
// import IdentityCode from "../../components/IdentityCode.vue";

// console.log(Md5.hashStr('a123456'))

const userInfo = reactive({
  account: "", //账户
  passWord: "", //密码
  verification: "" //验证码
});

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
    height: 300px;
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
