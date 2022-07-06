import { defHttp } from '/@/utils/http/axios';

enum Api {
  monthBill = '/pc_management/rent/month_bill',
  applyDraw = '/pc_management/rent/apply_draw',
  dayBill = '/pc_management/rent/day_bill',
  dayBillDetail = '/pc_management/rent/day_bill_detail',
  allDrawMoney = '/pc_management/rent/all_draw_money',
}

export function monthBill(params) {
  return defHttp.post({
    url: Api.monthBill,
    params,
  });
}

export function applyDraw(params) {
  return defHttp.post({
    url: Api.applyDraw,
    params,
  });
}

export function dayBill(params) {
  return defHttp.post({
    url: Api.dayBill,
    params,
  });
}

export function dayBillDetail(params) {
  return defHttp.post({
    url: Api.dayBillDetail,
    params,
  });
}

export function allDrawMoney(params) {
  return defHttp.post({
    url: Api.allDrawMoney,
    params,
  });
}
