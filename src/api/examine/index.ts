import { defHttp } from '/@/utils/http/axios';

enum Api {
  drawList = '/pc_management/rent/draw_list',
  approveDraw = '/pc_management/rent/approve_draw',
  drawDetail = '/pc_management/rent/draw_detail',
}

export function drawList(params) {
  return defHttp.post({
    url: Api.drawList,
    params,
  });
}

export function approveDraw(params) {
  return defHttp.post({
    url: Api.approveDraw,
    params,
  });
}

export function drawDetail(params) {
  return defHttp.post({
    url: Api.drawDetail,
    params,
  });
}
