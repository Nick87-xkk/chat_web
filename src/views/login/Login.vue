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
        </el-form-item>
        <el-form-item>
          <el-button>Register</el-button>
          <el-button type="primary" @click="LoginButton">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const userInfo = reactive({
  account: '', //账户
  passWord: '', //密码
  verification: '' //验证码
});

const router = useRouter();
const LoginButton = () => {
  router.push('/index/ribbon');
};
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

:deep(.el-form-item__label) {
  color: black;
}
:deep(.el-input__inner::-ms-reveal) {
  display: none;
}
</style>
