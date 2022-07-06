import { defHttp } from '/@/utils/http/axios';

enum Api {
  machineDetailMessage = '/pc_management/machine/machine_detail',
  machineList = '/pc_management/machine/machine_list',
  editMachine = '/pc_management/machine/edit_machine',
  addMachine = '/pc_management/machine/add_machine',
  distributeMachine = '/pc_management/machine/distribute_machine',
  distributeTallymanMachine = '/pc_management/machine/distribute_tallyman_machine',
}

export function machineDetailMessage(params) {
  return defHttp.post({
    url: Api.machineDetailMessage,
    params,
  });
}

export function machineList(params) {
  return defHttp.post({
    url: Api.machineList,
    params,
  });
}

export function editMachine(params) {
  return defHttp.post({
    url: Api.editMachine,
    params,
  });
}

export function addMachine(params) {
  return defHttp.post({
    url: Api.addMachine,
    params,
  });
}

export function distributeMachine(params) {
  return defHttp.post({
    url: Api.distributeMachine,
    params,
  });
}

export function distributeTallymanMachine(params) {
  return defHttp.post({
    url: Api.distributeTallymanMachine,
    params,
  });
}
