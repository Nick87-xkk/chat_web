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
import {reactive} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from "vuex";
import { Md5 } from 'ts-md5/dist/md5'
import {login} from "../../api/modules/index.api";
import qs from 'qs/index'
// console.log(Md5.hashStr('a123456'))

const userInfo = reactive({
  account: '', //账户
  passWord: '', //密码
  verification: '' //验证码
});

// 登录后将用户信息写入store
const store = useStore()
// store.commit('set_user_date',userInfo)

const router = useRouter();
// 点击登录
const LoginButton = () => {
  if(!userInfo.account || !userInfo.passWord){
    return alert('账号密码为空')!
  }

  login({
    "account":userInfo.account,
    "pd":Md5.hashStr(userInfo.passWord)
  }).then((res)=>{
    console.log(res)
    if (res.data == 200){
      router.push('/index/ribbon');
    }else{
      alert('密码错误')
    }
  });
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
