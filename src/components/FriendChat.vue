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
    <div class="friend-chat-main"></div>

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
        <textarea rows="4" class="friend-chat-textarea" autofocus></textarea>
      </div>
      <!-- 发送按钮 -->
      <el-row justify="end">
        <el-button style="margin: 0 5px 5px 0;" type="primary">Send</el-button>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入图标
import { Search, Edit, Check, Message, Star, Delete, } from '@element-plus/icons-vue'



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
</style>
