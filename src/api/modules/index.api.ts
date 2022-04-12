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
