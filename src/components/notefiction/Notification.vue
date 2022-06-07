<template>
  <div>
    <el-drawer v-model="drawer" :modal="true" :size="400" :with-header="false">
      <h2>好友请求</h2>
      <div class="note" v-for="item in friendRequestList" :key="item.message">
        <el-avatar :fit="'fill'" :src="item.profile"></el-avatar>
        <div class="note-div">
          <h2>{{ item.nickname }}</h2>
          <h4>{{ item.message }}</h4>
        </div>
        <div
          v-if="item.state == 0 && item.apply_account != GLOBAL_ACCOUNT"
          class="note-button"
        >
          <el-tooltip effect="light" content="同意" placement="bottom">
            <el-button
              @click="agreeRequest(item)"
              :size="'small'"
              type="success"
              round
            ></el-button>
          </el-tooltip>
          <el-tooltip effect="light" content="拒绝" placement="bottom">
            <el-button
              @click="refuseRequest(item)"
              :size="'small'"
              type="danger"
              round
            ></el-button>
          </el-tooltip>
        </div>
        <el-button
          v-else-if="item.state == 0 && item.apply_account == GLOBAL_ACCOUNT"
          :size="'small'"
          disabled
          >等待通过
        </el-button>
        <el-button
          v-else-if="item.state == 1"
          :size="'small'"
          type="success"
          disabled
          >已通过
        </el-button>
        <el-button
          v-else-if="item.state == 2"
          :size="'small'"
          type="danger"
          disabled
          >已拒绝
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { drawer } from './note';
import {
  postSearchFriendRequest,
  postUpdateFriendInfo,
  postUpdateFriendRequest
} from '../../api/modules/friend.api';
import { postBatchSearchUser } from '../../api/modules/index.api';
import { postCreateConversion } from '../../api/modules/conversion.api';

const friendRequestList: any = reactive([]);

const GLOBAL_ACCOUNT = sessionStorage.getItem('account');

let arr: any = [];
// 获取所有请求信息
postSearchFriendRequest({ account: sessionStorage.getItem('account') }).then(
  (res: any) => {
    if (res.message.length) {
      res.message.map((e: any) => {
        e.apply_account != GLOBAL_ACCOUNT
          ? arr.push(e.apply_account)
          : arr.push(e.target_account);
      });
      postBatchSearchUser({ friends: arr }).then((info: any) => {
        let friendMap: any = {};
        info.message.map((e: any) => {
          friendMap[e.account] = e;
        });
        res.message.map((item: any) => {
          item.apply_account != GLOBAL_ACCOUNT
            ? Object.assign(item, friendMap[item.apply_account])
            : Object.assign(item, friendMap[item.target_account]);
        });
      });
      friendRequestList.push(...res.message);
    }
  }
);

// 同意请求
const agreeRequest = (data: any) => {
  console.table(data);
  postUpdateFriendRequest({
    apply_account: data.apply_account,
    target_account: data.target_account,
    state: 1
  }).then(() => {
    postCreateConversion({
      create_account: data.apply_account,
      member_account: data.target_account
    }).then(() => {
      postUpdateFriendInfo({
        account:data.apply_account,
        friend_account:`{"${data.apply_group}":[${data.target_account}]}`
      }).then(()=>{
        postUpdateFriendInfo({
          account:data.target_account,
          friend_account:`{"${data.apply_group}":[${data.apply_account}]}`
        })
      });
    });
  });
};

// 拒绝请求
const refuseRequest = (data: any) => {
  console.table(data);
  postUpdateFriendRequest({
    apply_account: data.apply_account,
    target_account: data.target_account,
    state: 2
  });
};
</script>

<style scoped lang="scss">
.note {
  width: 330px;
  min-height: 70px;
  border-radius: 10px;
  box-shadow: 0 0 1px 0 #f1f1f5;
  padding: 10px;
  margin: 20px auto;
  display: flex;
  align-items: flex-start;

  .note-div {
    width: 60%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 10px;
    overflow: auto;
  }

  .note-button {
    margin-left: 10px;
    display: flex;
    justify-items: center;
  }
}

:deep(.el-drawer) {
  background: inherit !important;
  backdrop-filter: blur(20px);
  color: #a7a2a2;
}

:deep(.el-overlay) {
  background: none;
}
</style>
