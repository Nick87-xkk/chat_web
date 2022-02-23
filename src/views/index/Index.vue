<template>
  <div class="index-box">
    <div class="login-box">
      <el-container>
        <el-header>

        </el-header>
        <el-container>
          <el-aside>
            <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
              <li v-for="item in friendList" :key="item" class="infinite-list-item">
                <el-avatar class="infinite-list-item-avatar" :fit="'fill'" :src="item.headPortrait"></el-avatar>
                <div class="infinite-list-item-info">
                  <h2>{{ item.name }}</h2>
                  <h4>{{ item.lastMessage }}</h4>
                </div>
                <div>
                  <el-badge v-show="item.unreadMessageNum>0" :value="item.unreadMessageNum" class="item"></el-badge>
                  <h4>{{ item.lastTime }}</h4>
                </div>

              </li>
            </ul>
          </el-aside>
          <el-main style="padding:0;">
            <router-view style="width:100%;height:100%;"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {reactive} from "vue";

interface FriendListInterface {
  name?: string // 昵称
  active?: boolean
  headPortrait?: string // 头像
  lastMessage?: string // 最新消息
  lastTime?: string // 最新消息时间
  unreadMessageNum: number //未读消息条数
}

// 好友列表
const friendList: Array<FriendListInterface> = reactive([
  {
    name: 'Tom',
    active: false,
    headPortrait: 'https://tse1-mm.cn.bing.net/th/id/R-C.853ea6f74f3414c937f8ca0df324048a?rik=aMv%2fvuKN9ffVLQ&riu=http%3a%2f%2fi2.hdslb.com%2fbfs%2farchive%2f56e62e2c906115c3587d456a6ab179e9d25c0fa0.jpg&ehk=QYbvsF8KPhxkj2Hf8GXBg%2fOFGq1okiDGqtfsAlR83M8%3d&risl=&pid=ImgRaw&r=0',
    lastMessage: 'hello',
    lastTime: '9:30',
    unreadMessageNum: 1
  },
  {
    name: 'Jerry',
    active: false,
    headPortrait: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    lastMessage: 'hello',
    lastTime: '10:10',
    unreadMessageNum: 21
  },
  {
    name: 'Lucy',
    active: false,
    headPortrait: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    lastMessage: 'hello',
    lastTime: '12:01',
    unreadMessageNum: 100
  },
  {
    name: 'Ben',
    active: false,
    headPortrait: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    lastMessage: 'hello',
    lastTime: '11:01',
    unreadMessageNum: 2
  },
  {
    name: 'Json',
    active: false,
    headPortrait: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    lastMessage: 'hello',
    lastTime: '00:00',
    unreadMessageNum: 50
  },
])
const load = () => {
  friendList.push({
    name: 'Tom', active: false,
    headPortrait: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    lastMessage: 'hello',
    lastTime: '6:30',
    unreadMessageNum: 2
  });
}

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
