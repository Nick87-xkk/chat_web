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
                content="搜索用户"
                placement="bottom"
              >
                <el-button
                  type="info"
                  :icon="Plus"
                  circle
                  @click="state = 'add'"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="box-item"
                effect="light"
                content="通知"
                placement="bottom"
              >
                <el-button
                  type="danger"
                  :icon="ChatLineSquare"
                  circle
                  @click="drawer = true"
                ></el-button>
              </el-tooltip>
            </div>
            <!-- 用户头像-->
            <el-avatar
              class="infinite-list-item-avatar"
              fit="fill"
              :src="GLOBAL_ACCOUNT_INFO[0].profile"
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
                :key="item.account"
                class="infinite-list-item"
                @click="friendChat(item)"
              >
                <el-avatar
                  class="infinite-list-item-avatar"
                  :fit="'fill'"
                  :src="item.profile"
                ></el-avatar>
                <div class="infinite-list-item-info">
                  <h2>{{ item.nickname }}</h2>
                  <h4>{{ item.latest_message || '...' }}</h4>
                  <el-row> </el-row>
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
            <WeatherCard v-if="view === 'weather'"></WeatherCard>
            <FriendChat
              v-if="view === 'chat'"
              :conversionInfo="friendChatInfo"
            ></FriendChat>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <AnswerVideoCall
      v-if="answerCall"
      :account="videoRequest.account"
    ></AnswerVideoCall>
    <!--    接收或拒绝视屏通话的弹窗-->
    <el-dialog v-model="showVideoRequest">
      <el-avatar
        fit="fit"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :src="videoRequest.profile"
      >
      </el-avatar>
      <el-row style="justify-content: center">
        <h3>{{ videoRequest.nickname }} 发来视屏请求</h3>
      </el-row>
      <el-row style="justify-content: center">
        <el-button @click="agreeVideoCall">接收</el-button>
        <el-button @click="refuseVideoCall">拒绝</el-button>
      </el-row>
    </el-dialog>
    <!--    好友请求通知-->
    <Notification></Notification>
  </div>
</template>

<script lang="ts" setup>
import { inject, nextTick, reactive, ref } from 'vue';
import { House, User, Plus, ChatLineSquare } from '@element-plus/icons-vue';
import FriendGroups from '../../components/FriendGroups.vue';
import SearchUser from '../../components/SearchUser.vue';
import { postBatchSearchUser } from '../../api/modules/index.api';
import WeatherCard from '../../components/ribbon/WeatherCard.vue';
import FriendChat from '../../components/chat/FriendChat.vue';
import AnswerVideoCall from '../../components/video/AnswerVideoCall.vue';
import { GLOBAL_MESSAGE_LIST } from '../../components/chat/chat';
import { postSearchConversion } from '../../api/modules/conversion.api';
import { postSearchFriendInfo } from '../../api/modules/friend.api';
import socketIO from 'socket.io-client';
import { app } from '../../main';
import { answerCall } from '../../components/video/video';
import Notification from '../../components/notefiction/Notification.vue';
import { drawer } from '../../components/notefiction/note';
import { setEnvironmentData } from 'worker_threads';
let socket: any;
if (!inject('socket')) {
  socket = socketIO(
    `${process.env.BASE_API}/?account=${sessionStorage.getItem('account')}`
  );
  app.provide('socket', socket);
} else {
  socket = inject('socket');
}
const GLOBAL_ACCOUNT = sessionStorage.getItem('account');
const GLOBAL_ACCOUNT_INFO: any = JSON.parse(
  sessionStorage.getItem('accountInfo') as any
);
// 聊天和天气切换
const view = ref('weather');
// 左上角按钮切换的状态
const state = ref();
// 会话列表
const conversionList: any = reactive([]);

const friendChatInfo = ref();
const friendChat = (item: any) => {
  friendChatInfo.value = item;
  if (view.value == 'chat') {
    nextTick(() => {
      view.value = 'weather';
    }).then(() => {
      view.value = 'chat';
    });
  } else {
    view.value = 'chat';
  }
};

//获取好友信息
// 获取所有的好友信息存储在localStorage中
postSearchFriendInfo({
  account: GLOBAL_ACCOUNT
}).then((res: any) => {
  //获取所有的好友账号
  let friends: any = JSON.parse(res.message[0].friend_account);
  //  arr中是当前用户所有好友账号
  let arr: any = [];
  Object.values(friends).map((it: any) => {
    arr.push(...it);
  });
  postBatchSearchUser({ friends: arr })
    .then((batch: any) => {
      // 数据结构转换
      let friendMap: any = {};
      batch.message.map((e: any) => {
        friendMap[e.account] = e;
      });
      // 将所有好友的信息存储到localstorage中
      localStorage.setItem('allFriendInfo', JSON.stringify(friendMap));
    })
    .then(() => {
      // 获取会话信息
      postSearchConversion({
        account: sessionStorage.getItem('account')
      }).then((res: any) => {
        if (res.message.length) {
          // 将好友账号信息整合入对应的会话信息
          res.message.map((item: any) => {
            let allFriendInfo: any = JSON.parse(
              localStorage.getItem('allFriendInfo') as any
            );
            console.log(allFriendInfo);
            if (item.create_account != GLOBAL_ACCOUNT) {
              item.profile = allFriendInfo[item.create_account].profile;
              item.nickname = allFriendInfo[item.create_account].nickname;
              item.friend = item.create_account;
            } else {
              item.profile = allFriendInfo[item.member_account]?.profile;
              item.nickname = allFriendInfo[item.member_account]?.nickname;
              item.friend = item.member_account;
            }
            conversionList.push(item);
          });
        }
      });
    });
});

/*// 接收消息
socket.on("chat message", (msg: any) => {
  console.log(msg);
  GLOBAL_MESSAGE_LIST.push(msg);
});*/

// 视屏请求的信息
const videoRequest = ref();
const showVideoRequest = ref(false);
// 收到视屏通话请求
socket.on('video request', (msg: any) => {
  videoRequest.value = JSON.parse(msg);
  showVideoRequest.value = true;
});
// 拒接视屏通话
const refuseVideoCall = () => {
  socket.emit('refuse videoCall', { account: videoRequest.value.account });
  showVideoRequest.value = false;
};
// 接受视屏通话
const agreeVideoCall = () => {
  showVideoRequest.value = false;
  answerCall.value = true;
};
socket.on('hangup videoCall', (msg: any) => {
  if (msg.hangup) {
    answerCall.value = false;
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
