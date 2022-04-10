<template>
  <div>
    <el-row style="width: 100%;">
      <el-col>
        <h3>联系人</h3>
        <el-menu
          class="friend-group"
          @open="handleOpen"
          @close="handleClose"
          background-color="inherit"
        >
          <el-sub-menu index="1">
            <template #title>
              <span>我的好友</span>
            </template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>我的家人</span>
            </template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item one</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <span>我的同学</span>
            </template>
            <el-menu-item index="3-1">item one</el-menu-item>
            <el-menu-item index="3-2">item one</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <span>我的同事</span>
            </template>
            <el-menu-item index="4-1">item one</el-menu-item>
            <el-menu-item index="4-2">item one</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <span>特别关注</span>
            </template>
            <el-menu-item index="5-1">item one</el-menu-item>
            <el-menu-item index="5-2">item one</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.friend-group {
  background: inherit;
}
.el-menu{
  border-right-width: 0;
  color: #000000;
}
.el-sub-menu{
  font-weight: bold;
 padding-bottom: 2px;
}
.el-menu-item{
  color: #000;
  font-weight: normal;
}
.el-menu-item:hover{
  outline: 0 !important;
  color: #000000 !important;
  background:  rgba(167, 164, 164, 0.2) !important;
}
.el-menu-item.is-active {
  color: #000000 !important;
  background:  rgba(256, 256, 256,0.1) !important;
}
</style>