<template>

<!--    <div class="visitor-notice">
      <span>当前在线人数：{{2}}</span>
        <p>温馨提示：</p>
        <p>网络连接你我他，文明用语靠大家。</p>
        <p>文明上网心中记，健康网络大家建。</p>
        <p>健康文明上网，从我做起。</p>
        <p>你文明的语言将赢得坛友的真情。</p>
    </div>-->
    <div class="visitor">

      <el-dialog
        v-model="dialogFormVisible"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="400px"
      >
        <el-row>
          输入昵称
          <el-input v-model="visitorNickname"></el-input>
        </el-row>
        <el-row>
          <el-button @click="joinChat">加入聊天</el-button>
        </el-row>
      </el-dialog>
      <div class="visitor-room-info"><span>
      游客聊天室
    </span></div>
      <div class="visitor-chat-message">
        <div :class="{'visitor-send':item.type === 'send','visitor-receive':item.type=='receive'}"
             v-for="item in visitorMessageList">
          <div>
            <p>{{ item.nickname }}</p>
            <span>{{ item.val }}</span>
          </div>
          <el-avatar></el-avatar>
        </div>
      </div>
      <div class="visitor-chat-input">
        <el-row>
          <el-popover placement="top" :width="400" trigger="hover">
            <template #reference>
              <el-button :icon="PictureRounded" type="primary" circle></el-button>
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
        </el-row>
        <textarea
          v-model="message"
          rows="4"
          class="friend-chat-textarea"
          autofocus
          @keyup.alt.enter="visitorSendMessage"
        ></textarea>
        <el-row align="middle" justify="end">
          <span style="margin-right: 10px">Enter换行,Alt+Enter发送</span>
          <el-button
            style="margin: 0 5px 5px 0"
            type="primary"
            @click="visitorSendMessage"
          >Send
          </el-button>
        </el-row>
      </div>
    </div>

</template>

<script setup lang="ts">
import { PictureRounded } from "@element-plus/icons-vue";
import emojiData from "../../assets/emoji.json";
// import {developmentURL} from '../../components/chat/FriendChat.vue'
import socketIO from "socket.io-client";
import { onMounted, reactive, ref } from "vue";
import { inputEmoji, message } from "../../components/chat/chat";

const dialogFormVisible = ref(false);
const visitorNickname = ref("");
const joinChat = () => {
  !visitorNickname.value
    ? (dialogFormVisible.value = true)
    : (dialogFormVisible.value = false);
  sessionStorage.setItem("nickname", visitorNickname.value);
};
onMounted(() => {
  let storageNickname = sessionStorage.getItem("nickname");
  let storageMessage: any = sessionStorage.getItem("visitorMessage");
  if (storageNickname) {
    visitorNickname.value = storageNickname;
    if (storageMessage) {
      storageMessage = JSON.parse(storageMessage);
      storageMessage.forEach((x: any) => {
        visitorMessageList.push(x);
      });
    }
    setTimeout(() => {
      document
        .querySelector(".visitor-chat-message")!
        .scrollTo(
          0,
          document.querySelector(".visitor-chat-message")!.scrollHeight
        );
    }, 0);
  } else {
    dialogFormVisible.value = true;
  }
});
// 游客登录，聊天室
const socket = socketIO("ws://127.0.0.1:9892");
const visitorMessage = ref("");
const visitorMessageList: any = reactive([]);
// 发送消息
const visitorSendMessage = () => {
  socket.emit("visitor", { nickname: visitorNickname.value, val: message.value });
  if (message.value) {
    visitorMessageList.push({ type: "send", val: message.value, nickname: visitorNickname.value });
    setTimeout(() => {
      document
        .querySelector(".visitor-chat-message")!
        .scrollTo(
          0,
          document.querySelector(".visitor-chat-message")!.scrollHeight
        );
      message.value = "";
    }, 0);

    sessionStorage.setItem("visitorMessage", JSON.stringify(visitorMessageList));
  }
};
// 接收消息
socket.on("visitor", (msg) => {
  if (msg) {
    visitorMessageList.push({ type: "receive", val: msg.val, nickname: msg.nickname });
    setTimeout(() => {
      document
        .querySelector(".visitor-chat-message")!
        .scrollTo(
          0,
          document.querySelector(".visitor-chat-message")!.scrollHeight
        );
    }, 0);
    sessionStorage.setItem("visitorMessage", JSON.stringify(visitorMessageList));
  }
});

</script>

<style scoped lang="scss">
.visitor-notice {
  max-width: 300px;
  max-height: 400px;
  z-index: 999;
  box-shadow: 0 0 0 1px;
  left: 80px;
  position: fixed;
  P{
    color: black;
    text-align: left;
  }
}

.visitor {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}

.visitor-chat-message {
  width: 50%;
  height: 60%;
  box-shadow: 0 0 0 1px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(1px);
  padding: 10px 5px 10px 5px;
  overflow: auto;
}

.visitor-chat-input {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 20%;
  box-shadow: 0 0 0 1px;
  padding: 10px 5px 10px 5px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.friend-chat-textarea {
  width: 100%;
  min-height: 60%;
  max-height: 60%;
  background: inherit;
}

:deep(textarea) {
  background: inherit;
  border: none;
  resize: none;
  font-size: 20px;
  outline: none;
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

.visitor-room-info {
  width: 50%;
  box-shadow: 0 0 0 1px;
  padding: 10px 5px 10px 5px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  span {
    color: black;
    font-size: 20px;
  }
}

.visitor-send {
  display: flex;
  margin-top: 20px;
  justify-content: end;

  div {
    max-width: 50%;
    padding: 0 5px 5px 5px;

    p {
      font-size: 10px;
      text-align: right;
      color: #000;
      padding-bottom: 5px;
    }

    span {
      float: right;
      border-radius: 5px;
      padding: 10px;
      background-color: yellow;
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-line;
      text-align: left;
    }
  }
}

.visitor-receive {
  display: flex;
  flex-direction: row-reverse;
  justify-content: start;
  margin-top: 20px;

  div {
    max-width: 50%;
    padding: 0 5px 5px 5px;

    p {
      font-size: 10px;
      text-align: left;
      color: #000;
      padding-bottom: 5px;
    }

    span {
      float: left;
      border-radius: 5px;
      padding: 10px;
      background-color: #00ff19;
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-line;
      text-align: left;
    }
  }
}
</style>
