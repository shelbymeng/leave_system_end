import express from 'express';
import cors from 'cors';
import {
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
} from '../utils/index';
import { approveOther, getOtherInfo, handleOtherEnter } from '../utils/others';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
    const loginResult = await login(req.body);
    if (loginResult.length !== 0) {
        res.send({
            error: 0,
            msg: 'success',
            data: loginResult,
        });
    } else {
        res.send({
            error: 1001,
            msg: '用户不存在',
        });
    }
});
app.post('/getStudentInfos', async (req, res) => {
    const studentInfo = await getStudentInfos(req.body.stuId);
    if (studentInfo) {
        res.send({
            error: 0,
            msg: 'success',
            data: studentInfo,
        });
    } else {
        res.send({
            error: 1001,
            msg: '无此学生',
        });
    }
});
app.post('/getStudentLeaveInfoById', async (req, res) => {
    const param = req.body;
    const searchResult = await getStudentLeaveInfoById(param.stuId);
    if (searchResult.length !== 0) {
        res.status(200);
        res.send({
            error: 0,
            msg: 'success',
            data: searchResult,
        });
    } else {
        res.send({
            error: 2001,
            msg: '请假信息数据表为空',
        });
    }
});
app.get('/getStudentLeaveInfo', async (req, res) => {
    const studnetRes = await getStudentLeaveInfo();
    if (studnetRes.length !== 0) {
        res.send({
            error: 0,
            msg: 'success',
            data: studnetRes,
        });
    } else {
        res.send({
            error: 2131,
            msg: '暂无数据',
        });
    }
});
app.post('/handleStudentLeaveInfo', async (req, res) => {
    const handleResult = await handleStudentLeaveInfo(req.body);
    if (handleResult) {
        res.send({
            error: 0,
            msg: 'success',
        });
    } else {
        res.send({
            error: 3001,
            msg: '请假失败',
        });
    }
});
app.post('/approveStudent', async (req, res) => {
    const approveResult = await approveStudent(req.body);
    if (!approveResult) {
        res.send({
            error: 3001,
            msg: '批准失败',
        });
    } else {
        res.send({
            error: 0,
            msg: 'success',
        });
    }
});
app.get('/getTeacherName', async (req, res) => {
    const teacherRes = await getTeacherName();
    if (teacherRes.length !== 0) {
        res.send({
            error: 0,
            msg: 'success',
            data: teacherRes,
        });
    } else {
        res.send({
            error: 878,
            msg: '暂无教师信息',
        });
    }
});
//  获取全部留言
app.get('/getComments', async (req, res) => {
    const getRes = await getComments();
    if (getRes.length !== 0) {
        res.send({
            error: 0,
            msg: 'success',
            data: getRes,
        });
    } else {
        res.send({
            error: 3001,
            msg: '暂无数据',
        });
    }
});
//  提交留言
app.post('/addComments', async (req, res) => {
    const addRes = await addComments(req.body);
    if (addRes) {
        res.send({
            error: 0,
            msg: 'success',
        });
    } else {
        res.send({
            error: 3002,
            msg: '添加留言失败',
        });
    }
});
//  获取留言回复getReply
app.get('/getReplys', async (req, res) => {
    const getReplyRes = await getReplys();
    if (getReplyRes.length !== 0) {
        res.send({
            error: 0,
            msg: 'success',
            data: getReplyRes,
        });
    } else {
        res.send({
            error: 3004,
            msg: '暂无数据',
        });
    }
});
//  提交留言回复
app.post('/addReplys', async (req, res) => {
    const addReplyRes = await addReplys(req.body);
    if (addReplyRes) {
        res.send({
            error: 0,
            msg: 'success',
        });
    } else {
        res.send({
            error: 3003,
            msg: '提交失败',
        });
    }
});
//  获取新闻
app.get('/getNews', async (req, res) => {
    const news = await getNews();
    if (news.length !== 0) {
        res.send({
            error: 0,
            msg: 'success',
            data: news,
        });
    } else {
        res.send({
            error: 980,
            msg: '暂无新闻',
        });
    }
});
//  获取校外人员信息
app.get('/getOtherInfo', async (req, res) => {
    const result = await getOtherInfo();
    if (result.length !== 0) {
        res.send({
            error: 0,
            msg: 'success',
            data: result,
        });
    }
});
//  校外人员提交信息
app.post('/otherEnter', async (req, res) => {
    const handleResult = await handleOtherEnter(req.body);
    if (handleResult) {
        res.send({
            error: 0,
            msg: 'success',
        });
    } else {
        res.send({
            error: 981,
            msg: '提交失败',
        });
    }
});
//  领导批准校外人员
app.post('/approveOther', async (req, res) => {
    const result = await approveOther(req.body);
    if (result) {
        res.send({
            error: 0,
            msg: 'success',
        });
    } else {
        res.send({
            error: 278364,
            msg: '批准失败',
        });
    }
});
//  获取指定教师的离校信息
app.post('/getPickInfo', async (req, res) => {
    const info = await getPickTeacherInfo(req.body);
    if (info.length !== 0) {
        res.send({
            error: 0,
            msg: 'success',
            data: info,
        });
    } else {
        res.send({
            error: 23942,
            data: [],
        });
    }
});
const port = 3001;
app.listen(port, () => {
    console.log(`ML ~ file: index.ts ~ line 7 ~ port`, port);
});
