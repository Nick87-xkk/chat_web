import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw
} from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  { path: '/', component: () => import('/@/views/Login/Login.vue') },
  {
    path: '/index',
    component: () => import('/@/views/index/Index.vue'),
    children: [
      // 显示功能卡片
      {
        path: 'ribbon',
        component: () => import('/@/components/Ribbon/Ribbon.vue')
      },
      // 显示对话框
      {
        path: 'chat',
        component: () => import('/@/components/chat/FriendChat.vue')
      }
    ]
  },
  { path: '/test', component: () => import('/@/views/Test.vue') },
  { path: '/video', component: () => import('/@/views/Video.vue') },
  { path: '/chat', component: () => import('/@/views/Chat/Chat.vue') }
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
