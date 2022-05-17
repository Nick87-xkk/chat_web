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
          <el-button @click="router.push('/register')">Register</el-button>
          <el-button type="primary" @click="loginButton">Login</el-button>
          <el-button @click="visitorButton">Visitor Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { provide, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Md5 } from "ts-md5/dist/md5";
import { login, searchUser } from "../../api/modules/index.api";
import { app } from "../../main";
import io from 'socket.io-client'
// import IdentityCode from "../../components/IdentityCode.vue";

// console.log(Md5.hashStr('a123456'))

const userInfo = reactive({
  account: "", //账户
  passWord: "", //密码
  verification: "" //验证码
});

// 登录后将用户信息写入store
const store = useStore();
// store.commit('set_user_date',userInfo)

const router = useRouter();
// 点击登录
const loginButton = (): void => {
  if (!userInfo.account || !userInfo.passWord) {
    return alert("账号密码为空")!;
  }

  login({
    "account": userInfo.account,
    "pd": Md5.hashStr(userInfo.passWord)
  }).then((res: any) => {
    if (res.code === 200) {
      // 账号存入session中
      searchUser({"user":userInfo.account}).then((resInfo:any)=>{
        sessionStorage.setItem('account',userInfo.account);
        sessionStorage.setItem('accountInfo',[JSON.stringify(resInfo.userInfoByAccount as any)] as any);
      })
      let socket = io(`ws://127.0.0.1:9892/?account=${userInfo.account}`)
      // let socket = io(`http://192.168.31.221:443/?account=${userInfo.account}`);
      // let socket = io(`wss://49.232.185.124:19100/?account=${userInfo.account}`);
      // let socket = io(`ws://www.nick87.top:19100/?account=${userInfo.account}`);
      // 登录验证成功全局注册socket连接
      app.provide('socket',socket)
      router.push("/index");
    } else {
      alert("密码错误");
    }
  });
};

const visitorButton = (): void => {
  router.push("/visitor");
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

//noinspection CssInvalidPseudoSelector
:deep(.el-form-item__label) {
  color: black;
}

//noinspection CssInvalidPseudoSelector
:deep(.el-input__inner::-ms-reveal) {
  display: none;
}
</style>
