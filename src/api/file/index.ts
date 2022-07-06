import { defHttp } from '/@/utils/http/axios';

enum Api {
  uploadImg = '/pc_management/file/upload_img',
}

export function uploadImg(params) {
  return defHttp.post({
    url: Api.uploadImg,
    params,
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
}
