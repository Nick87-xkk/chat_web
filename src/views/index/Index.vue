<template>
  <div class="index-box">
    <div class="login-box">
      <el-container>
        <el-header>

        </el-header>
        <el-container>
          <el-aside>
            <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
              <li v-for="item in count" :key="item" @mouseover="item.active = true" @mouseleave="item.active = false"
                  :class="{'infinite-list-item-hover':item.active,'infinite-list-item':true}">{{ item.num }}
              </li>
            </ul>
          </el-aside>
          <el-main>

          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {reactive, nextTick} from "vue";

const count: Array<object> = reactive([
  {
    num: 1,
    active: false
  },
  {
    num: 1,
    active: false
  },
  {
    num: 1,
    active: false
  },
  {
    num: 1,
    active: false
  },
  {
    num: 1,
    active: false
  },
])
const load = () => {
  count.push({num: 1, active: false});
}
</script>

<style lang="scss" scoped>
.infinite-list {
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list::-webkit-scrollbar{
  width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  scrollbar-arrow-color: #989b9d;
}
.infinite-list::-webkit-scrollbar-thumb{
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
  scrollbar-arrow-color: #98bfed;
}
.infinite-list::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}

.infinite-list-item {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  box-shadow: 0 0 0 1px;
  margin-top: 1px;
}

.infinite-list-item-hover {
  background: rgba(167, 164, 164, 0.2);
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
