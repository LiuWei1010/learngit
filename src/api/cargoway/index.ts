import { defHttp } from '/@/utils/http/axios';

enum Api {
  hatchList = '/pc_management/hatch/hatch_list',
  addHatch = '/pc_management/hatch/add_hatch',
  editHatch = '/pc_management/hatch/edit_hatch',
}

export function hatchList(params) {
  return defHttp.post({
    url: Api.hatchList,
    params,
  });
}

export function addHatch(params) {
  return defHttp.post({
    url: Api.addHatch,
    params,
  });
}

export function editHatch(params) {
  return defHttp.post({
    url: Api.editHatch,
    params,
  });
}
