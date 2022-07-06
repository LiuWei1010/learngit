import { defHttp } from '/@/utils/http/axios';

enum Api {
  editOpenid = '/pc_management/admin/edit_openid',
  openidList = '/pc_management/admin/openid_list',
}

export function editOpenid(params) {
  return defHttp.post({
    url: Api.editOpenid,
    params,
  });
}

export function openidList(params) {
  return defHttp.post({
    url: Api.openidList,
    params,
  });
}

export function rentMoneyFund(params) {
  return defHttp.post({
    url: Api.rentMoneyRefund,
    params,
  });
}
