import { defHttp } from '/@/utils/http/axios';

enum Api {
  addTallymanAccount = '/pc_management/tallyman/add_tallyman_account',
  editTallymanAccount = '/pc_management/tallyman/edit_tallyman_account',
  tallymanList = '/pc_management/tallyman/tallyman_list',
  tallymanAccountDetail = '/pc_management/tallyman/tallyman_account_detail',
}

export function addTallymanAccount(params) {
  return defHttp.post({
    url: Api.addTallymanAccount,
    params,
  });
}

export function editTallymanAccount(params) {
  return defHttp.post({
    url: Api.editTallymanAccount,
    params,
  });
}

export function tallymanList(params) {
  return defHttp.post({
    url: Api.tallymanList,
    params,
  });
}

export function tallymanAccountDetail(params) {
  return defHttp.post({
    url: Api.tallymanAccountDetail,
    params,
  });
}
