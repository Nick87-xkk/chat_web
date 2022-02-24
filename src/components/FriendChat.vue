<template>
  <div class="friend-chat">
    <!-- 聊天时好友好友状态信息 包括视频通话按钮 -->
    <div class="friend-chat-header">
      <el-avatar shape="square" :size="50"></el-avatar>
      <div>
        <el-button :icon="Search" circle></el-button>
        <el-button type="primary" :icon="Edit" circle></el-button>
        <el-button type="success" :icon="Check" circle></el-button>
      </div>
    </div>
    <!-- 聊天信息列表 -->
    <div class="friend-chat-main messages">
      <div
          v-for="item of messageList"
          :class="{ right: item.type === 'send', left: item.type !== 'send' || null }"
      >
        <span class="bubble">{{ item.data }}</span>
        <el-avatar style="padding: 0" shape="square" :size="40"
                   :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"></el-avatar>
      </div>
    </div>

    <div class="friend-chat-input">
      <!-- 功能框 例如表情 -->
      <div>
        <el-row>
          <el-button :icon="Search" circle></el-button>
          <el-button type="primary" :icon="Edit" circle></el-button>
          <el-button type="success" :icon="Check" circle></el-button>
          <el-button type="info" :icon="Message" circle></el-button>
          <el-button type="warning" :icon="Star" circle></el-button>
          <el-button type="danger" :icon="Delete" circle></el-button>
        </el-row>
      </div>
      <!-- 输入框 -->
      <div>
        <textarea v-model="message" rows="4" class="friend-chat-textarea" autofocus></textarea>
      </div>
      <!-- 发送按钮 -->
      <el-row justify="end">
        <el-button style="margin: 0 5px 5px 0;" type="primary" @click="sendMessage">Send</el-button>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入图标
import {Search, Edit, Check, Message, Star, Delete,} from '@element-plus/icons-vue'
import socketIO from 'socket.io-client';
import { reactive, ref } from 'vue';
const socket = socketIO('ws://127.0.0.1:9892')

let message = ref('')

// 消息列表
const messageList: { type: string; user_name: string; data: string; options: {} | {}; }[] = reactive([])

// 发送消息
const sendMessage = () => {
  if (message.value) {
    socket.emit('chat message', message.value)
    messageList.push({
      type: 'send',
      user_name: 'nick',
      data: message.value,
      options: {
      }
    })
    setTimeout(() => {
      document.querySelector('.messages')!.scrollTo(0, document.querySelector('.messages')!.scrollHeight)
      message.value = '';
    }, 0)
  }
}

const returnMessage = ref('');
// 接收消息
socket.on('chat message', (msg) => {
  returnMessage.value = msg
  if (returnMessage.value) {
    messageList.push({
      type: 'receive',
      user_name: 'Tom',
      data: returnMessage.value.split(':')[1],
      options: {
      }
    })
    setTimeout(() => {
      document.querySelector('.messages')!.scrollTo(0, document.querySelector('.messages')!.scrollHeight)
    }, 500)
  }
})

</script>

<style scoped lang="scss">
.friend-chat {
  margin: 0;
  height: 100%;
  display: flex;
  margin: 0;
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
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
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
  white-space: normal;
  background-color: yellow;
  word-wrap: break-word;
  word-break: break-all;
}

.bubble {
  margin: 0 5px 0 5px;
  border-radius: 5px;
}

</style>
