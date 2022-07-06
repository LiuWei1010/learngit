import { defHttp } from '/@/utils/http/axios';

enum Api {
  addPlace = '/pc_management/place/add_place',
  editPlace = '/pc_management/place/edit_place',
  placeDetail = '/pc_management/place/place_detail',
  placeList = '/pc_management/place/place_list',
}

export function addPlace(params) {
  return defHttp.post({
    url: Api.addPlace,
    params,
  });
}

export function editPlace(params) {
  return defHttp.post({
    url: Api.editPlace,
    params,
  });
}

export function placeDetailMessage(params) {
  return defHttp.post({
    url: Api.placeDetail,
    params,
  });
}

export function placeList(params) {
  return defHttp.post({
    url: Api.placeList,
    params,
  });
}
