import { defHttp } from '/@/utils/http/axios';

enum Api {
  addBrand = '/pc_management/production/add_brand',
  brandList = '/pc_management/production/brand_list',
  brandDetail = '/pc_management/production/brand_detail',
  editBrand = '/pc_management/production/edit_brand',
  addProductionType = '/pc_management/production/add_production_type',
  editProductionType = '/pc_management/production/edit_production_type',
  productionTypeList = '/pc_management/production/production_type_list',
  productionTypeDetail = '/pc_management/production/production_type_detail',
  addProduction = '/pc_management/production/add_production',
  productionList = '/pc_management/production/production_list',
  editProduction = '/pc_management/production/edit_production',
  productionDetailMessage = '/pc_management/production/production_detail',
}

export function addBrand(params) {
  return defHttp.post({
    url: Api.addBrand,
    params,
  });
}

export function brandList(params) {
  return defHttp.post({
    url: Api.brandList,
    params,
  });
}

export function brandDetailMessage(params) {
  return defHttp.post({
    url: Api.brandDetail,
    params,
  });
}

export function editBrand(params) {
  return defHttp.post({
    url: Api.editBrand,
    params,
  });
}

export function addProductionType(params) {
  return defHttp.post({
    url: Api.addProductionType,
    params,
  });
}

export function editProductionType(params) {
  return defHttp.post({
    url: Api.editProductionType,
    params,
  });
}

export function productionTypeList(params) {
  return defHttp.post({
    url: Api.productionTypeList,
    params,
  });
}

export function productionTypeDetailMessage(params) {
  return defHttp.post({
    url: Api.productionTypeDetail,
    params,
  });
}

export function addProduction(params) {
  return defHttp.post({
    url: Api.addProduction,
    params,
  });
}

export function editProduction(params) {
  return defHttp.post({
    url: Api.editProduction,
    params,
  });
}

export function productionList(params) {
  return defHttp.post({
    url: Api.productionList,
    params,
  });
}

export function productionDetailMessage(params) {
  return defHttp.post({
    url: Api.productionDetailMessage,
    params,
  });
}
