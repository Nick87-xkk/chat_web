import service from '../service';

export const postCreateFriendInfo = (data: any) =>
  service({
    url: '/friend/createInfo',
    method: 'POST',
    data
  });

export const postSearchFriendInfo = (data: any) =>
  service({
    url: '/friend/searchInfo',
    method: 'POST',
    data
  });

export const postUpdateFriendInfo = (data: any) =>
  service({
    url: '/friend/updateInfo',
    method: 'POST',
    data
  });

export const postCreateFriendRequest = (data: any) =>
  service({
    url: '/friend/createRe',
    method: 'POST',
    data
  });

export const postSearchFriendRequest = (data: any) =>
  service({
    url: '/friend/searchRe',
    method: 'POST',
    data
  });

export const postUpdateFriendRequest = (data: any) =>
  service({
    url: '/friend/updateRe',
    method: 'POST',
    data
  });
