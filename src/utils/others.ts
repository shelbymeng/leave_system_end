import moment from 'moment';
import { connection } from './connect';

import { IOthers } from '../ts/interface/IOthers';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
async function getOtherInfo(): Promise<Array<IOthers>> {
    return new Promise((resolve, reject) => {
        const sql = `select * from  otherTable`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
async function handleOtherEnter(params: IOthers) {
    console.log(`ML ~ file: index.ts ~ line 66 ~ handleStudentLeaveInfo ~ params`, params);
    const { orderId, name, reason, startTime, endTime } = params;
    const fStartTime = moment(parseInt(startTime)).format(dateFormat);
    const fEndTime = moment(parseInt(endTime)).format(dateFormat);
    return new Promise((resolve, reject) => {
        const sql = `insert into otherTable (orderId,name, reason,startTime, endTime,state,approveState,approver) values ('${orderId}','${name}','${reason}','${fStartTime}','${fEndTime}','正在审批','正在审批','暂无')`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
}
export { getOtherInfo, handleOtherEnter };
