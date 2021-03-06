import service from '../service';

export const getTest = () =>
  service({
    url: '',
    method: 'get'
  });

// 登录
export const login = (data: any) =>
  service({
    url: '/user/login',
    method: 'POST',
    data
  });
// 搜索用户
export const searchUser = (data: any) =>
  service({
    url: '/user/searchUser',
    method: 'POST',
    data
  });
// 批量搜索用户信息
export const postBatchSearchUser = (data: any) =>
  service({
    url: '/user/batchSearch',
    method: 'POST',
    data
  });

// 获取分组列表
export const getFriendGroups = (account: any) =>
  service({
    url: `/user/searchFriendGroups?account=${account}`,
    method: 'GET'
  });
// 获取分组信息
export const getFriendList = (account: any) =>
  service({
    url: `/user/selectUserFriend?account=${account}`,
    method: 'GET'
  });
// 消息会话列表
export const getConversionList = (account: number) =>
  service({
    url: `/user/searchConversion?account=${account}`,
    method: 'GET'
  });

// 注册
export const userRegister = (data: any) =>
  service({
    url: '/user/register',
    method: 'POST',
    data
  });

// 发送好友请求
export const friendRequest = (data: any) =>
  service({
    url: '/user/friendRequest',
    method: 'POST',
    data
  });
