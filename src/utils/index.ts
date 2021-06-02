import { connection } from './connect';
import moment from 'moment';
import IUser from '../ts/interface/IUser';
import IStudentInfo from '../ts/interface/IStudentInfo';
import IState from '../ts/interface/IState';
import EStudentState from '../ts/enum/EStudentState';
import EApproveState from '../ts/enum/EApproveSatte';
import IComments from '../ts/interface/IComments';
import ILogin from '../ts/interface/ILogin';
import INews from '../ts/interface/INews';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
//  登录
async function login(params: ILogin): Promise<Array<IUser>> {
    const { account, psw } = params;
    return new Promise((resolve, reject) => {
        const sql = `select account,username,role from roleTable where account='${account}' and psw='${psw}'`;
        connection.query(sql, (error, result) => {
            console.log(JSON.stringify(result, null, 2));
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
//  获取学生基本信息
async function getStudentInfos(stuId: string) {
    return new Promise((resolve, reject) => {
        const sql = `select * from studentInfoTable where stuId=${stuId}`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
//  根据id获取学生离校信息
async function getStudentLeaveInfoById(stuId: string): Promise<Array<IStudentInfo>> {
    return new Promise((resolve, reject) => {
        const sql = `select * from leaveTable where stuId=${stuId}`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                const studentInfos = result.map((studentInfo: IStudentInfo) => {
                    const { item_id, ...info } = studentInfo;
                    return info;
                });
                resolve(studentInfos);
            }
        });
    });
}
//  教师获取全部学生请假信息
async function getStudentLeaveInfo(): Promise<Array<IStudentInfo>> {
    return new Promise((resolve, reject) => {
        const sql = `select * from leaveTable`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                const studentInfos = result.map((studentInfo: IStudentInfo) => {
                    const { item_id, ...info } = studentInfo;
                    return info;
                });
                resolve(studentInfos);
            }
        });
    });
}
//  学生提交请假信息
async function handleStudentLeaveInfo(params: IStudentInfo) {
    console.log(`ML ~ file: index.ts ~ line 66 ~ handleStudentLeaveInfo ~ params`, params);
    const { orderId, stuId, stuName, majorNo, major, collegeNo, college, reason, leaveType, startTime, endTime, pickTeacher } = params;
    const fStartTime = moment(parseInt(startTime)).format(dateFormat);
    const fEndTime = moment(parseInt(endTime)).format(dateFormat);
    return new Promise((resolve, reject) => {
        const sql = `insert into leaveTable (orderId,stuId, stuName, majorNo, major, collegeNo, college, reason, leaveType, startTime, endTime,pickTeacher,approver,state,approveState ) values ('${orderId}',${stuId},'${stuName}',${majorNo},'${major}',${collegeNo},'${college}','${reason}','${leaveType}','${fStartTime}','${fEndTime}',${pickTeacher},'暂无','正在审批','正在审批')`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
}
//  老师批准学生离校
async function approveStudent(params: IState) {
    const { orderId, approveState, approver } = params;
    console.log(`ML ~ file: index.ts ~ line 35 ~ approveStudent ~ params`, params);
    return new Promise((resolve, reject) => {
        const sql = `update leavetable set state='已审批', approveState='${approveState}', approver='${approver}' where orderId='${orderId}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
}
//  获取辅导员和老师名字
async function getTeacherName(): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
        const sql = `select account,username from roletable where role='teacher' or role='counselor'`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
//  获取全部留言
async function getComments(): Promise<Array<IComments>> {
    return new Promise((resolve, reject) => {
        const sql = `select * from commentsTable order by datetime desc`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
//  提交留言
async function addComments(params: IComments) {
    const { commentId, account, author, content, datetime } = params;
    const fDatetime = moment(datetime).format(dateFormat);
    return new Promise((resolve, reject) => {
        const sql = `insert into commentsTable (commentId,account,author,datetime,content) values ('${commentId}',${account},'${author}','${fDatetime}','${content}')`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
//  获取留言回复
async function getReplys(): Promise<Array<IComments>> {
    return new Promise((resolve, reject) => {
        const sql = `select * from replyTable`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
//  提交留言回复
async function addReplys(params: IComments) {
    const { commentId, account, author, datetime, content } = params;
    const fDatetime = moment(datetime).format(dateFormat);
    return new Promise((resolve, reject) => {
        const sql = `insert into replyTable (commentId,account,author,datetime,content) values ('${commentId}',${account},'${author}','${fDatetime}','${content}')`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
//  获取新闻
async function getNews(): Promise<Array<INews>> {
    return new Promise((resolve, reject) => {
        const sql = `select * from newsTable`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
//  获取指定教师的离校申请
async function getPickTeacherInfo(params: IUser): Promise<Array<IStudentInfo>> {
    const { account } = params;
    return new Promise((resolve, reject) => {
        const sql = `select * from leaveTable where pickTeacher = ${account} and state='正在审批'`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
export {
    login,
    getStudentInfos,
    getStudentLeaveInfoById,
    getStudentLeaveInfo,
    handleStudentLeaveInfo,
    approveStudent,
    getTeacherName,
    getComments,
    addComments,
    getReplys,
    addReplys,
    getNews,
    getPickTeacherInfo,
};
