import service from '../service';
export const postCreateConversion = (data: any) =>
  service({
    url: '/cvn/create',
    method: 'POST',
    data
  });

export const postSearchConversion = (data: any) =>
  service({
    url: '/cvn/search',
    method: 'POST',
    data
  });

export const postUpdateConversion = (data: any) =>
  service({
    url: '/cvn/update',
    method: 'POST',
    data
  });
