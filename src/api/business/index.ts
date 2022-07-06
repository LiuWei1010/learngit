import { defHttp } from '/@/utils/http/axios';

enum Api {
  addBusiness = '/pc_management/business/add_business',
  businessList = '/pc_management/business/business_list',
  businessDetailMessage = '/pc_management/business/business_detail',
  editBusiness = '/pc_management/business/edit_business',
  editAdminAccount = '/pc_management/business/edit_admin_account',
  businessAccountList = '/pc_management/business/business_account_list',
  businessSuperAccountList = '/pc_management/business/business_super_account_list',
}

export function addBusiness(params) {
  return defHttp.post({
    url: Api.addBusiness,
    params,
  });
}

export function businessList(params) {
  return defHttp.post({
    url: Api.businessList,
    params,
  });
}

export function businessDetailMessage(params) {
  return defHttp.post({
    url: Api.businessDetailMessage,
    params,
  });
}

export function editBusiness(params) {
  return defHttp.post({
    url: Api.editBusiness,
    params,
  });
}

export function editAdminAccount(params) {
  return defHttp.post({
    url: Api.editAdminAccount,
    params,
  });
}

export function businessAccountList(params) {
  return defHttp.post({
    url: Api.businessAccountList,
    params,
  });
}

export function businessSuperAccountList(params) {
  return defHttp.post({
    url: Api.businessSuperAccountList,
    params,
  });
}
