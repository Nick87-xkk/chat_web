<template>
  <div class="friend-chat">
    <!-- 聊天时好友好友状态信息 包括视频通话按钮 -->
    <div class="friend-chat-header">
      <el-avatar
        shape="square"
        :src="route.query.headPortrait"
        :size="50"
      ></el-avatar>
      <div>
        <el-tooltip
          class="box-item"
          effect="light"
          content="视频"
          placement="bottom"
        >
          <el-button type="success" :icon="VideoCamera" circle></el-button>
        </el-tooltip>

        <el-tooltip
          class="box-item"
          effect="light"
          content="语音"
          placement="bottom"
        >
          <el-button type="success" :icon="Phone" circle></el-button>
        </el-tooltip>

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
          right: item.type === 'send',
          left: item.type !== 'send' || null
        }"
      >
        <span class="bubble">{{ item.data }}</span>
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
            <el-button type="primary" :icon="FolderAdd" circle></el-button>
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
  </div>
</template>

<script setup lang="ts">
// 导入图标
import {
  Phone,
  VideoCamera,
  Search,
  PictureRounded,
  FolderAdd
} from '@element-plus/icons-vue';

import { inject, onBeforeUnmount, reactive, ref } from 'vue';
import { LocationQueryValue, useRoute } from 'vue-router';
import emojiData from '../../assets/emoji.json';
import { inputEmoji, message } from './chat';

const route = useRoute();
// 使用socket
const socket:any = inject('socket');

// 切换关闭socket连接
/*
onBeforeUnmount(() => {
  socket.close();
});
*/

// 消息列表
const messageList: {
  send: LocationQueryValue[] | LocationQueryValue;
  receive: string;
  type: string;
  user_name: string;
  data: string;
  options: {};
}[] = reactive([]);

interface messageType {
  sendAccount: number;
  receiveAccount: number;
  data: string;
  time: number;
}

// 发送消息
const sendMessage = () => {
  let sendMessages: messageType = {
    sendAccount: route.query.account as unknown as number, // 发送账号 应为当前登录用户
    receiveAccount: 123456786, // 接收信息账号
    data: message.value,
    time: Date.now()
  };

  if (message.value) {
    socket.emit('chat message', sendMessages);
    messageList.push({
      send: route.query.name,
      receive: 'nick',
      type: 'send',
      user_name: 'nick',
      data: message.value,
      options: {}
    });
    setTimeout(() => {
      document
        .querySelector('.messages')!
        .scrollTo(0, document.querySelector('.messages')!.scrollHeight);
      message.value = '';
    }, 0);
  }
};

const returnMessage = ref('');
// 接收消息
socket.on('chat message', (msg) => {
  returnMessage.value = msg;
  if (returnMessage.value) {
    messageList.push({
      send: '',
      receive: '',
      type: 'receive',
      user_name: 'Tom',
      data: returnMessage.value.split(':')[1],
      options: {}
    });
    setTimeout(() => {
      document
        .querySelector('.messages')!
        .scrollTo(0, document.querySelector('.messages')!.scrollHeight);
    }, 0);
  }
});
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
