<template>
  <div class="visitor">
    <el-dialog
      v-model="dialogFormVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-row>
        输入昵称
        <el-input v-model="visitorNickname"></el-input>
      </el-row>
      <el-row>
        <el-button @click="joinChat">加入聊天</el-button>
      </el-row>
    </el-dialog>
    <div class="visitor-chat-message">
      <div class="visitor-message-item" v-for="item in visitorMessageList">
        <span>{{ item.val }}</span>
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
        v-model="visitorMessage"
        rows="4"
        class="friend-chat-textarea"
        autofocus
        @keyup.alt.enter=""
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
import { PictureRounded } from '@element-plus/icons-vue';
import emojiData from '../../assets/emoji.json';
import { inputEmoji } from '../../components/chat/chat';
// import {developmentURL} from '../../components/chat/FriendChat.vue'
import socketIO from 'socket.io-client';
import { onMounted, reactive, ref } from 'vue';

const dialogFormVisible = ref(false);
const visitorNickname = ref('');
const joinChat = () => {
  !visitorNickname.value
    ? (dialogFormVisible.value = true)
    : (dialogFormVisible.value = false);
};
onMounted(() => {
  dialogFormVisible.value = true;
});
// 游客登录，聊天室
const socket = socketIO('ws://127.0.0.1:9892');
const visitorMessage = ref('');
const visitorMessageList:any = reactive([]);

const visitorSendMessage = () => {
  socket.emit('visitor', { nickname:visitorNickname.value,val:visitorMessage.value });
  if (visitorMessage.value){
    visitorMessageList.push({ type:'send',val:visitorMessage.value });
    setTimeout(() => {
      document
        .querySelector('.friend-chat-textarea')!
        .scrollTo(
          0,
          document.querySelector('.friend-chat-textarea')!.scrollHeight
        );
      visitorMessage.value = '';
    }, 0);
  }
};

socket.on('visitor', (msg) => {
  if (msg) {
    visitorMessageList.push({type:"receive",val:msg.val});
  }
});

</script>

<style scoped lang="scss">
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
  -webkit-backdrop-filter: blur(10px);
}

.visitor-chat-input {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 20%;
  box-shadow: 0 0 0 1px;
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
</style>
