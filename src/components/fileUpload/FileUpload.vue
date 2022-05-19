<template>
  <div class="upload-box">
    <el-dialog v-model="showUploadFlg" draggable width="30%">
      <el-upload
        class="upload-demo"
        action="https://192.168.31.221:9892/file/upFile"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :data="{ account: addition }"
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :on-success="uploadSuccess"
      >
        <el-button type="primary">Click to upload</el-button>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500KB.
          </div>
        </template>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
// 文件传输
import { defineProps, inject, ref } from 'vue';
import { message, showUploadFlg } from '../chat/chat';

import { ElMessage, ElMessageBox } from 'element-plus';
import { app } from '../../main';
import socketIO from 'socket.io-client';
import { postAddMessage } from '../../api/modules/message.api';

const prop: any = defineProps<{ receiveAccount: any }>();

let socket: any;
if (!inject('socket')) {
  socket = socketIO(
    `wss://192.168.31.221:9892/?account=${sessionStorage.getItem('account')}`
  );
  app.provide('socket', socket);
} else {
  socket = inject('socket');
}

const fileList = ref<any[]>([]);

const addition = sessionStorage.getItem('account');

const handleRemove: any = (file: any, uploadFiles: any) => {
  console.log(file, uploadFiles);
};

const handlePreview: any = (uploadFile: any) => {
  console.log(uploadFile);
};

const handleExceed: any = (
  files: string | any[],
  uploadFiles: string | any[]
) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove: any = (uploadFile: any, uploadFiles: any) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};

const uploadSuccess = (res: any) => {
  console.log(res);
  postAddMessage({
    "account": addition,
    "receive_account": prop.receiveAccount,
    "content_type": 2,
    "content": res.message
  }).then((error) => {
    console.log(error);
    socket.emit('chat message',{
      "account": addition,
      "receive_account": prop.receiveAccount,
      "content_type": 2,
      "content": res.message
    });
  }).catch((err)=>{
    console.log(err);
  });
};
</script>

<style scoped>
.upload-box {
  position: fixed !important;
}
</style>
