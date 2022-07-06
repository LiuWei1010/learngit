import { defHttp } from '/@/utils/http/axios';

enum Api {
  orderList = '/pc_management/rent/rent_list',
  orderDetail = '/pc_management/rent/rent_detail',
  rentMoneyRefund = '/pc_management/rent/rent_money_refund',
}

export function getOrderList(params) {
  return defHttp.post({
    url: Api.orderList,
    params,
  });
}

export function getOrderDetail(params) {
  return defHttp.post({
    url: Api.orderDetail,
    params,
  });
}

export function rentMoneyFund(params) {
  return defHttp.post({
    url: Api.rentMoneyRefund,
    params,
  });
}
