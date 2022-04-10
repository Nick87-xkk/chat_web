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
          <el-sub-menu v-for="(item,index) in groupList" :index="index+1">
            <template #title>
              <span>{{ item.groupName }}</span>
            </template>
            <!-- 后续修改样式，确定friend属性-->
            <el-menu-item v-for="(x,y) in item.friend" :index="`${index}-${y}`">{{x}}</el-menu-item>
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


// 后续定义类型
interface friendListType{

}
const groupList:friendListType = [
  {
    groupName:'我的好友',
    friend:[
      '1',
      '2',
      '3'
    ]
  },
  {
    groupName:'家人',
    friend:[
      '1',
      '2',
      '3'
    ]
  },
  {
    groupName:'同事',
    friend:[
      '1',
      '2',
      '3'
    ]
  }
];


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