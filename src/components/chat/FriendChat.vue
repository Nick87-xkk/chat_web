<template>
  <div class="friend-chat">
    <!-- 聊天时好友好友状态信息 包括视频通话按钮 -->
    <div class="friend-chat-header">
      <el-avatar
        shape="square"
        :src="conversionInfo.profile"
        :size="50"
      ></el-avatar>
      <div>
        <el-tooltip
          class="box-item"
          effect="light"
          content="视频"
          placement="bottom"
        >
          <el-button type="success" :icon="VideoCamera" @click="videoCall" circle></el-button>
        </el-tooltip>

        <!--
                <el-tooltip
                  class="box-item"
                  effect="light"
                  content="语音"
                  placement="bottom"
                >
                  <el-button type="success" :icon="Phone" circle></el-button>
                </el-tooltip>
        -->

        <el-tooltip
          class="box-item"
          effect="light"
          content="搜索"
          placement="bottom"
        >
          <el-button type="success" :icon="Search" circle></el-button>
        </el-tooltip>
      </div>
    </div>
    <!-- 聊天信息列表 -->
    <div class="friend-chat-main messages">
      <div
        v-for="item of messageList"
        :class="{
          right: item.account == GLOBAL_ACCOUNT_INFO.account,
          left: item.account != GLOBAL_ACCOUNT_INFO.account || null
        }"
      >
        <p>{{ item.nickname }}</p>
        <!--        分文本消息类型和图片、文件三种类型-->
        <span v-if="item.content_type==1" class="bubble">{{ item.content }}</span>
        <!--        图片-->
        <!--        <div>

                </div>-->
        <!--        文件-->
        <!--        <div>

                </div>-->
        <el-avatar
          style="padding: 0"
          shape="square"
          :size="40"
          :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
        ></el-avatar>
      </div>
    </div>

    <div class="friend-chat-input">
      <!-- 功能框 例如表情 -->
      <div>
        <el-row>
          <el-popover placement="top" :width="400" trigger="hover">
            <template #reference>
              <el-button
                type="primary"
                :icon="PictureRounded"
                circle
              ></el-button>
            </template>
            <div class="emoji-list">
              <!--表情-->
              <a
                href="javascript:;"
                v-for="it in emojiData"
                @click="inputEmoji(it)"
                :key="it.codes"
              >{{ it.char }}</a
              >
            </div>
          </el-popover>

          <el-tooltip
            class="box-item"
            effect="light"
            content="文件发送"
            placement="bottom"
          >
            <el-button type="primary" :icon="FolderAdd" @click="showUpload" circle></el-button>
          </el-tooltip>
        </el-row>
      </div>
      <!-- 输入框 -->
      <div>
        <textarea
          v-model="message"
          rows="4"
          class="friend-chat-textarea"
          autofocus
          @keyup.alt.enter="sendMessage"
        ></textarea>
      </div>
      <!-- 发送按钮 -->
      <el-row align="middle" justify="end">
        <span style="margin-right: 10px">Enter换行,Alt+Enter发送</span>
        <el-button
          style="margin: 0 5px 5px 0"
          type="primary"
          @click="sendMessage"
        >Send
        </el-button>
      </el-row>
    </div>
    <!--上传文件-->
    <FileUpload></FileUpload>
    <!-- 发起视屏通话-->
    <SponsorVideoChat v-if="videoChat" :receive-account="props.conversionInfo.friend"></SponsorVideoChat>
  </div>

</template>

<script setup lang="ts">
// 导入图标
import {
  VideoCamera,
  Search,
  PictureRounded,
  FolderAdd
} from "@element-plus/icons-vue";
import { GLOBAL_MESSAGE_LIST, showUpload } from "./chat";
import { inject, defineProps, reactive, ref } from "vue";
import emojiData from "../../assets/emoji.json";
import { inputEmoji, message } from "./chat";
import FileUpload from "../fileUpload/FileUpload.vue";
import SponsorVideoChat from "../video/SponsorVideoChat.vue";
import { postAddMessage, postSearchMessage } from "../../api/modules/message.api";
import socketIO from "socket.io-client";
import { app } from "../../main";
import { videoChat } from "../video/video";
const accountInfo: any = sessionStorage.getItem("accountInfo");
const GLOBAL_ACCOUNT_INFO: any = JSON.parse(accountInfo)[0];

// 使用socket
let socket: any;
if (!inject("socket")) {
  socket = socketIO(`wss://192.168.31.221:9892/?account=${sessionStorage.getItem('account')}`);
  app.provide("socket", socket);
} else {
  socket = inject("socket");
}


const props: any = defineProps<{
  conversionInfo: any //接受当前会话信息
}>();

// 拉取消息
postSearchMessage({
    "account": sessionStorage.getItem("account"),
    "receive_account": props.conversionInfo.friend
  }
).then((res: any) => {
  if (res.message) {
    messageList.push(...res.message);
    setTimeout(() => {
      document
        .querySelector(".messages")!
        .scrollTo(0, document.querySelector(".messages")!.scrollHeight);
      message.value = "";
    }, 0);
  }

});

// 消息列表
const messageList: any = reactive([]);

// 发送消息
const sendMessage = () => {
  let sendMessages = {
    "account": GLOBAL_ACCOUNT_INFO.account,
    "receiveAccount": props.conversionInfo.friend,
    "content_type": 1,
    "content": message.value
  };

  if (message.value) {
    // 消息先入库
    postAddMessage({
      "account": GLOBAL_ACCOUNT_INFO.account,
      "receive_account": props.conversionInfo.friend,
      "content_type": 1,
      "content": message.value
    }).then((res: any) => {
      console.log(res);
      socket.emit("chat message", sendMessages);
      messageList.push({
        "account": GLOBAL_ACCOUNT_INFO.account,
        "receive_account": props.conversionInfo.friend,
        "content_type": 1,
        "content": message.value
      });
      setTimeout(() => {
        document
          .querySelector(".messages")!
          .scrollTo(0, document.querySelector(".messages")!.scrollHeight);
        message.value = "";
      }, 0);
    });

  }
};

const returnMessage: any = ref("");
// 接收消息
socket.on("chat message", (msg: any) => {
  returnMessage.value = JSON.parse(msg);
  // 非当前好友的消息存放到全局消息中
  GLOBAL_MESSAGE_LIST.push(returnMessage.value);
  if (returnMessage.value && returnMessage.value.receiveAccount == GLOBAL_ACCOUNT_INFO.account) {
    messageList.push({
      "account": returnMessage.value.account,
      "receive_account": returnMessage.value.receiveAccount,
      "content_type": 1,
      "content": returnMessage.value.content
    });
    setTimeout(() => {
      document
        .querySelector(".messages")!
        .scrollTo(0, document.querySelector(".messages")!.scrollHeight);
    }, 0);
  }
});

// 发起视屏请求
const videoCall = () => {
  let request = {
    "account": GLOBAL_ACCOUNT_INFO.account,
    "receive_account": props.conversionInfo.friend,
    "nickname": props.conversionInfo.nickname,
    "profile": props.conversionInfo.profile
  };
  postAddMessage({
    "account": GLOBAL_ACCOUNT_INFO.account,
    "receive_account": props.conversionInfo.friend,
    "content_type": 1,
    "content": "发起了视屏请求"
  }).then(() => {
    messageList.push({
      "account": GLOBAL_ACCOUNT_INFO.account,
      "receive_account": props.conversionInfo.friend,
      "content_type": 1,
      "content": "发起了视屏请求"
    });
    socket.emit("video_call", JSON.stringify(request));
    videoChat.value = true;
  });
};
// 视屏请求被拒绝
socket.on("refuse video", (msg: any) => {
  if (msg.refuse) {
    postAddMessage({
      "account": props.conversionInfo.friend,
      "receive_account": GLOBAL_ACCOUNT_INFO.account,
      "content_type": 1,
      "content": "拒绝了视屏请求"
    }).then(() => {
      messageList.push({
        "account": props.conversionInfo.friend,
        "receive_account": GLOBAL_ACCOUNT_INFO.account,
        "content_type": 1,
        "content": "拒绝了视屏请求"
      });
      videoChat.value = false;
    });
  }
});
// answer方挂断通话
socket.on("hangup videoCall",(msg:any)=>{
  if (msg.hangup){
    videoChat.value = false;
  }
})

</script>

<style scoped lang="scss">
.friend-chat {
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-between;

  .friend-chat-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .friend-chat-main {
    flex: 1;
    padding-bottom: 10px;
    background: rgba(161, 65, 65, 0.445);
  }

  .friend-chat-input {
    background: rgba(133, 129, 129, 0.445);

    .friend-chat-textarea {
      width: 95%;
      height: 100%;
      margin: 10px;
    }
  }
}

:deep(textarea) {
  background: inherit;
  border: none;
  resize: none;
  font-size: 20px;
  outline: none;
}

.messages {
  list-style-type: none;
  flex-grow: 8;
  margin: 0;
  padding: 0;
  overflow: auto;
}

.messages li {
  padding: 5px 10px;
}

.left {
  display: flex;
  justify-content: start;
  flex-direction: row-reverse;
  margin-left: 20px;
}

.left > span {
  margin-top: 5px;
  padding: 15px;
  max-width: 50%;
  background-color: aquamarine;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-line;
  text-align: left;
}

.right {
  display: flex;
  justify-content: end;
  margin-right: 20px;
}

.right > span {
  margin-top: 5px;
  padding: 15px;
  max-width: 50%;
  background-color: yellow;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-line;
  text-align: left;
}

.bubble {
  margin: 0 5px 0 5px;
  border-radius: 5px;
}

.emoji-list {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;

  a {
    width: 10%;
    font-size: 20px;
    text-align: center;
    text-decoration: none;
  }

  a:link {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
    background: rgba(122, 121, 121, 0.3);
  }

  a:active {
    text-decoration: none;
  }
}
</style>
