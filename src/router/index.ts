import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw
} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: () => import('/@/views/login/Login.vue') },
  {
    path: '/index',
    component: () => import('/@/views/index/Index.vue'),
    meta: {
      title: '主页',
      keepAlive: true
    }
    /*children: [
      // 显示功能卡片
      {
        path: 'ribbon',
        component: () => import('/@/components/ribbon/WeatherCard.vue')
      },
      // 好友聊天
      {
        path: 'chat',
        component: () => import('/@/components/chat/FriendChat.vue')
      },
      // 群聊
      {
        path: 'group',
        component: () => import('/@/components/chat/GroupChat.vue')
      },
      // 账号信息
      {
        path: 'userInfo',
        component: () => import('/@/components/ribbon/UserInfo.vue')
      }
    ]*/
  },
  { path: '/test', component: () => import('/@/views/Test.vue') },
  {
    path: '/video',
    component: () => import('/@/components/video/SponsorVideoChat.vue')
  },
  { path: '/chat', component: () => import('/@/views/chat/Chat.vue') },
  { path: '/visitor', component: () => import('/@/views/visitor/Visitor.vue') },
  { path: '/register', component: () => import('/@/views/login/Register.vue') }
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
