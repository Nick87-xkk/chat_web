<template>
  <div class="index-box">
    <div class="login-box">
      <el-container>
        <el-header>
          <el-row
            style="height: 100%; width: 100%"
            :align="'middle'"
            :justify="'space-between'"
          >
            <div>
              <el-tooltip
                class="box-item"
                effect="light"
                content="主页"
                placement="bottom"
              >
                <el-button
                  type="primary"
                  :icon="House"
                  circle
                  @click="
                    state = 'message';
                    view = 'weather';
                  "
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="box-item"
                effect="light"
                content="好友分组"
                placement="bottom"
              >
                <el-button
                  type="success"
                  :icon="User"
                  circle
                  @click="state = 'friendGroup'"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="box-item"
                effect="light"
                content="添加好友/群"
                placement="bottom"
              >
                <el-button
                  type="info"
                  :icon="Plus"
                  circle
                  @click="state = 'add'"
                ></el-button>
              </el-tooltip>
            </div>
            <!-- 用户头像-->
            <el-avatar
              class="infinite-list-item-avatar"
              :fit="'fill'"
              :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
            ></el-avatar>
          </el-row>
        </el-header>
        <el-container>
          <el-aside>
            <!--好友列表-->
            <FriendGroups v-if="state === 'friendGroup'"></FriendGroups>
            <!--搜索用户-->
            <SearchUser v-else-if="state === 'add'"></SearchUser>
            <!-- 消息列表-->
            <ul
              v-else="state === 'message'"
              class="infinite-list"
              style="overflow: auto"
            >
              <li
                v-for="item in conversionList"
                :key="item.name"
                class="infinite-list-item"
                @click="friendChat(item)"
              >
                <el-avatar
                  class="infinite-list-item-avatar"
                  :fit="'fill'"

                ></el-avatar>
                <div class="infinite-list-item-info">
                  <h2>{{ item.conversion_id }}</h2>
                  <h4>{{ item.lastMessage.content }}</h4>
                  <el-row>
                    <h6>{{ item.create_time ? "[在线]" : "[离线]" }}</h6>
                  </el-row>
                </div>
                <div>
                  <el-badge
                    v-show="item.unreadMessageNum > 0"
                    :value="item.unreadMessageNum"
                    class="item"
                  ></el-badge>
                  <h4>{{ item.lastTime }}</h4>
                </div>
              </li>
              <!--              <p v-for="(item,index) in conversionList" :key="index">{{item}}</p>-->
            </ul>
          </el-aside>
          <!--主页右侧聊天框或功能区-->
          <el-main style="padding: 0">
            <keep-alive>
              <WeatherCard v-if="view == 'weather'"></WeatherCard>
              <FriendChat v-else-if="view == 'chat'" :conversionInfo="friendChatInfo"></FriendChat>
            </keep-alive>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <AnswerVideoCall v-if="answerCall"></AnswerVideoCall>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, reactive, ref } from "vue";
import router from "../../router";
import { House, User, Plus } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import FriendGroups from "../../components/FriendGroups.vue";
import SearchUser from "../../components/searchUser.vue";
import { getConversionList, postBatchSearchUser, searchUser } from "../../api/modules/index.api";
import WeatherCard from "../../components/ribbon/WeatherCard.vue";
import FriendChat from "../../components/chat/FriendChat.vue";
import AnswerVideoCall from "../../components/video/AnswerVideoCall.vue";
import { GLOBAL_MESSAGE_LIST } from "../../components/chat/chat";
import { postSearchConversion } from "../../api/modules/conversion.api";
import { postSearchFriendInfo } from "../../api/modules/friend.api";
import socketIO from "socket.io-client";
const GLOBAL_ACCOUNT = sessionStorage.getItem('account');
// 聊天和天气切换
const view = ref("weather");
// 左上角按钮切换的状态
const state = ref();

interface FriendListInterface {
  type: number; // 0 单聊 1 群聊
  account: number; // 账号
  name?: string; // 昵称
  active?: boolean; // 是否在线
  headPortrait?: string; // 头像
  lastMessage?: string; // 最新消息
  lastTime?: string; // 最新消息时间
  unreadMessageNum: number; //未读消息条数
}

// 获取用户信息 ，建立ws连接
const store = useStore();
const socket: any = inject("socket") || socketIO(`ws://127.0.0.1:9892?account=${sessionStorage.getItem("account")}`);

/*onMounted(()=>{
  if (sessionStorage.getItem('account')){
    socket.value= socketIO(`ws://127.0.0.1:9892?account=${sessionStorage.getItem('account')}`)
  }
})*/
// 点击好友进入聊天
const friendChatInfo = ref();
const friendChat = (item: any) => {
  // setTimeout(() => (viewReload.value = false), 100);
  setTimeout(() => (view.value = "chat"), 100);
  friendChatInfo.value = item;
  item.conversion_id.forEach((item: any) => {
    if (item != sessionStorage.getItem("account")) {
      console.log(item);
      searchUser({ "user": item }).then((info: any) => {
        // console.log(info.userInfoByAccount[0]);
        friendChatInfo.value = info.userInfoByAccount[0];
        // router.push({ path: '/index/chat', query: info.userInfoByAccount[0] })
      });
    }
  });
  // 路由传参
  /*item.type
    ? router.push({ path: '/index/group', query: item })
    : router.push({ path: '/index/chat', query: item });*/
};

//获取好友信息
// 获取所有的好友信息存储在localStorage中
if (!localStorage.getItem("friendInfo")) {
  postSearchFriendInfo({
    "account": GLOBAL_ACCOUNT
  }).then((res: any) => {
    //获取所有的好友账号
    let friends: any = JSON.parse(res.message[0].friend_account);
    //  arr中是当前用户所有好友账号
    let arr: any = [];
    Object.values(friends).map((it: any) => {
      arr.push(...it);
    });
    postBatchSearchUser({ friends: arr }).then((batch: any) => {
      // 将所有好友的信息存储到localstorage中
      localStorage.setItem("allFriendInfo", JSON.stringify(batch.message));
    });
  });
}

// 获取会话信息
const conversionList: any = reactive([]);
postSearchConversion({
  "account": sessionStorage.getItem("account")
}).then((res: any) => {
  console.log(res);
});

// 会话列表滚动加载
/*const load = () => {
  friendList.push({
    name: 'Tom',
    active: false,
    headPortrait:
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    lastMessage: 'hello',
    lastTime: '6:30',
    unreadMessageNum: 2
  });
};*/

socket.on("chat message", (msg: any) => {
  console.log(msg);
  GLOBAL_MESSAGE_LIST.push(msg);
});

const answerCall = ref(false);
//
socket.on("_ice_candidate", (msg: any) => {
  let json = JSON.parse(msg);
  console.log(json);
  if (json.receiveAccount == sessionStorage.getItem("account")) {
    answerCall.value = true;
  }

});
</script>

<style lang="scss" scoped>
.infinite-list {
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-item {
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  box-shadow: 0 0 0 1px;
  margin-top: 1px;
}

.infinite-list-item:hover {
  background: rgba(167, 164, 164, 0.2);
}

.infinite-list-item-avatar {
  margin: 0 10px 0 10px;
}

.infinite-list-item-info {
  width: 60%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  h2 {
    color: black;
    font-weight: 400;
  }
}

.index-box {
  background: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  width: 1080px;

  .el-container:first-child {
    height: 720px;
    border-radius: 10px;
    backdrop-filter: blur(100px);
    box-shadow: 0 0 5px 0;
    overflow: hidden;
  }

  .el-container:nth-child(2) {
    box-shadow: 0 0 5px 0;
    overflow: hidden;
  }

  .el-aside {
    width: 30%;
    height: 100%;
    box-shadow: 0 0 5px 0;
    overflow: auto;
  }

  .el-header {
    overflow: hidden;
    box-shadow: 0 0 5px 0;
  }
}
</style>
