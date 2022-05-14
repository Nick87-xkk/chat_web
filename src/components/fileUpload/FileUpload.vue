<template>
  <div class="upload-box">
    <el-dialog
      v-model="showUploadFlg"

      draggable
      width="30%"
    >
      <el-upload
        class="upload-demo"
        action="http://127.0.0.1:9892/file/upFile"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
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
import { ref } from "vue";
import { showUploadFlg } from "../chat/chat";

import { ElMessage, ElMessageBox } from 'element-plus'

// import { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<any[]>([
])

const handleRemove: any = (file: any, uploadFiles: any) => {
  console.log(file, uploadFiles)
}

const handlePreview: any = (uploadFile: any) => {
  console.log(uploadFile)
}

const handleExceed: any  = (files: string | any[], uploadFiles: string | any[]) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: any  = (uploadFile:any, uploadFiles:any) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
</script>

<style scoped>
.upload-box{
  position: fixed !important;
}
</style>