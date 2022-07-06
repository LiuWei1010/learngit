import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '',
}

export function getAccountList(params) {
  return defHttp.post({
    url: Api.list,
    params,
  });
}
