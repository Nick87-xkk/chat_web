<template>
  <div class="index-box">
    <div class="login-box">
      <el-container>
        <el-header>
          <el-row
            style="height: 100%; width: 100%"
            :align="'middle'"
            :justify="'space-between'"
          >
            <div>
              <el-tooltip
                class="box-item"
                effect="light"
                content="主页"
                placement="bottom"
              >
                <el-button type="primary" :icon="House" circle></el-button>
              </el-tooltip>
              <el-tooltip
                class="box-item"
                effect="light"
                content="好友分组"
                placement="bottom"
              >
                <el-button type="success" :icon="User" circle></el-button>
              </el-tooltip>
              <el-tooltip
                class="box-item"
                effect="light"
                content="添加好友/群"
                placement="bottom"
              >
                <el-button type="info" :icon="Plus" circle></el-button>
              </el-tooltip>
            </div>

            <el-avatar
              class="infinite-list-item-avatar"
              :fit="'fill'"
              :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
            ></el-avatar>
          </el-row>
        </el-header>
        <el-container>

          <el-aside>
            <!-- 消息列表-->
            <ul v-if="false" class="infinite-list" style="overflow: auto">
              <li
                v-for="item in friendList"
                :key="item.name"
                class="infinite-list-item"
                @click="friendChat(item)"
              >
                <el-avatar
                  class="infinite-list-item-avatar"
                  :fit="'fill'"
                  :src="item.headPortrait"
                ></el-avatar>
                <div class="infinite-list-item-info">
                  <h2>{{ item.name }}</h2>
                  <h4>{{ item.lastMessage }}</h4>
                  <el-row>
                    <h6>{{item.active?'[在线]':'[离线]'}}</h6>
                  </el-row>
                </div>
                <div>
                  <el-badge
                    v-show="item.unreadMessageNum > 0"
                    :value="item.unreadMessageNum"
                    class="item"
                  ></el-badge>
                  <h4>{{ item.lastTime }}</h4>
                </div>
              </li>
            </ul>
            <!--好友列表-->
            <FriendGroups v-if="true"></FriendGroups>
          </el-aside>
          <!--主页右侧聊天框或功能区-->
          <el-main style="padding: 0">
            <router-view
              v-if="viewReload"
              style="width: 100%; height: 100%"
            ></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import router from '../../router';
import { House, User, Plus } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import {LocationQuery, LocationQueryRaw, LocationQueryValue, Router, RouterOptions} from "vue-router";
import GroupChat from "../../components/chat/GroupChat.vue";
import FriendGroups from "../../components/FriendGroups.vue";

// v-if 控制聊天组件刷新
const viewReload = ref(true);

interface FriendListInterface {
  type: number; // 0 单聊 1 群聊
  account: number; // 账号
  name?: string; // 昵称
  active?: boolean; // 是否在线
  headPortrait?: string; // 头像
  lastMessage?: string; // 最新消息
  lastTime?: string; // 最新消息时间
  unreadMessageNum: number; //未读消息条数
}

// 获取用户信息 ，建立ws连接
const store = useStore();
console.log(computed(() => store.state.user_date));

// 点击好友进入聊天
const friendChat = (item:any) => {
  setTimeout(() => (viewReload.value = false), 100);
  setTimeout(() => (viewReload.value = true), 100);
  // 路由传参
  item.type? router.push({path:'/index/group',query:item}): router.push({path: '/index/chat', query: item});
};
// 好友列表，从后端获取
const friendList: Array<FriendListInterface> | null = reactive([
  {
    type: 0,
    account: 123456789,
    name: 'Tom',
    active: true,
    headPortrait:
      'https://tse1-mm.cn.bing.net/th/id/R-C.853ea6f74f3414c937f8ca0df324048a?rik=aMv%2fvuKN9ffVLQ&riu=http%3a%2f%2fi2.hdslb.com%2fbfs%2farchive%2f56e62e2c906115c3587d456a6ab179e9d25c0fa0.jpg&ehk=QYbvsF8KPhxkj2Hf8GXBg%2fOFGq1okiDGqtfsAlR83M8%3d&risl=&pid=ImgRaw&r=0',
    lastMessage: 'hello',
    lastTime: '9:30',
    unreadMessageNum: 1
  },
  {
    type: 0,
    account: 123456788,
    name: 'Jerry',
    active: false,
    headPortrait:
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    lastMessage: 'hello',
    lastTime: '10:10',
    unreadMessageNum: 21
  },
  {
    type: 0,
    account: 123456787,
    name: 'Lucy',
    active: false,
    headPortrait:
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    lastMessage: 'hello',
    lastTime: '12:01',
    unreadMessageNum: 100
  },
  {
    type: 0,
    account: 123456786,
    name: 'Ben',
    active: true,
    headPortrait:
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    lastMessage: 'hello',
    lastTime: '11:01',
    unreadMessageNum: 2
  },
  {
    type: 0,
    account: 123456785,
    name: 'Json',
    active: false,
    headPortrait:
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    lastMessage: 'hello',
    lastTime: '00:00',
    unreadMessageNum: 50
  },
  {
    type: 1,
    account: 123456785,
    name: 'Json',
    active: false,
    headPortrait:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    lastMessage: 'hello',
    lastTime: '00:00',
    unreadMessageNum: 50
  }
]);
/*const load = () => {
  friendList.push({
    name: 'Tom',
    active: false,
    headPortrait:
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    lastMessage: 'hello',
    lastTime: '6:30',
    unreadMessageNum: 2
  });
};*/
</script>

<style lang="scss" scoped>
.infinite-list {
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-item {
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  box-shadow: 0 0 0 1px;
  margin-top: 1px;
}

.infinite-list-item:hover {
  background: rgba(167, 164, 164, 0.2);
}

.infinite-list-item-avatar {
  margin: 0 10px 0 10px;
}

.infinite-list-item-info {
  width: 60%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  h2 {
    color: black;
    font-weight: 400;
  }
}

.index-box {
  background: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  width: 1080px;

  .el-container:first-child {
    height: 720px;
    border-radius: 10px;
    backdrop-filter: blur(100px);
    box-shadow: 0 0 5px 0;
    overflow: hidden;
  }

  .el-container:nth-child(2) {
    box-shadow: 0 0 5px 0;
    overflow: hidden;
  }

  .el-aside {
    width: 30%;
    height: 100%;
    box-shadow: 0 0 5px 0;
    overflow: auto;
  }

  .el-header {
    overflow: hidden;
    box-shadow: 0 0 5px 0;
  }
}
</style>
