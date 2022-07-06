import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
enum Api {
  login = '/pc_management/admin/login',
  addAccount = '/pc_management/admin/add_account',
  editAccount = '/pc_management/admin/edit_account',
  accountDetail = '/pc_management/admin/account_detail',
  accountList = '/pc_management/admin/account_list',
}

export function loginApi(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addAccount(params) {
  return defHttp.post({
    url: Api.addAccount,
    params,
  });
}

export function accountList(params) {
  return defHttp.post({
    url: Api.accountList,
    params,
  });
}

export function editAccount(params) {
  return defHttp.post({
    url: Api.editAccount,
    params,
  });
}

export function accountDetailMessage(params) {
  return defHttp.post({
    url: Api.accountDetail,
    params,
  });
}
