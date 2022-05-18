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
            <el-menu-item @click="clickFriend(x)" style="height: 70px;overflow: hidden;" v-for="(x,y) in item.friend" :index="`${index}-${y}`">
              <el-avatar
                :fit="'fill'"
                :src="x.profile"
              ></el-avatar>
              <div style="line-height:normal !important;height: 70px;display: flex;flex-direction: column;justify-content: center;text-align: left;padding-left: 10px">
                <h2>{{ x.nickname }}</h2>
                <h4 style="color: #3b3b43">{{ x.signature }}</h4>
              </div>

            </el-menu-item>
          </el-sub-menu>

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { searchUser } from "../api/modules/index.api";
import { reactive } from "vue";
import { postSearchFriendInfo } from "../api/modules/friend.api";
import { postSearchConversion } from "../api/modules/conversion.api";


// 分组列表
const groupList: any = reactive([]);

postSearchFriendInfo({ "account": sessionStorage.getItem("account") }).then((res: any) => {
  let groups = JSON.parse(res.message[0].friend_account);
  console.log(groups);
  for (let key of Object.keys(groups)) {
    console.log(groups[key]);
    let friendInfo: any = [];
    groups[key].forEach((e: any) => {
      searchUser({ "user": e }).then((res: any) => {
        friendInfo.push(res.userInfoByAccount[0]);
      });
    });

    groupList.push({
      groupName: key,
      friend: friendInfo
    });
  }
});
/*
*点击进入用户信息详情
* 点击发送消息按钮 先查询是否存在会话，不存在则创建会话
*  */
const clickFriend = (data:any) => {

  // postSearchConversion({})
}


</script>

<style lang="scss" scoped>
.friend-group {
  background: inherit;
}

.el-menu {
  border-right-width: 0;
  color: #000000;
}

.el-sub-menu {
  font-weight: bold;

}

.el-menu-item {
  color: #000;
  font-weight: normal;
}

.el-menu-item:hover {
  outline: 0 !important;
  color: #000000 !important;
  background: rgba(167, 164, 164, 0.2) !important;
}

.el-sub-menu .el-menu-item{
  padding:0 20px !important;
}

.el-menu-item.is-active {
  color: #000000 !important;
  background: rgba(256, 256, 256, 0.1) !important;
}
</style>