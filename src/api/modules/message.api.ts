import service from '../service';

export const postAddMessage = (data: any) =>
  service({
    url: '/msg/add',
    method: 'POST',
    data
  });

export const postSearchMessage = (data: any) =>
  service({
    url: '/msg/search',
    method: 'POST',
    data
  });
